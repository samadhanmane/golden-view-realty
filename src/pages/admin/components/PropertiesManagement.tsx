import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, MoreHorizontal, Pencil, Trash2, Eye, Plus, Calendar, CheckCircle, XCircle, Star, Code, Check, Clipboard, Trash, Edit } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import api from '@/utils/api';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import JsonPropertyForm from './JsonPropertyForm';

interface Property {
  _id: string;
  id?: number;
  title: string;
  type: string;
  category: string;
  price: number;
  location: string | {
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
  imageUrl?: string;
  images?: Array<{ url: string }>;
  createdAt: string;
  featured: boolean;
  description?: string;
  bedrooms?: number;
  bathrooms?: number;
  size?: {
    area: number;
    areaUnit: string;
  } | string;
  status?: string;
  amenities?: string[];
}

// Define the Property Form interface
interface PropertyFormData {
  title: string;
  description: string;
  price: number;
  type: string;
  category: string;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  bedrooms: number;
  bathrooms: number;
  size: {
    area: number;
    areaUnit: string;
  };
  status: string;
  featured: boolean;
  imageUrl: string;
  amenities: string[];
}

const AddPropertyModal: React.FC<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPropertyAdded: () => void;
}> = ({ open, onOpenChange, onPropertyAdded }) => {
  const [formData, setFormData] = useState<PropertyFormData>({
    title: '',
    description: '',
    price: 0,
    type: 'House',
    category: 'Residential',
    location: {
      address: '',
      city: '',
      state: '',
      zipCode: ''
    },
    bedrooms: 0,
    bathrooms: 0,
    size: {
      area: 0,
      areaUnit: 'sq ft'
    },
    status: 'active',
    featured: false,
    imageUrl: '',
    amenities: []
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle nested properties
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      if (parent === 'location') {
        setFormData(prev => ({
          ...prev,
          location: {
            ...prev.location,
            [child]: value
          }
        }));
      } else if (parent === 'size') {
        setFormData(prev => ({
          ...prev,
          size: {
            ...prev.size,
            [child]: value
          }
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Handle nested properties for numbers
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      if (parent === 'size') {
        setFormData(prev => ({
          ...prev,
          size: {
            ...prev.size,
            [child]: parseFloat(value) || 0
          }
        }));
      } else if (parent === 'location') {
        setFormData(prev => ({
          ...prev,
          location: {
            ...prev.location,
            [child]: value
          }
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: parseFloat(value) || 0
      }));
    }
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    // For featured status
    if (name === 'featured') {
      setFormData(prev => ({
        ...prev,
        featured: checked
      }));
    }
    
    // For amenities (as an example)
    if (name.startsWith('amenity-')) {
      const amenity = name.replace('amenity-', '');
      setFormData(prev => {
        if (checked) {
          // Add amenity if it doesn't exist
          return {
            ...prev,
            amenities: [...prev.amenities, amenity]
          };
        } else {
          // Remove amenity if unchecked
          return {
            ...prev,
            amenities: prev.amenities.filter(a => a !== amenity)
          };
        }
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      
      // Validate required fields
      if (!formData.title || !formData.description || !formData.price) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Please fill in all required fields'
        });
        return;
      }
      
      // Validate imageUrl
      let imageUrl = formData.imageUrl.trim();
      if (!imageUrl) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Please provide an image URL'
        });
        return;
      }
      
      // Ensure imageUrl has http/https prefix
      if (!imageUrl.startsWith('http://') && !imageUrl.startsWith('https://')) {
        imageUrl = 'https://' + imageUrl;
        console.log('Added https:// prefix to image URL:', imageUrl);
      }
      
      // Create property data object with proper format
      const newPropertyData = {
        ...formData,
        imageUrl: imageUrl, // Use the validated imageUrl
        // Ensure images are properly formatted for the API
        images: [{ url: imageUrl, isPrimary: true }],
        // Format the size object
        size: {
          area: formData.size.area,
          areaUnit: formData.size.areaUnit
        }
      };
      
      console.log('Submitting property data:', newPropertyData);
      
      // Make API call to create property
      const response = await api.post('/properties', newPropertyData);
      
      console.log('Property created:', response.data);
      
      toast({
        title: 'Success',
        description: 'Property has been added'
      });
      
      resetForm();
      onPropertyAdded();
      onOpenChange(false);
    } catch (error) {
      console.error('Error adding property:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to add property'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: 0,
      type: 'House',
      category: 'Residential',
      location: {
        address: '',
        city: '',
        state: '',
        zipCode: ''
      },
      bedrooms: 0,
      bathrooms: 0,
      size: {
        area: 0,
        areaUnit: 'sq ft'
      },
      status: 'active',
      featured: false,
      imageUrl: '',
      amenities: []
    });
  };

  // List of common amenities for properties
  const commonAmenities = [
    'Parking', 'Swimming Pool', 'Gym', 'Garden', 'Elevator',
    'Security', '24/7 Water Supply', 'Power Backup', 'Air Conditioning',
    'Furnished', 'Internet', 'Balcony'
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Property</DialogTitle>
          <DialogDescription>
            Enter the details below to add a new property to the database.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Details */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Property Title*</Label>
                <Input 
                  id="title" 
                  name="title" 
                  value={formData.title} 
                  onChange={handleChange} 
                  placeholder="Enter property title"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="price">Price (in $)*</Label>
                <Input 
                  id="price" 
                  name="price" 
                  type="number" 
                  value={formData.price} 
                  onChange={handleNumberChange} 
                  placeholder="Enter property price"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="type">Property Type*</Label>
                <Select name="type" value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="House">House</SelectItem>
                    <SelectItem value="Apartment">Apartment</SelectItem>
                    <SelectItem value="Villa">Villa</SelectItem>
                    <SelectItem value="Condo">Condo</SelectItem>
                    <SelectItem value="Land">Land</SelectItem>
                    <SelectItem value="Office">Office</SelectItem>
                    <SelectItem value="Retail">Retail</SelectItem>
                    <SelectItem value="Farm">Farm</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="category">Category*</Label>
                <Select name="category" value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Residential">Residential</SelectItem>
                    <SelectItem value="Commercial">Commercial</SelectItem>
                    <SelectItem value="Industrial">Industrial</SelectItem>
                    <SelectItem value="Agricultural">Agricultural</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="status">Status*</Label>
                <Select name="status" value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="sold">Sold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="featured" 
                  checked={formData.featured} 
                  onCheckedChange={(checked) => handleCheckboxChange('featured', checked as boolean)} 
                />
                <Label htmlFor="featured">Featured Property</Label>
              </div>
            </div>
            
            {/* Property Details */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="description">Description*</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  value={formData.description} 
                  onChange={handleChange} 
                  placeholder="Enter property description"
                  rows={4}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input 
                    id="bedrooms" 
                    name="bedrooms" 
                    type="number" 
                    value={formData.bedrooms} 
                    onChange={handleNumberChange} 
                    placeholder="Number of bedrooms"
                  />
                </div>
                <div>
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Input 
                    id="bathrooms" 
                    name="bathrooms" 
                    type="number" 
                    value={formData.bathrooms} 
                    onChange={handleNumberChange} 
                    placeholder="Number of bathrooms"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="size.area">Area</Label>
                  <Input 
                    id="size.area" 
                    name="size.area" 
                    type="number" 
                    value={formData.size.area} 
                    onChange={handleNumberChange} 
                    placeholder="Area size"
                  />
                </div>
                <div>
                  <Label htmlFor="size.areaUnit">Unit</Label>
                  <Select name="size.areaUnit" value={formData.size.areaUnit} onValueChange={(value) => setFormData(prev => ({ ...prev, size: { ...prev.size, areaUnit: value } }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sq ft">Square Feet</SelectItem>
                      <SelectItem value="sq m">Square Meters</SelectItem>
                      <SelectItem value="acres">Acres</SelectItem>
                      <SelectItem value="hectares">Hectares</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
          
          {/* Location Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Location Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location.address">Address*</Label>
                <Input 
                  id="location.address" 
                  name="location.address" 
                  value={formData.location.address} 
                  onChange={handleChange} 
                  placeholder="Street address"
                  required
                />
              </div>
              <div>
                <Label htmlFor="location.city">City*</Label>
                <Input 
                  id="location.city" 
                  name="location.city" 
                  value={formData.location.city} 
                  onChange={handleChange} 
                  placeholder="City"
                  required
                />
              </div>
              <div>
                <Label htmlFor="location.state">State*</Label>
                <Input 
                  id="location.state" 
                  name="location.state" 
                  value={formData.location.state} 
                  onChange={handleChange} 
                  placeholder="State"
                  required
                />
              </div>
              <div>
                <Label htmlFor="location.zipCode">Zip Code*</Label>
                <Input 
                  id="location.zipCode" 
                  name="location.zipCode" 
                  value={formData.location.zipCode} 
                  onChange={handleChange} 
                  placeholder="Zip code"
                  required
                />
              </div>
            </div>
          </div>
          
          {/* Image URL */}
          <div>
            <Label htmlFor="imageUrl">Image URL*</Label>
            <Input 
              id="imageUrl" 
              name="imageUrl" 
              value={formData.imageUrl} 
              onChange={handleChange} 
              placeholder="Enter image URL for the property"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Enter a URL for the property image.
            </p>
          </div>
          
          {/* Amenities */}
          <div>
            <h3 className="text-lg font-medium mb-2">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {commonAmenities.map(amenity => (
                <div className="flex items-center space-x-2" key={amenity}>
                  <Checkbox 
                    id={`amenity-${amenity}`} 
                    checked={formData.amenities.includes(amenity)} 
                    onCheckedChange={(checked) => handleCheckboxChange(`amenity-${amenity}`, checked as boolean)} 
                  />
                  <Label htmlFor={`amenity-${amenity}`}>{amenity}</Label>
                </div>
              ))}
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Adding...' : 'Add Property'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const EditPropertyModal: React.FC<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  property: Property | null;
  onPropertyUpdated: () => void;
}> = ({ open, onOpenChange, property, onPropertyUpdated }) => {
  const [formData, setFormData] = useState<PropertyFormData>({
    title: '',
    description: '',
    price: 0,
    type: 'House',
    category: 'Residential',
    location: {
      address: '',
      city: '',
      state: '',
      zipCode: ''
    },
    bedrooms: 0,
    bathrooms: 0,
    size: {
      area: 0,
      areaUnit: 'sq ft'
    },
    status: 'active',
    featured: false,
    imageUrl: '',
    amenities: []
  });
  const [isLoading, setIsLoading] = useState(false);

  // Populate form data when property changes
  useEffect(() => {
    if (property) {
      setFormData({
        title: property.title || '',
        description: property.description || '',
        price: property.price || 0,
        type: property.type || 'House',
        category: property.category || 'Residential',
        location: typeof property.location === 'string' 
          ? { 
              address: property.location,
              city: '',
              state: '',
              zipCode: ''
            }
          : {
              address: property.location.address || '',
              city: property.location.city || '',
              state: property.location.state || '',
              zipCode: property.location.zipCode || ''
            },
        bedrooms: property.bedrooms || 0,
        bathrooms: property.bathrooms || 0,
        size: typeof property.size === 'string'
          ? {
              area: parseFloat(property.size) || 0,
              areaUnit: 'sq ft'
            }
          : {
              area: property.size?.area || 0,
              areaUnit: property.size?.areaUnit || 'sq ft'
            },
        status: property.status || 'active',
        featured: property.featured || false,
        imageUrl: property.imageUrl || (property.images && property.images.length > 0 ? property.images[0].url : ''),
        amenities: property.amenities || []
      });
    }
  }, [property]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle nested properties
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      if (parent === 'location') {
        setFormData(prev => ({
          ...prev,
          location: {
            ...prev.location,
            [child]: value
          }
        }));
      } else if (parent === 'size') {
        setFormData(prev => ({
          ...prev,
          size: {
            ...prev.size,
            [child]: value
          }
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Handle nested properties for numbers
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      if (parent === 'size') {
        setFormData(prev => ({
          ...prev,
          size: {
            ...prev.size,
            [child]: parseFloat(value) || 0
          }
        }));
      } else if (parent === 'location') {
        setFormData(prev => ({
          ...prev,
          location: {
            ...prev.location,
            [child]: value
          }
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: parseFloat(value) || 0
      }));
    }
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    // For featured status
    if (name === 'featured') {
      setFormData(prev => ({
        ...prev,
        featured: checked
      }));
    }
    
    // For amenities
    if (name.startsWith('amenity-')) {
      const amenity = name.replace('amenity-', '');
      setFormData(prev => {
        if (checked) {
          // Add amenity if it doesn't exist
          return {
            ...prev,
            amenities: [...prev.amenities, amenity]
          };
        } else {
          // Remove amenity if unchecked
          return {
            ...prev,
            amenities: prev.amenities.filter(a => a !== amenity)
          };
        }
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!property) return;
    
    setIsLoading(true);
    
    try {
      // Validate the form data
      if (!formData.title || formData.title.length < 5) {
        throw new Error("Title is required and must be at least 5 characters");
      }
      if (!formData.description || formData.description.length < 10) {
        throw new Error("Description is required and must be at least 10 characters");
      }
      if (!formData.price || formData.price <= 0) {
        throw new Error("Price is required and must be greater than 0");
      }
      
      // Validate ZIP code (must be 6 digits for India)
      const zipCode = formData.location.zipCode?.trim() || "";
      if (!/^\d{6}$/.test(zipCode)) {
        throw new Error("ZIP code must be a 6-digit number");
      }

      // Ensure property type is one of the allowed enum values
      // These are the exact values from the PropertySchema
      const validPropertyTypes = [
        'Plot', 'Flat', 'House', 'Hotel', 'Commercial Property', 
        'Apartment', 'Villa', 'Condo', 'Townhouse', 
        'Land', 'Office', 'Retail', 'Warehouse', 
        'Industrial', 'Farm', 'Ranch', 'Resort',
        'Penthouse', 'Duplex', 'Studio', 'Bungalow', 'Chalet'
      ];
      
      if (!validPropertyTypes.includes(formData.type)) {
        throw new Error(`Invalid property type. Must be one of: ${validPropertyTypes.join(', ')}`);
      }
      
      // Format the data according to the MongoDB schema exactly
      const updatedPropertyData = {
        // Basic required fields
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        
        // Property classification
        propertyType: formData.type,
        category: formData.category || 'Residential',
        
        // Add landType for Land or Plot property types
        ...(formData.type === 'Land' || formData.type === 'Plot' ? {
          landType: 'Residential' // Default to Residential but should be selectable in a real form
        } : {}),
        
        // Required legal status
        legalStatus: 'Clear Title',
        
        // Address - required object with specific fields
        address: {
          street: formData.location.address || '123 Main St',
          city: formData.location.city || 'Default City',
          state: formData.location.state || 'Default State',
          zipCode: zipCode,
          country: 'India', // Default to India
          landmark: '',
          neighborhood: ''
        },
        
        // Area information - required
        area: {
          total: Number(formData.size.area) || 1000,
          unit: formData.size.areaUnit || 'sq ft',
          built: 0,
          living: 0,
          outdoor: 0
        },
        
        // Property details
        propertyDetails: {
          bedrooms: Number(formData.bedrooms) || 0,
          bathrooms: Number(formData.bathrooms) || 0,
          floors: 1,
          kitchens: 1,
          garageCapacity: 0
        },
        
        // Status and other settings
        status: formData.status || 'active',
        listingType: 'Sale',
        featured: Boolean(formData.featured),
        
        // Additional data
        amenities: formData.amenities || [],
        
        // Process image URL - ensure it has http/https prefix
        images: (() => {
          let imageUrl = formData.imageUrl.trim();
          
          // Add protocol if missing
          if (imageUrl && !imageUrl.startsWith('http://') && !imageUrl.startsWith('https://')) {
            imageUrl = 'https://' + imageUrl;
            console.log('Added https:// prefix to image URL:', imageUrl);
          }
          
          return imageUrl 
            ? [{ url: imageUrl, isPrimary: true }] 
            : [{ url: 'https://placehold.co/600x400?text=Property+Image', isPrimary: true }];
        })(),
        
        // Empty default objects to satisfy schema
        features: {
          hasGarden: false,
          hasPool: false,
          hasGarage: false
        },
        
        // Required owner details
        ownerDetails: {
          name: 'Admin User',
          email: 'admin@example.com',
          phoneNumbers: ['1234567890']
        }
      };
      
      console.log('Submitting updated property data:', updatedPropertyData);
      
      // Call the API to update the property
      const response = await api.put(`/properties/${property._id}`, updatedPropertyData);
      console.log('Property update response:', response.data);
      
      toast({
        title: "Success",
        description: "Property updated successfully",
        variant: "default",
      });
      
      // Close the modal and refresh the property list
      onOpenChange(false);
      onPropertyUpdated();
    } catch (error: any) {
      console.error('Failed to update property:', error);
      
      // Enhanced error logging
      if (error.response) {
        console.error('Server error details:', error.response.data);
        console.error('Server error status:', error.response.status);
        
        // Log detailed validation errors if they exist
        if (error.response.data?.errors && Array.isArray(error.response.data.errors)) {
          console.error('Validation errors:');
          error.response.data.errors.forEach((err: any, index: number) => {
            console.error(`  ${index + 1}. Field: ${err.field || 'unknown'}, Message: ${err.message || 'unknown error'}`);
          });
        }
        
        console.error('Request data sent:', JSON.stringify(updatedPropertyData, null, 2));
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      
      // Determine if this is a local validation error or server error
      if (error.message && !error.response) {
        // Local validation error
        toast({
          variant: 'destructive',
          title: 'Validation Error',
          description: error.message
        });
      } else {
        // Server error handling
        let errorMessage = 'Failed to update property. Please try again.';
        
        if (error.response) {
          console.error('Server error details:', error.response.data);
          console.error('Server error status:', error.response.status);
          
          if (error.response.data?.message) {
            errorMessage = error.response.data.message;
          } else if (error.response.data?.errors && Array.isArray(error.response.data.errors)) {
            // Format validation errors
            errorMessage = 'Validation errors: ' + 
              error.response.data.errors.map((err: any) => 
                `${err.field || ''}: ${err.message || ''}`
              ).join(', ');
          }
        }
        
        toast({
          variant: 'destructive',
          title: 'Error',
          description: errorMessage
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // List of common amenities for properties
  const commonAmenities = [
    'Parking', 'Swimming Pool', 'Gym', 'Garden', 'Elevator',
    'Security', '24/7 Water Supply', 'Power Backup', 'Air Conditioning',
    'Furnished', 'Internet', 'Balcony'
  ];

  if (!property) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Property</DialogTitle>
          <DialogDescription>
            Update the details for {property.title}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Details */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Property Title*</Label>
                <Input 
                  id="title" 
                  name="title" 
                  value={formData.title} 
                  onChange={handleChange} 
                  placeholder="Enter property title"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="price">Price (in $)*</Label>
                <Input 
                  id="price" 
                  name="price" 
                  type="number" 
                  value={formData.price} 
                  onChange={handleNumberChange} 
                  placeholder="Enter property price"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="type">Property Type*</Label>
                <Select name="type" value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="House">House</SelectItem>
                    <SelectItem value="Apartment">Apartment</SelectItem>
                    <SelectItem value="Villa">Villa</SelectItem>
                    <SelectItem value="Condo">Condo</SelectItem>
                    <SelectItem value="Land">Land</SelectItem>
                    <SelectItem value="Office">Office</SelectItem>
                    <SelectItem value="Retail">Retail</SelectItem>
                    <SelectItem value="Farm">Farm</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="category">Category*</Label>
                <Select name="category" value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Residential">Residential</SelectItem>
                    <SelectItem value="Commercial">Commercial</SelectItem>
                    <SelectItem value="Industrial">Industrial</SelectItem>
                    <SelectItem value="Agricultural">Agricultural</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="status">Status*</Label>
                <Select name="status" value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="sold">Sold</SelectItem>
                    <SelectItem value="rented">Rented</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="featured" 
                  checked={formData.featured} 
                  onCheckedChange={(checked) => handleCheckboxChange('featured', checked as boolean)} 
                />
                <Label htmlFor="featured">Featured Property</Label>
              </div>
            </div>
            
            {/* Property Details */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="description">Description*</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  value={formData.description} 
                  onChange={handleChange} 
                  placeholder="Enter property description"
                  rows={4}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input 
                    id="bedrooms" 
                    name="bedrooms" 
                    type="number" 
                    value={formData.bedrooms} 
                    onChange={handleNumberChange} 
                    placeholder="Number of bedrooms"
                  />
                </div>
                <div>
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Input 
                    id="bathrooms" 
                    name="bathrooms" 
                    type="number" 
                    value={formData.bathrooms} 
                    onChange={handleNumberChange} 
                    placeholder="Number of bathrooms"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="size.area">Area</Label>
                  <Input 
                    id="size.area" 
                    name="size.area" 
                    type="number" 
                    value={formData.size.area} 
                    onChange={handleNumberChange} 
                    placeholder="Area size"
                  />
                </div>
                <div>
                  <Label htmlFor="size.areaUnit">Unit</Label>
                  <Select name="size.areaUnit" value={formData.size.areaUnit} onValueChange={(value) => setFormData(prev => ({ ...prev, size: { ...prev.size, areaUnit: value } }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sq ft">Square Feet</SelectItem>
                      <SelectItem value="sq m">Square Meters</SelectItem>
                      <SelectItem value="acres">Acres</SelectItem>
                      <SelectItem value="hectares">Hectares</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
          
          {/* Location Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Location Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location.address">Address*</Label>
                <Input 
                  id="location.address" 
                  name="location.address" 
                  value={formData.location.address} 
                  onChange={handleChange} 
                  placeholder="Street address"
                  required
                />
              </div>
              <div>
                <Label htmlFor="location.city">City*</Label>
                <Input 
                  id="location.city" 
                  name="location.city" 
                  value={formData.location.city} 
                  onChange={handleChange} 
                  placeholder="City"
                  required
                />
              </div>
              <div>
                <Label htmlFor="location.state">State*</Label>
                <Input 
                  id="location.state" 
                  name="location.state" 
                  value={formData.location.state} 
                  onChange={handleChange} 
                  placeholder="State"
                  required
                />
              </div>
              <div>
                <Label htmlFor="location.zipCode">Zip Code*</Label>
                <Input 
                  id="location.zipCode" 
                  name="location.zipCode" 
                  value={formData.location.zipCode} 
                  onChange={handleChange} 
                  placeholder="Zip code"
                  required
                />
              </div>
            </div>
          </div>
          
          {/* Image URL */}
          <div>
            <Label htmlFor="imageUrl">Image URL*</Label>
            <Input 
              id="imageUrl" 
              name="imageUrl" 
              value={formData.imageUrl} 
              onChange={handleChange} 
              placeholder="Enter image URL for the property"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Enter a URL for the property image.
            </p>
          </div>
          
          {/* Amenities */}
          <div>
            <h3 className="text-lg font-medium mb-2">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {commonAmenities.map(amenity => (
                <div className="flex items-center space-x-2" key={amenity}>
                  <Checkbox 
                    id={`amenity-${amenity}`} 
                    checked={formData.amenities.includes(amenity)} 
                    onCheckedChange={(checked) => handleCheckboxChange(`amenity-${amenity}`, checked as boolean)} 
                  />
                  <Label htmlFor={`amenity-${amenity}`}>{amenity}</Label>
                </div>
              ))}
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const ViewAsJsonDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  property: Property | null;
}> = ({ open, onClose, property }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    if (property) {
      navigator.clipboard.writeText(JSON.stringify(property, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  if (!property) return null;
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Property JSON Format</DialogTitle>
          <DialogDescription>
            This is the JSON representation of the property data.
          </DialogDescription>
        </DialogHeader>
        
        <div className="bg-muted rounded-md p-4 relative">
          <Button 
            size="sm" 
            variant="outline" 
            className="absolute right-4 top-4" 
            onClick={handleCopy}
          >
            {copied ? <Check className="h-4 w-4 mr-1" /> : <Clipboard className="h-4 w-4 mr-1" />}
            {copied ? "Copied!" : "Copy"}
          </Button>
          <pre className="text-xs overflow-auto whitespace-pre-wrap max-h-[400px]">
            {JSON.stringify(property, null, 2)}
          </pre>
        </div>
        
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const PropertiesManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [properties, setProperties] = useState<Property[]>([]);
  const [filterValue, setFilterValue] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isAddPropertyModalOpen, setIsAddPropertyModalOpen] = useState(false);
  const [isJsonPropertyModalOpen, setIsJsonPropertyModalOpen] = useState(false);
  const [viewJsonProperty, setViewJsonProperty] = useState<Property | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isEditPropertyModalOpen, setIsEditPropertyModalOpen] = useState(false);
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isJsonViewOpen, setIsJsonViewOpen] = useState(false);
  
    const fetchProperties = async () => {
      try {
        setIsLoading(true);
        console.log('Fetching properties...');
        const response = await api.get('/properties', { 
          params: { limit: 1000 } // Fetch all properties
        });
        
        console.log('API Response:', response.data);
      
        // Check response structure and adapt accordingly
        let propertiesData = [];
      
        if (response.data && Array.isArray(response.data)) {
          // Array response format
          propertiesData = response.data;
          console.log('Direct array format detected, found', propertiesData.length, 'properties');
        } else if (response.data && response.data.properties && Array.isArray(response.data.properties)) {
          // Object with properties array format
          propertiesData = response.data.properties;
          console.log('Object with properties array format detected, found', propertiesData.length, 'properties');
        } else if (response.data) {
          // For any other format, log the structure and use an empty array as fallback
          console.warn('Unexpected API response structure:', response.data);
          propertiesData = [];
        }
      
        // Map the data to match our Property interface
        const mappedProperties = propertiesData.map((property: any) => ({
          _id: property._id || `tmp-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          id: property._id || property.id, // For backward compatibility
          title: property.title || 'Untitled Property',
          type: property.type || property.propertyType || 'Unknown',
          category: property.category || 'Residential',
          price: property.price || 0,
          location: property.location || {},
          imageUrl: property.images && property.images.length > 0 
            ? property.images[0].url 
            : property.imageUrl || '/placeholder.svg',
          images: property.images || [],
          createdAt: property.createdAt || new Date().toISOString(),
          featured: property.featured || false,
          description: property.description || '',
          bedrooms: property.bedrooms || property.propertyDetails?.bedrooms || 0,
          bathrooms: property.bathrooms || property.propertyDetails?.bathrooms || 0,
          size: property.size || { area: 0, areaUnit: 'sq ft' },
          status: property.status || 'active',
          amenities: property.amenities || []
        }));
      
        console.log('Mapped properties:', mappedProperties.length);
        setProperties(mappedProperties);
      } catch (error: any) {
        console.error('Failed to fetch properties:', error);
        setProperties([]);
        
        // Show more detailed error messages based on the error type
        if (error.code === 'ERR_NETWORK') {
          toast({
            variant: 'destructive',
            title: 'Network Error',
            description: 'Cannot connect to the server. Please check if your backend is running.'
          });
        } else if (error.response) {
          // The request was made and the server responded with a status code
          toast({
            variant: 'destructive',
            title: `Error ${error.response.status}`,
            description: error.response.data?.message || 'Failed to load properties from the database'
          });
        } else {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: error.message || 'Failed to load properties from the database'
          });
        }
      } finally {
        setIsLoading(false);
      }
    };
    
  useEffect(() => {
    fetchProperties();
  }, []);

  const handleFeatureToggle = async (propertyId: string) => {
    try {
      // Find the property to toggle
      const property = properties.find(p => p._id === propertyId);
      if (!property) return;
      
      // Make API call to update the featured status
      await api.patch(`/properties/${propertyId}`, {
        featured: !property.featured
      });
      
      // Update local state
      setProperties(currentProperties => 
        currentProperties.map(property => 
          property._id === propertyId 
            ? { ...property, featured: !property.featured } 
            : property
        )
      );
      
      toast({
        title: "Success",
        description: `Property ${!property.featured ? "featured" : "unfeatured"} successfully`,
      });
    } catch (error) {
      console.error('Failed to update property:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update property featured status'
      });
    }
  };

  const handleMarkAsSold = async (propertyId: string) => {
    try {
      // Find the property to update
      const property = properties.find(p => p._id === propertyId);
      if (!property) return;
      
      // Make API call to update the status
      await api.patch(`/properties/${propertyId}`, {
        status: 'sold'
      });
      
      // Update local state
      setProperties(currentProperties => 
        currentProperties.map(property => 
          property._id === propertyId 
            ? { ...property, status: 'sold' } 
            : property
        )
      );
      
      toast({
        title: "Success",
        description: "Property marked as sold successfully",
      });
    } catch (error) {
      console.error('Failed to update property status:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to mark property as sold'
      });
    }
  };

  const handleDeleteProperty = async (propertyId: string) => {
    try {
      // Make API call to delete the property
      await api.delete(`/properties/${propertyId}`);
      
      // Update local state
      setProperties(currentProperties => 
        currentProperties.filter(property => property._id !== propertyId)
      );
      
      // Close the confirm dialog
      setIsDeleteConfirmOpen(false);
      setSelectedProperty(null);
      
      toast({
        title: "Success",
        description: "Property deleted successfully",
      });
    } catch (error) {
      console.error('Failed to delete property:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete property'
      });
    }
  };

  const handleEditProperty = (property: Property) => {
    setSelectedProperty(property);
    setIsEditPropertyModalOpen(true);
  };

  // Add a function to fetch property details by ID
  const fetchPropertyDetails = async (propertyId: string) => {
    try {
      setIsLoading(true);
      // First set the selected property with the summary data we already have
      const propertySummary = properties.find(p => p._id === propertyId);
      setSelectedProperty(propertySummary || null);
      
      // Then open the dialog immediately so user sees something
      console.log('Opening property details dialog for ID:', propertyId);
      setIsViewDetailsOpen(true);
      
      // Verify the API base URL
      console.log('API Base URL:', api.defaults.baseURL);
      
      // Then try to fetch the full details - using the consistent API path format
      console.log('Fetching property details for ID:', propertyId);
      
      // Use a try-catch within the function to specifically catch API request errors
      try {
        const response = await api.get(`/properties/${propertyId}`);
        
        // Log the full response for debugging
        console.log('Full API response:', response);
        
        if (response.data) {
          console.log('Property details received:', response.data);
          // Update with the full property details
          setSelectedProperty(response.data);
        } else {
          console.warn('Empty response data from API');
        }
      } catch (apiError: any) {
        // Log detailed API error information
        console.error('API error details:', {
          status: apiError.response?.status,
          statusText: apiError.response?.statusText,
          data: apiError.response?.data,
          url: apiError.config?.url,
          method: apiError.config?.method,
          message: apiError.message
        });
        
        // Keep the dialog open with the summary data
        console.warn('Using summary data as fallback');
      }
    } catch (error: any) {
      console.error('Failed to fetch property details:', error);
      
      // Show error message but keep dialog open with summary data
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not load full property details. Showing limited information.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProperties = properties.filter(property => {
    // Text search filter
    const matchesSearch = 
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (typeof property.location === 'string' ? 
        property.location.toLowerCase().includes(searchTerm.toLowerCase()) :
        property.location.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.address?.toLowerCase().includes(searchTerm.toLowerCase()));

    // Status filter
    let matchesFilter = true;
    if (filterValue === 'featured') {
      matchesFilter = property.featured === true;
    } else if (filterValue === 'active') {
      matchesFilter = property.featured === false;
    }

    return matchesSearch && matchesFilter;
  });
  
  const formatDateString = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getFeaturedCount = () => {
    return properties.filter(p => p.featured).length;
  };

  const getTotalCount = () => {
    return properties.length;
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              className="pl-10"
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={filterValue} onValueChange={setFilterValue}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Properties ({getTotalCount()})</SelectItem>
              <SelectItem value="featured">Featured ({getFeaturedCount()})</SelectItem>
              <SelectItem value="active">Active (Non-Featured)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex space-x-2">
          <Button 
            className="bg-primary hover:bg-primary/90"
            onClick={() => setIsAddPropertyModalOpen(true)}
          >
          <Plus className="mr-2 h-4 w-4" />
            Add Property
          </Button>
          <Button 
            variant="outline"
            onClick={() => setIsJsonPropertyModalOpen(true)}
          >
            <Code className="mr-2 h-4 w-4" />
            JSON Editor
        </Button>
        </div>
      </div>
      
      {/* Add Property Modal */}
      <AddPropertyModal 
        open={isAddPropertyModalOpen} 
        onOpenChange={setIsAddPropertyModalOpen} 
        onPropertyAdded={fetchProperties}
      />

      {/* JSON Property Form */}
      <JsonPropertyForm
        open={isJsonPropertyModalOpen}
        onOpenChange={setIsJsonPropertyModalOpen}
        onPropertyAdded={fetchProperties}
      />
      
      {/* View as JSON Dialog */}
      <ViewAsJsonDialog
        open={!!viewJsonProperty}
        onClose={() => setViewJsonProperty(null)}
        property={viewJsonProperty}
      />
      
      {/* Property Details Dialog */}
      <Dialog 
        open={isViewDetailsOpen} 
        onOpenChange={(open) => {
          if (!open) {
            setIsViewDetailsOpen(false);
          }
        }}
      >
        <DialogContent 
          className="max-w-4xl max-h-[90vh] overflow-y-auto"
          onPointerDownOutside={(e) => {
            e.preventDefault();
          }}
          onEscapeKeyDown={(e) => {
            e.preventDefault();
            setIsViewDetailsOpen(false);
          }}
        >
          <DialogHeader>
            <DialogTitle>Property Details</DialogTitle>
          </DialogHeader>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : selectedProperty ? (
            <div className="space-y-6">
              <div className="aspect-video overflow-hidden rounded-lg">
                <img 
                  src={selectedProperty.imageUrl || '/placeholder.svg'} 
                  alt={selectedProperty.title || 'Property image'} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.svg';
                    console.log('Image failed to load, using placeholder');
                  }}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-2xl font-bold">{selectedProperty.title || 'Untitled Property'}</h2>
                  <div className="flex items-center mt-2 space-x-2">
                    <Badge variant={selectedProperty.status === 'sold' ? 'destructive' : 'default'}>
                      {selectedProperty.status === 'sold' ? 'Sold' : 'Active'}
                    </Badge>
                    {selectedProperty.featured && (
                      <Badge variant="secondary">Featured</Badge>
                    )}
                  </div>
                  <p className="text-2xl font-bold text-primary mt-4">
                    ${(selectedProperty.price || 0).toLocaleString()}
                  </p>
                  
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold">Location</h3>
                    <p className="text-gray-600">
                      {typeof selectedProperty.location === 'string' 
                        ? selectedProperty.location 
                        : `${selectedProperty.location?.address || ''}, ${selectedProperty.location?.city || ''}, ${selectedProperty.location?.state || ''} ${selectedProperty.location?.zipCode || ''}`}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">Details</h3>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div>
                        <p className="text-sm text-gray-500">Property Type</p>
                        <p>{selectedProperty.type || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Category</p>
                        <p>{selectedProperty.category || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Bedrooms</p>
                        <p>{selectedProperty.bedrooms || 0}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Bathrooms</p>
                        <p>{selectedProperty.bathrooms || 0}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Size</p>
                        <p>
                          {typeof selectedProperty.size === 'string' 
                            ? selectedProperty.size 
                            : `${selectedProperty.size?.area || 0} ${selectedProperty.size?.areaUnit || 'sq ft'}`}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Listed Date</p>
                        <p>{selectedProperty.createdAt ? formatDateString(selectedProperty.createdAt) : 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold">Description</h3>
                    <p className="text-gray-600">{selectedProperty.description || 'No description available'}</p>
                  </div>
                  
                  {selectedProperty.amenities && selectedProperty.amenities.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold">Amenities</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedProperty.amenities.map((amenity) => (
                          <Badge key={amenity} variant="outline">{amenity}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSelectedProperty(selectedProperty);
                    setIsViewDetailsOpen(false);
                    setIsEditPropertyModalOpen(true);
                  }}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit Property
                </Button>
                <Button 
                  variant="default" 
                  onClick={() => {
                    setIsViewDetailsOpen(false);
                  }}
                >
                  Close
                </Button>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-gray-500">Property not found or could not be loaded.</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this property? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {selectedProperty && (
            <div className="flex items-center space-x-3 mt-2">
              <img 
                src={selectedProperty.imageUrl} 
                alt={selectedProperty.title} 
                className="w-12 h-12 rounded object-cover"
              />
              <div>
                <p className="font-medium">{selectedProperty.title}</p>
                <p className="text-sm text-gray-500">
                  {typeof selectedProperty.location === 'string' 
                    ? selectedProperty.location 
                    : selectedProperty.location.city || selectedProperty.location.address}
                </p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteConfirmOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => selectedProperty && handleDeleteProperty(selectedProperty._id)}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Property Modal */}
      <EditPropertyModal 
        open={isEditPropertyModalOpen} 
        onOpenChange={setIsEditPropertyModalOpen} 
        property={selectedProperty}
        onPropertyUpdated={() => {
          fetchProperties();
          setIsEditPropertyModalOpen(false);
          toast({
            title: "Success",
            description: "Property updated successfully",
            variant: "default",
          });
        }}
      />
      
      <Card className="shadow-sm">
        <CardHeader className="py-4">
          <CardTitle className="text-lg font-medium">Properties List</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Property</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Listed Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProperties.map((property) => (
                <TableRow key={property._id}>
                  <TableCell>
                    <div className="flex items-center">
                      <img
                        src={property.imageUrl}
                        alt={property.title}
                        className="w-10 h-10 rounded object-cover mr-3"
                      />
                      <span className="font-medium">{property.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>{property.type}</TableCell>
                  <TableCell>
                    ${property.price.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {typeof property.location === 'string' 
                      ? property.location 
                      : (property.location.city || property.location.address || 'N/A')}
                  </TableCell>
                  <TableCell>{formatDateString(property.createdAt)}</TableCell>
                  <TableCell>
                    <Badge variant={property.status === 'sold' ? 'destructive' : 'outline'}>
                      {property.status === 'sold' ? 'Sold' : 'Active'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        checked={property.featured} 
                        onCheckedChange={() => handleFeatureToggle(property._id)}
                        aria-label="Toggle featured status"
                      />
                      {property.featured && <Star className="h-4 w-4 text-yellow-500" />}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" onCloseAutoFocus={(e) => e.preventDefault()}>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onSelect={(e) => {
                            e.preventDefault();
                            fetchPropertyDetails(property._id);
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            fetchPropertyDetails(property._id);
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditProperty(property)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Property
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setViewJsonProperty(property)}>
                          <Code className="mr-2 h-4 w-4" />
                          View as JSON
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Calendar className="mr-2 h-4 w-4" />
                          Schedule Showing
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleFeatureToggle(property._id)}>
                          <Star className="mr-2 h-4 w-4" color={property.featured ? "#EAB308" : "#6B7280"} />
                          {property.featured ? 'Remove from Featured' : 'Mark as Featured'}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleMarkAsSold(property._id)}>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Mark as Sold
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => {
                            setSelectedProperty(property);
                            setIsDeleteConfirmOpen(true);
                          }}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertiesManagement;

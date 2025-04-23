import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import api from '@/utils/api';

const propertySchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  price: z.string().transform(Number).refine(val => !isNaN(val) && val > 0, 'Price must be a positive number'),
  type: z.enum(['house', 'apartment', 'condo', 'townhouse', 'land']),
  bedrooms: z.string().transform(Number).refine(val => !isNaN(val) && val >= 0, 'Must be 0 or more'),
  bathrooms: z.string().transform(Number).refine(val => !isNaN(val) && val >= 0, 'Must be 0 or more'),
  size: z.object({
    area: z.string().transform(Number).refine(val => !isNaN(val) && val > 0, 'Area must be positive'),
    areaUnit: z.enum(['sqft', 'sqm']),
  }),
  location: z.object({
    address: z.string().min(5, 'Address is required'),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State is required'),
    zipCode: z.string().min(5, 'ZIP code is required'),
  }),
  amenities: z.array(z.string()).optional(),
});

type PropertyFormData = z.infer<typeof propertySchema>;

interface Property {
  _id: string;
  title: string;
  description: string;
  price: number;
  type: string;
  bedrooms: number;
  bathrooms: number;
  size: {
    area: number;
    areaUnit: string;
  };
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  amenities?: string[];
  images: Array<{ url: string; caption?: string }>;
}

interface EditPropertyFormProps {
  property: Property;
  onClose: () => void;
  onPropertyUpdated: (updatedProperty: Property) => void;
}

const EditPropertyForm: React.FC<EditPropertyFormProps> = ({ property, onClose, onPropertyUpdated }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newImages, setNewImages] = useState<File[]>([]);
  const { toast } = useToast();

  const form = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: property.title,
      description: property.description,
      price: property.price.toString(),
      type: property.type as any,
      bedrooms: property.bedrooms.toString(),
      bathrooms: property.bathrooms.toString(),
      size: {
        area: property.size.area.toString(),
        areaUnit: property.size.areaUnit,
      },
      location: {
        address: property.location.address,
        city: property.location.city,
        state: property.location.state,
        zipCode: property.location.zipCode,
      },
      amenities: property.amenities || [],
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      setNewImages(prev => [...prev, ...fileList]);
    }
  };

  const onSubmit = async (data: PropertyFormData) => {
    try {
      setIsSubmitting(true);

      // Format the images array for the API
      // If there are new images, add them to formData
      const formData = new FormData();
      newImages.forEach((image) => {
        formData.append('images', image);
      });

      // Process existing images - ensure they have valid URLs
      const processedImages = property.images.map(img => {
        let imgUrl = typeof img === 'string' ? img : img.url;
        
        // Add protocol if missing and URL is not empty
        if (imgUrl && !imgUrl.startsWith('http://') && !imgUrl.startsWith('https://')) {
          imgUrl = 'https://' + imgUrl;
          console.log('Added https:// prefix to existing image URL:', imgUrl);
        }
        
        return {
          url: imgUrl,
          caption: typeof img === 'object' && img.caption ? img.caption : '',
          isPrimary: false
        };
      }).filter(img => img.url); // Remove any empty URLs
      
      console.log('Processed existing images:', processedImages);

      // Fix type issues by converting string values to appropriate types
      const propertyDataForApi = {
        ...data,
        // Convert string numbers to actual numbers
        price: Number(data.price),
        bedrooms: Number(data.bedrooms),
        bathrooms: Number(data.bathrooms),
        size: {
          area: Number(data.size.area),
          areaUnit: data.size.areaUnit as "sqft" | "sqm" // Ensure it matches the enum
        },
        status: 'active', // Ensure status is active for consistency
        // Add existing images to make sure they're not lost during update
        images: processedImages
      };

      console.log('Updating property with data:', propertyDataForApi);
      formData.append('propertyData', JSON.stringify(propertyDataForApi));

      // Update the property
      const response = await api.put(`/properties/${property._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast({
        title: 'Success',
        description: 'Property updated successfully',
      });

      onPropertyUpdated(response.data);
      onClose();
    } catch (error) {
      console.error('Failed to update property:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update property',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Property</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={4} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="condo">Condo</SelectItem>
                        <SelectItem value="townhouse">Townhouse</SelectItem>
                        <SelectItem value="land">Land</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="bedrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bedrooms</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" min="0" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bathrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bathrooms</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" min="0" step="0.5" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="size.area"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Area</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" min="0" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="size.areaUnit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="sqft">Square Feet</SelectItem>
                        <SelectItem value="sqm">Square Meters</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="location.address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street Address</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="location.city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location.state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location.zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ZIP Code</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div>
              <FormLabel>Current Images</FormLabel>
              <div className="grid grid-cols-3 gap-4 mt-2">
                {property.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image.url}
                      alt={image.caption || `Property image ${index + 1}`}
                      className="w-full h-24 object-cover rounded"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <FormLabel>Add New Images</FormLabel>
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="mt-1"
              />
              {newImages.length > 0 && (
                <p className="text-sm text-gray-500 mt-2">
                  {newImages.length} new images selected
                </p>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Updating...' : 'Update Property'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPropertyForm; 
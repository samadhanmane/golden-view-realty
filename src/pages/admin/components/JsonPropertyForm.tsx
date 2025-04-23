import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import api from '@/utils/api';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clipboard, Check, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface JsonPropertyFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPropertyAdded: () => void;
}

// Define the minimum required property structure
const propertyTemplate = {
  title: "Beautiful Family Home",
  description: "A spacious family home in a quiet neighborhood",
  price: 350000,
  propertyType: "House",
  landType: "Residential",
  address: {
    street: "123 Main Street",
    city: "Anytown",
    state: "State",
    zipCode: "123456",
    country: "India"
  },
  legalStatus: "Clear Title", // Required field
  area: {
    total: 2000,
    unit: "sq ft"
  },
  ownerDetails: {
    name: "Demo Owner",
    phoneNumbers: ["1234567890"],
    email: "demo@example.com"
  },
  propertyDetails: {
    bedrooms: 3,
    bathrooms: 2,
    floors: 2
  },
  status: "Available",
  listingType: "Sale",
  featured: false,
  images: [
    {
      url: "https://example.com/image1.jpg",
      isPrimary: true
    }
  ],
  amenities: ["Parking", "Garden", "Swimming Pool"],
  features: {
    hasGarden: true,
    hasPool: true,
    hasCentralHeating: true
  }
};

const JsonPropertyForm: React.FC<JsonPropertyFormProps> = ({ open, onOpenChange, onPropertyAdded }) => {
  const [jsonInput, setJsonInput] = useState(JSON.stringify(propertyTemplate, null, 2));
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const { toast } = useToast();
  const [userId, setUserId] = useState<string | null>(null);

  // Get the current user's ID from storage on component mount
  useEffect(() => {
    const getUserId = () => {
      // Try multiple storage locations and formats
      
      // Try sessionStorage first (might be faster)
      const sessionToken = sessionStorage.getItem('current_token');
      if (sessionToken) {
        console.log('Found token in sessionStorage');
      }
      
      // Try 'user' in localStorage
      try {
        const userStr = localStorage.getItem('user');
        if (userStr) {
          const user = JSON.parse(userStr);
          if (user && user._id) {
            console.log('Found user ID in localStorage.user:', user._id);
            setUserId(user._id);
            return;
          }
        }
      } catch (err) {
        console.warn('Error parsing user from localStorage:', err);
      }
      
      // Try 'golden_view_auth' in localStorage
      try {
        const authStr = localStorage.getItem('golden_view_auth');
        if (authStr) {
          const auth = JSON.parse(authStr);
          if (auth && auth.user && auth.user._id) {
            console.log('Found user ID in golden_view_auth:', auth.user._id);
            setUserId(auth.user._id);
            return;
          }
        }
      } catch (err) {
        console.warn('Error parsing golden_view_auth from localStorage:', err);
      }
      
      // If we reach here, no valid user ID was found
      console.warn('No valid user ID found in storage');
      
      // Create a valid ObjectId-like ID for testing/fallback
      const timestamp = Math.floor(Date.now() / 1000).toString(16);
      const machineId = Math.floor(Math.random() * 16777216).toString(16).padStart(6, '0');
      const processId = Math.floor(Math.random() * 65536).toString(16).padStart(4, '0');
      const counter = Math.floor(Math.random() * 16777216).toString(16).padStart(6, '0');
      
      const fallbackId = `${timestamp}${machineId}${processId}${counter}`;
      console.log('Using fallback ID:', fallbackId);
      setUserId(fallbackId);
    };

    getUserId();
  }, []);

  const handleCopyTemplate = () => {
    navigator.clipboard.writeText(JSON.stringify(propertyTemplate, null, 2));
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const validateJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      
      // Basic validation - check required fields
      if (!parsed.title || typeof parsed.title !== 'string') {
        setValidationError("Property title is required");
        return false;
      }
      
      if (!parsed.description || typeof parsed.description !== 'string') {
        setValidationError("Property description is required");
        return false;
      }
      
      if (!parsed.price || typeof parsed.price !== 'number') {
        setValidationError("Valid property price is required");
        return false;
      }
      
      if (!parsed.propertyType && !parsed.type) {
        setValidationError("Property type is required");
        return false;
      }
      
      if (!parsed.legalStatus) {
        setValidationError("Legal status is required");
        return false;
      }
      
      if (!parsed.area?.total) {
        setValidationError("Area total is required");
        return false;
      }
      
      if (!parsed.address || !parsed.address.street || !parsed.address.city || 
          !parsed.address.state || !parsed.address.zipCode) {
        setValidationError("Complete address is required (street, city, state, zipCode)");
        return false;
      }
      
      if (!parsed.ownerDetails || !parsed.ownerDetails.name || !parsed.ownerDetails.email) {
        setValidationError("Owner details (name and email) are required");
        return false;
      }
      
      setValidationError(null);
      return true;
    } catch (error) {
      setValidationError("Invalid JSON format: " + (error as Error).message);
      return false;
    }
  };

  const handleSubmit = async () => {
    // Validate the JSON input
    if (!validateJson(jsonInput)) {
      return;
    }

    setLoading(true);
    try {
      const propertyData = JSON.parse(jsonInput);
      
      console.log("Using user ID for submission:", userId || "None (backend will generate one)");
      
      // Ensure zipCode matches the required format (6 digits)
      let zipCode = propertyData.address?.zipCode || "123456";
      if (!/^\d{6}$/.test(zipCode)) {
        zipCode = "123456"; // Use default if not valid
        console.warn("ZIP code format invalid, using default value");
      }
      
      // Create a more backend-compatible format to match EXACTLY what the Property model expects
      const formattedProperty = {
        title: propertyData.title,
        description: propertyData.description,
        price: parseFloat(propertyData.price?.toString() || "0"),
        
        // Use propertyType as the model expects (not type)
        propertyType: propertyData.propertyType || propertyData.type || "House",
        
        // Category (optional)
        category: propertyData.category || "Residential",
        
        // Required address fields - ensure all required fields are present
        address: {
          street: propertyData.address?.street || "123 Main Street",
          city: propertyData.address?.city || "Default City",
          state: propertyData.address?.state || "Default State",
          zipCode: zipCode, // Use the validated zipCode
          country: propertyData.address?.country || "India",
          landmark: propertyData.address?.landmark || "",
          neighborhood: propertyData.address?.neighborhood || ""
        },
        
        // Required legalStatus field - ensure it's a valid enum value
        legalStatus: ["NA", "Non-NA", "Under Litigation", "Clear Title", "Disputed", "Encumbered"].includes(propertyData.legalStatus)
          ? propertyData.legalStatus
          : "Clear Title",
        
        // Required area with total
        area: {
          total: Number(propertyData.area?.total || 1000),
          unit: ["sq ft", "sq meter", "acre", "hectare", "sqft", "sqm", "acres", "hectares"].includes(propertyData.area?.unit)
            ? propertyData.area?.unit
            : "sq ft"
        },
        
        // Required status with valid enum value
        status: propertyData.status === "Available" ? "active" :
                propertyData.status === "Sold" ? "Sold" :
                propertyData.status === "Rented" ? "Rented" : 
                propertyData.status === "Pending" ? "Pending" : "active",
        
        // Property details
        propertyDetails: {
          bedrooms: Number(propertyData.propertyDetails?.bedrooms || propertyData.bedrooms || 0),
          bathrooms: Number(propertyData.propertyDetails?.bathrooms || propertyData.bathrooms || 0),
          floors: Number(propertyData.propertyDetails?.floors || 1)
        },
        
        // Required owner details
        ownerDetails: {
          name: propertyData.ownerDetails?.name || "Demo Owner",
          phoneNumbers: Array.isArray(propertyData.ownerDetails?.phoneNumbers) 
            ? propertyData.ownerDetails.phoneNumbers 
            : ["1234567890"],
          email: propertyData.ownerDetails?.email || "demo@example.com",
          alternateContact: propertyData.ownerDetails?.alternateContact || ""
        },
        
        // Let the backend handle owner and postedBy with proper ObjectId creation
        // We don't include these fields in the request
        
        // Images 
        images: Array.isArray(propertyData.images) && propertyData.images.length > 0 
          ? propertyData.images.map((img: any, index: number) => ({
              url: typeof img === 'string' ? img : img.url,
              isPrimary: typeof img === 'string' ? index === 0 : Boolean(img.isPrimary)
            }))
          : [{ url: "https://placehold.co/600x400?text=Property+Image", isPrimary: true }],
        
        // Optional fields
        featured: Boolean(propertyData.featured),
        amenities: Array.isArray(propertyData.amenities) ? propertyData.amenities : [],
        listingType: ["Sale", "Rent", "Auction", "Short-Term", "Lease"].includes(propertyData.listingType)
          ? propertyData.listingType
          : "Sale",
        ...(propertyData.propertyType === "Land" && { landType: propertyData.landType || "Residential" })
      };

      console.log("Sending formatted property data:", JSON.stringify(formattedProperty, null, 2));
      
      try {
        // Send the property data to the server using the special JSON form endpoint
        const response = await api.post('/properties/json-form', formattedProperty);
        
        console.log("API Response:", response.data);
        
        // Determine message based on response
        const isDemoMode = !response.data.owner || 
                          (typeof response.data.owner === 'string' && response.data.owner.includes('mock'));
        
        toast({
          title: "Success",
          description: isDemoMode 
            ? "Property has been added successfully in demo mode" 
            : "Property has been added successfully",
        });
        
        onPropertyAdded();
        onOpenChange(false);
      } catch (apiError: any) {
        // Handle API-specific errors
        console.error("API Error Details:", {
          status: apiError.response?.status,
          statusText: apiError.response?.statusText,
          data: apiError.response?.data,
          headers: apiError.response?.headers,
          config: {
            url: apiError.config?.url,
            method: apiError.config?.method,
            data: JSON.parse(apiError.config?.data || "{}")
          }
        });
        
        if (apiError.response?.data) {
          const errorData = apiError.response.data;
          console.log("Detailed API error:", errorData);
          
          // Check for validation errors array
          if (errorData.errors && Array.isArray(errorData.errors)) {
            const errorMessages = errorData.errors.map((err: any) => 
              `${err.field || ''}: ${err.message || 'Invalid value'}`
            ).join('\n');
            
            setValidationError(`Validation failed:\n${errorMessages}`);
          } else if (errorData.message) {
            // General API error message
            setValidationError(errorData.message);
          } else {
            setValidationError(`Server error (${apiError.response.status})`);
          }
        } else {
          throw apiError; // Re-throw to be caught by outer catch
        }
      }
    } catch (error: any) {
      console.error('Error adding property:', error);
      
      // More detailed error handling
      let errorMessage = 'Failed to add property';
      
      if (error.response) {
        console.log('Server error details:', error.response.data);
        
        if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.status === 400) {
          errorMessage = 'Invalid property data format. Please check your JSON structure.';
        } else if (error.response.status === 500) {
          errorMessage = 'Server error: The property could not be created';
        }
      } else if (error.request) {
        errorMessage = 'Unable to reach the server. Please try again later.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Property via JSON</DialogTitle>
          <DialogDescription>
            Enter your property details in JSON format or use the template provided.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="editor">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="editor">JSON Editor</TabsTrigger>
            <TabsTrigger value="help">Help & Template</TabsTrigger>
          </TabsList>
          
          <TabsContent value="editor" className="space-y-4">
            {validationError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription className="whitespace-pre-line">{validationError}</AlertDescription>
              </Alert>
            )}
            
            <Textarea 
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder="Paste your JSON property data here"
              className="min-h-[400px] font-mono text-sm"
            />
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={handleCopyTemplate}>
                {copySuccess ? <Check className="h-4 w-4 mr-2" /> : <Clipboard className="h-4 w-4 mr-2" />}
                {copySuccess ? "Copied!" : "Copy Template"}
              </Button>
              
              <Button 
                onClick={() => validateJson(jsonInput)}
                variant="outline"
              >
                Validate JSON
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="help" className="space-y-4">
            <div className="text-sm">
              <h3 className="text-lg font-semibold mb-2">JSON Property Template Format</h3>
              <p className="mb-4">
                Use the template below as a guide for adding properties. Required fields are marked with an asterisk (*).
              </p>
              
              <div className="bg-muted p-4 rounded-md">
                <pre className="text-xs overflow-auto whitespace-pre-wrap">
                  {`{
  "title": "Property Title", // * Required
  "description": "Detailed description", // * Required
  "price": 350000, // * Required, number
  "propertyType": "House", // * Required: House, Apartment, Villa, etc.
  "legalStatus": "Clear Title", // * Required: NA, Non-NA, Clear Title, etc.
  "address": { // * Required
    "street": "123 Main Street",
    "city": "Anytown",
    "state": "State",
    "zipCode": "123456",
    "country": "India"
  },
  "area": {
    "total": 2000, // * Required, Number
    "unit": "sq ft" // "sq ft", "sq meter", "acre", etc.
  },
  "ownerDetails": { // * Required
    "name": "Demo Owner",
    "phoneNumbers": ["1234567890"],
    "email": "demo@example.com"
  },
  "propertyDetails": {
    "bedrooms": 3, // Number
    "bathrooms": 2, // Number
    "floors": 2 // Number
  },
  "status": "Available", // Available, Sold, Rented, Pending
  "listingType": "Sale", // Sale, Rent, Auction
  "featured": false, // Boolean
  "images": [
    {
      "url": "https://example.com/image1.jpg",
      "isPrimary": true
    }
  ],
  "amenities": ["Parking", "Garden", "Swimming Pool"],
  "features": {
    "hasGarden": true,
    "hasPool": true,
    "hasCentralHeating": true
    // Other features...
  }
}`}
                </pre>
              </div>
              
              <h3 className="text-lg font-semibold mt-4 mb-2">Instructions</h3>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Copy the template or create your JSON based on the format</li>
                <li>Paste it into the JSON Editor tab</li>
                <li>Update the values with your property information</li>
                <li>Click "Validate JSON" to check for errors</li>
                <li>Submit when ready</li>
              </ol>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Adding...' : 'Add Property'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default JsonPropertyForm; 
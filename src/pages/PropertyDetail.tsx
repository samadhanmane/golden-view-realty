import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import PropertyCard from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Calendar, 
  Phone, 
  Mail, 
  FileText, 
  Check, 
  ChevronLeft, 
  ChevronRight,
  Home,
  Building,
  Info,
  CheckSquare
} from 'lucide-react';
import api from '@/utils/api';

const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { toast } = useToast();
  const [similarProperties, setSimilarProperties] = useState<any[]>([]);

  // New state for appointment scheduling (simplified)
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [scheduling, setScheduling] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) {
        setError(true);
        setLoading(false);
        toast({
          title: "Error",
          description: "Property ID is missing",
          variant: "destructive",
        });
        return;
      }

      // Check if we're in development mode - output debug info
      if (import.meta.env.DEV) {
        console.log(`Fetching property details for ID: ${id}`);
      }

      try {
        // Fetch property data from API
        const response = await api.get(`/properties/${id}`);
        const propertyData = response.data;
        
        // Debug property images
        console.log('Property images data:', propertyData.images);
        console.log('Property image URL:', propertyData.imageUrl);

        // Ensure we have at least one valid image URL
        let imageUrls: string[] = [];
        
        // Process images array if it exists
        if (Array.isArray(propertyData.images) && propertyData.images.length > 0) {
          imageUrls = propertyData.images.map(img => 
            typeof img === 'string' ? img : (img.url || '')
          ).filter(Boolean); // Remove any empty URLs
          console.log('Processed image URLs from images array:', imageUrls);
        }
        
        // Fallback to imageUrl if images array is empty
        if (imageUrls.length === 0 && propertyData.imageUrl) {
          imageUrls = [propertyData.imageUrl];
          console.log('Using fallback imageUrl:', propertyData.imageUrl);
        }
        
        // Add default placeholder if we still have no images
        if (imageUrls.length === 0) {
          imageUrls = ['https://placehold.co/600x400?text=No+Image'];
          console.log('No images found, using placeholder');
        }

        // Format the property data for display
        const formattedProperty = {
          id: propertyData._id,
          title: propertyData.title,
          location: propertyData.location?.address || propertyData.location,
          price: propertyData.price,
          category: propertyData.category,
          type: propertyData.type || propertyData.propertyType,
          size: propertyData.size?.area ? `${propertyData.size.area} ${propertyData.size.areaUnit || 'sq ft'}` : propertyData.size,
          bedrooms: propertyData.bedrooms || propertyData.propertyDetails?.bedrooms || 0,
          bathrooms: propertyData.bathrooms || propertyData.propertyDetails?.bathrooms || 0,
          featured: propertyData.featured,
          imageUrl: imageUrls[0], // Use the first valid image URL
          images: imageUrls, // Use our validated array of image URLs
          tags: propertyData.tags || [],
          createdAt: propertyData.createdAt,
          description: propertyData.description,
          amenities: propertyData.amenities || [],
          nearbyPlaces: propertyData.nearbyPlaces || [],
          yearBuilt: propertyData.yearBuilt,
          contactPhone: propertyData.contactPhone || propertyData.ownerDetails?.phoneNumbers?.[0],
          contactEmail: propertyData.contactEmail || propertyData.ownerDetails?.email
        };

        console.log('Formatted property with images:', formattedProperty.images);
        
        if (formattedProperty.images.length === 0) {
          console.error('No valid images found after formatting!');
        }
        
        setProperty(formattedProperty);

        // Fetch similar properties
        if (propertyData.category && propertyData._id) {
          fetchSimilarProperties(propertyData.category, propertyData._id);
        }
      } catch (error) {
        console.error('Error fetching property:', error);
        setError(true);
        toast({
          title: "Error",
          description: "Failed to fetch property details",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    const fetchSimilarProperties = async (category, propertyId) => {
      try {
        // Fetch similar properties based on category
        const response = await api.get(`/properties/public?category=${category}`);

        // Filter out the current property and limit to 3
        const filtered = response.data
          .filter(p => p._id !== propertyId)
          .slice(0, 3)
          .map(property => ({
            id: property._id,
            title: property.title,
            location: property.location?.address || property.location,
            price: property.price,
            category: property.category,
            type: property.type,
            size: property.size?.area ? `${property.size.area} ${property.size.areaUnit || 'sq ft'}` : property.size,
            bedrooms: property.bedrooms,
            bathrooms: property.bathrooms,
            featured: property.featured,
            imageUrl: property.images?.[0]?.url || property.imageUrl
          }));

        setSimilarProperties(filtered);
      } catch (error) {
        console.error('Error fetching similar properties:', error);
        setSimilarProperties([]);
      }
    };

    if (id) {
      fetchProperty();
    } else {
      setError(true);
      setLoading(false);
    }
  }, [id, toast]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Property Not Found</h1>
            <p className="text-gray-600 mb-6">The property you are looking for doesn't exist or has been removed.</p>
            <Button onClick={() => window.location.href = '/properties'}>
              View All Properties
            </Button>
          </div>
        </main>
      </div>
    );
  }
  
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === property.images.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? property.images.length - 1 : prevIndex - 1
    );
  };
  
  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
  };
  
  // Format price with commas and dollar sign
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(property.price);
  
  // Simple appointment booking function with debugging
  const handleScheduleAppointment = async () => {
    // Validate form inputs
    if (!appointmentDate || !appointmentTime) {
      toast({
        title: "Error",
        description: "Please select date and time",
        variant: "destructive",
      });
      return;
    }
    
    // Check if user is authenticated before proceeding
    const authData = localStorage.getItem('golden_view_auth');
    if (!authData) {
      toast({
        title: "Login Required",
        description: "Please login to book an appointment",
        variant: "destructive",
      });
      // Redirect to login page with return URL
      window.location.href = `/login?redirect=/properties/${id}`;
      return;
    }
    
    // Show loading state
    setScheduling(true);
    
    try {
      // Convert time selection to specific time value
      let timeValue = "12:00";
      if (appointmentTime.includes("Morning")) {
        timeValue = "10:00";
      } else if (appointmentTime.includes("Afternoon")) {
        timeValue = "14:00";
      } else if (appointmentTime.includes("Evening")) {
        timeValue = "18:00";
      }
      
      // Simplified appointment object with just the essential fields
      const appointmentData = {
        property: id,
        appointmentDate: `${appointmentDate}T${timeValue}:00`,
        notes: `Viewing request for ${property.title}`
      };
      
      // Debug logging
      console.log('Trying to book appointment with data:', appointmentData);
      
      // Make the API call with the correct endpoint (no /api/ prefix)
      const response = await api.post('/appointments', appointmentData);
      console.log('Appointment booking success:', response.data);
      
      toast({
        title: "Success",
        description: "Viewing appointment booked",
        variant: "default",
      });
      
      // Reset form fields
      setAppointmentDate('');
      setAppointmentTime('');
    } catch (error) {
      console.error('Booking error:', error);
      console.error('Error details:', error.response?.data || error.message);
      
      toast({
        title: "Error", 
        description: "Could not book appointment. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setScheduling(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Property Image Gallery */}
        <section className="bg-black relative">
          <div className="relative h-[60vh] overflow-hidden">
            {property.images && property.images.length > 0 ? (
              <img 
                src={property.images[currentImageIndex]} 
                alt={property.title} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error('Image failed to load:', property.images[currentImageIndex]);
                  // Try a different image if available
                  if (property.images.length > 1 && currentImageIndex < property.images.length - 1) {
                    setCurrentImageIndex(prevIndex => prevIndex + 1);
                  } else {
                    // If no other images, use placeholder
                    (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Image+Not+Available';
                  }
                }}
              />
            ) : (
              // Fallback if no images array or empty array
              <img 
                src="https://placehold.co/600x400?text=No+Image" 
                alt="No image available" 
                className="w-full h-full object-cover"
              />
            )}
            
            {/* Image Navigation Buttons - Only show if multiple images */}
            {property.images && property.images.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                
                <button 
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
                
                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {property.images.length}
                </div>
              </>
            )}
          </div>
          
          {/* Thumbnail Navigation - Only show if multiple images */}
          {property.images && property.images.length > 1 && (
            <div className="container mx-auto px-4 py-4 flex space-x-2 overflow-x-auto">
              {property.images.map((image, index) => (
                <button 
                  key={index} 
                  onClick={() => selectImage(index)}
                  className={`w-20 h-20 flex-shrink-0 ${currentImageIndex === index ? 'border-2 border-secondary' : 'opacity-70'}`}
                >
                  <img 
                    src={image} 
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // If thumbnail fails to load, replace with placeholder
                      (e.target as HTMLImageElement).src = 'https://placehold.co/150x150?text=No+Image';
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </section>
        
        {/* Property Information */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row lg:items-start">
              {/* Main Content */}
              <div className="lg:w-2/3 lg:pr-8">
                <div className="mb-8">
                  <h1 className="text-3xl md:text-4xl font-bold mb-3">{property.title}</h1>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-5 w-5 mr-2 text-primary" />
                    <span>{property.location}</span>
                  </div>
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      {property.category}
                    </span>
                    <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm font-medium">
                      {property.type}
                    </span>
                    {property.tags?.map((tag, index) => (
                      <span 
                        key={index} 
                        className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <Tabs defaultValue="details" className="mb-8">
                  <TabsList className="mb-6 border-b w-full justify-start rounded-none">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="features">Features & Amenities</TabsTrigger>
                    <TabsTrigger value="legal">Legal Information</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="details" className="animate-slide-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold mb-4 flex items-center">
                          <Info className="h-5 w-5 mr-2 text-primary" />
                          Property Details
                        </h3>
                        <ul className="space-y-3">
                          <li className="flex justify-between">
                            <span className="text-gray-600">Property Type:</span>
                            <span className="font-medium">{property.type}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-600">Category:</span>
                            <span className="font-medium">{property.category}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-600">Size:</span>
                            <span className="font-medium">{property.size}</span>
                          </li>
                          {property.bedrooms && (
                            <li className="flex justify-between">
                              <span className="text-gray-600">Bedrooms:</span>
                              <span className="font-medium">{property.bedrooms}</span>
                            </li>
                          )}
                          {property.bathrooms && (
                            <li className="flex justify-between">
                              <span className="text-gray-600">Bathrooms:</span>
                              <span className="font-medium">{property.bathrooms}</span>
                            </li>
                          )}
                          <li className="flex justify-between">
                            <span className="text-gray-600">Listed Date:</span>
                            <span className="font-medium">{new Date(property.createdAt).toLocaleDateString()}</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold mb-4 flex items-center">
                          <Building className="h-5 w-5 mr-2 text-primary" />
                          Property Classification
                        </h3>
                        <ul className="space-y-3">
                          <li className="flex justify-between">
                            <span className="text-gray-600">Land Classification:</span>
                            <span className="font-medium">Residential</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-600">Zone Type:</span>
                            <span className="font-medium">R-Zone</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-600">Permit Status:</span>
                            <span className="font-medium">
                              <span className="inline-flex items-center text-green-600">
                                <Check className="h-4 w-4 mr-1" /> Approved
                              </span>
                            </span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-600">Development Status:</span>
                            <span className="font-medium">Complete</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-600">Year Built:</span>
                            <span className="font-medium">2019</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
                      <h3 className="text-lg font-bold mb-4">Description</h3>
                      <p className="text-gray-700 mb-4">
                        Welcome to this exceptional {property.category ? property.category.toLowerCase() : ''} property located in the heart of {property.location}. This stunning {property.type ? property.type.toLowerCase() : ''} offers an impressive {property.size} of living space designed for modern convenience and elegant living.
                      </p>
                      <p className="text-gray-700 mb-4">
                        The property features premium finishes throughout, including hardwood floors, high ceilings, and expansive windows that flood the interior with natural light. The open layout creates a perfect flow for entertaining while maintaining intimate spaces for day-to-day living.
                      </p>
                      <p className="text-gray-700">
                        Ideally positioned for easy access to local amenities, schools, parks, and transportation, this property represents an exceptional opportunity for homeowners looking for comfort and convenience in one of the most sought-after neighborhoods.
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="features" className="animate-slide-in">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
                      <h3 className="text-lg font-bold mb-4">Features & Amenities</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-primary mb-3">Interior Features</h4>
                          <ul className="space-y-2">
                            <li className="flex items-center">
                              <Check className="h-4 w-4 text-secondary mr-2" />
                              <span>Central Air Conditioning</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="h-4 w-4 text-secondary mr-2" />
                              <span>Heating System</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="h-4 w-4 text-secondary mr-2" />
                              <span>Modern Kitchen</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="h-4 w-4 text-secondary mr-2" />
                              <span>High-End Appliances</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="h-4 w-4 text-secondary mr-2" />
                              <span>Walk-in Closets</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="h-4 w-4 text-secondary mr-2" />
                              <span>Marble Flooring</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-primary mb-3">Exterior Features</h4>
                          <ul className="space-y-2">
                            <li className="flex items-center">
                              <Check className="h-4 w-4 text-secondary mr-2" />
                              <span>Swimming Pool</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="h-4 w-4 text-secondary mr-2" />
                              <span>Garden/Landscape</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="h-4 w-4 text-secondary mr-2" />
                              <span>Garage Parking</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="h-4 w-4 text-secondary mr-2" />
                              <span>Security System</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="h-4 w-4 text-secondary mr-2" />
                              <span>Outdoor Kitchen</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="h-4 w-4 text-secondary mr-2" />
                              <span>Private Terrace</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                      <h3 className="text-lg font-bold mb-4">Community & Surrounding</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-primary mb-3">Nearby Facilities</h4>
                          <ul className="space-y-2">
                            <li className="flex items-center">
                              <Check className="h-4 w-4 text-secondary mr-2" />
                              <span>Schools & Universities</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="h-4 w-4 text-secondary mr-2" />
                              <span>Shopping Centers</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="h-4 w-4 text-secondary mr-2" />
                              <span>Restaurants & Cafes</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="h-4 w-4 text-secondary mr-2" />
                              <span>Public Transportation</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="h-4 w-4 text-secondary mr-2" />
                              <span>Medical Facilities</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-primary mb-3">Community Amenities</h4>
                          <ul className="space-y-2">
                            <li className="flex items-center">
                              <Check className="h-4 w-4 text-secondary mr-2" />
                              <span>Community Pool</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="h-4 w-4 text-secondary mr-2" />
                              <span>Fitness Center</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="h-4 w-4 text-secondary mr-2" />
                              <span>Playground</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="h-4 w-4 text-secondary mr-2" />
                              <span>Tennis Courts</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="h-4 w-4 text-secondary mr-2" />
                              <span>24/7 Security</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="legal" className="animate-slide-in">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
                      <h3 className="text-lg font-bold mb-4 flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-primary" />
                        Legal Documents & Status
                      </h3>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium text-primary mb-3">Ownership Details</h4>
                          <ul className="space-y-3">
                            <li className="flex justify-between">
                              <span className="text-gray-600">Ownership Type:</span>
                              <span className="font-medium">Freehold</span>
                            </li>
                            <li className="flex justify-between">
                              <span className="text-gray-600">Title Status:</span>
                              <span className="font-medium text-green-600 flex items-center">
                                <Check className="h-4 w-4 mr-1" /> Clear Title
                              </span>
                            </li>
                            <li className="flex justify-between">
                              <span className="text-gray-600">Legal Proceedings:</span>
                              <span className="font-medium">None</span>
                            </li>
                            <li className="flex justify-between">
                              <span className="text-gray-600">Registration Status:</span>
                              <span className="font-medium">Registered</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div className="pt-4 border-t border-gray-100">
                          <h4 className="font-medium text-primary mb-3">Documents Available</h4>
                          <ul className="space-y-2">
                            <li className="flex items-center">
                              <Check className="h-4 w-4 text-secondary mr-2" />
                              <span>Title Deed</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="h-4 w-4 text-secondary mr-2" />
                              <span>Property Tax Records</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="h-4 w-4 text-secondary mr-2" />
                              <span>Building Permits</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="h-4 w-4 text-secondary mr-2" />
                              <span>Occupancy Certificate</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="h-4 w-4 text-secondary mr-2" />
                              <span>Land Survey Documents</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div className="pt-4 border-t border-gray-100">
                          <h4 className="font-medium text-primary mb-3">Legal Declaration</h4>
                          <div className="bg-gray-50 p-4 rounded-md">
                            <div className="flex items-start mb-4">
                              <CheckSquare className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                              <p className="text-sm text-gray-700">
                                All information provided about this property is accurate and truthful to the best of our knowledge. Potential buyers are encouraged to conduct their own due diligence and property inspection before making a purchase decision.
                              </p>
                            </div>
                            <div className="flex items-center">
                              <input type="checkbox" id="declaration" className="mr-2" />
                              <label htmlFor="declaration" className="text-sm text-gray-700">
                                I understand that all provided information is subject to verification and legal confirmation.
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              {/* Sidebar */}
              <div className="lg:w-1/3 mt-8 lg:mt-0">
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 sticky top-20">
                  <div className="mb-6 text-center">
                    <span className="text-3xl font-bold text-primary">{formattedPrice}</span>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Contact Agent Form */}
                    <div>
                      <h3 className="text-lg font-bold mb-4">Contact Agent</h3>
                      <div className="flex items-center mb-6">
                        <img 
                          src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" 
                          alt="Agent" 
                          className="w-16 h-16 rounded-full object-cover mr-4"
                        />
                        <div>
                          <h4 className="font-bold">David Thompson</h4>
                          <p className="text-gray-600 text-sm">Senior Property Consultant</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                          <input 
                            type="text" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                            placeholder="Enter your name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                          <input 
                            type="email" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                            placeholder="Enter your email"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Your Phone</label>
                          <input 
                            type="tel" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                            placeholder="Enter your phone number"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                          <textarea 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                            rows={4}
                            placeholder="I'm interested in this property and would like more information."
                          ></textarea>
                        </div>
                        <Button className="w-full bg-primary hover:bg-primary-hover">
                          <Phone className="mr-2 h-4 w-4" />
                          Contact Agent
                        </Button>
                      </div>
                    </div>
                    
                    {/* Book Appointment */}
                    <div className="pt-6 border-t border-gray-200">
                      <h3 className="text-lg font-bold mb-4">Book a Viewing</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                          <input 
                            type="date" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                            value={appointmentDate}
                            onChange={(e) => setAppointmentDate(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
                          <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                            value={appointmentTime}
                            onChange={(e) => setAppointmentTime(e.target.value)}
                          >
                            <option value="">Select a time</option>
                            <option value="Morning (9AM - 12PM)">Morning (9AM - 12PM)</option>
                            <option value="Afternoon (12PM - 4PM)">Afternoon (12PM - 4PM)</option>
                            <option value="Evening (4PM - 7PM)">Evening (4PM - 7PM)</option>
                          </select>
                        </div>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={handleScheduleAppointment}
                          disabled={scheduling || !appointmentDate || !appointmentTime}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {scheduling ? 'Scheduling...' : 'Schedule Appointment'}
                        </Button>
                      </div>
                    </div>
                    
                    {/* Direct Contact */}
                    <div className="pt-6 border-t border-gray-200">
                      <h3 className="text-lg font-bold mb-4">Quick Contact</h3>
                      <div className="space-y-3">
                        <a href="tel:+15551234567" className="flex items-center text-primary hover:underline">
                          <Phone className="h-5 w-5 mr-2" />
                          <span>+1 (555) 123-4567</span>
                        </a>
                        <a href="mailto:info@goldenviewrealty.com" className="flex items-center text-primary hover:underline">
                          <Mail className="h-5 w-5 mr-2" />
                          <span>info@goldenviewrealty.com</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Similar Properties */}
        {similarProperties.length > 0 && (
          <section className="py-16 bg-bgLight">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold mb-8">Similar Properties</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {similarProperties.map(p => (
                  <PropertyCard key={p.id} {...p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default PropertyDetail;

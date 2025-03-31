import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { mockProperties } from '@/data/mockData';
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

const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Find the property based on ID
  const property = mockProperties.find(p => p.id === Number(id));
  
  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Property Not Found</h1>
            <p className="text-gray-600 mb-6">The property you are looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <a href="/properties">View All Properties</a>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Mock multiple images for the property
  const propertyImages = [
    property.imageUrl,
    "https://images.unsplash.com/photo-1560185007-5f0bb1866cab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1560185008-b033106af5c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  ];
  
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === propertyImages.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? propertyImages.length - 1 : prevIndex - 1
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
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Property Image Gallery */}
        <section className="bg-black relative">
          <div className="relative h-[60vh] overflow-hidden">
            <img 
              src={propertyImages[currentImageIndex]} 
              alt={property.title} 
              className="w-full h-full object-cover"
            />
            
            {/* Image Navigation Buttons */}
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
              {currentImageIndex + 1} / {propertyImages.length}
            </div>
          </div>
          
          {/* Thumbnail Navigation */}
          <div className="container mx-auto px-4 py-4 flex space-x-2 overflow-x-auto">
            {propertyImages.map((image, index) => (
              <button 
                key={index} 
                onClick={() => selectImage(index)}
                className={`w-20 h-20 flex-shrink-0 ${currentImageIndex === index ? 'border-2 border-secondary' : 'opacity-70'}`}
              >
                <img 
                  src={image} 
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
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
                        Welcome to this exceptional {property.category.toLowerCase()} property located in the heart of {property.location}. This stunning {property.type.toLowerCase()} offers an impressive {property.size} of living space designed for modern convenience and elegant living.
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
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary">
                            <option>Morning (9AM - 12PM)</option>
                            <option>Afternoon (12PM - 4PM)</option>
                            <option>Evening (4PM - 7PM)</option>
                          </select>
                        </div>
                        <Button variant="outline" className="w-full">
                          <Calendar className="mr-2 h-4 w-4" />
                          Schedule Appointment
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
        <section className="py-16 bg-bgLight">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Similar Properties You May Like</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {mockProperties.slice(0, 3).map(p => (
                <PropertyCard key={p.id} {...p} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PropertyDetail;

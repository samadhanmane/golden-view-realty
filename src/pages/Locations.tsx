import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Building, Home, ArrowRight } from 'lucide-react';

interface Location {
  id: number;
  name: string;
  city: string;
  state: string;
  image: string;
  propertiesCount: number;
  description: string;
}

const locations: Location[] = [
  {
    id: 1,
    name: "Downtown Metropolis",
    city: "Metropolis",
    state: "CA",
    image: "https://images.unsplash.com/photo-1582767629562-0adc3b5c617b?auto=format&fit=crop&q=80&w=1000",
    propertiesCount: 45,
    description: "The heart of the city with luxury condos, shopping, and entertainment within walking distance."
  },
  {
    id: 2,
    name: "Riverside Heights",
    city: "Riverside",
    state: "CA",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=1000",
    propertiesCount: 32,
    description: "Scenic views with modern homes and excellent schools in a peaceful community."
  },
  {
    id: 3,
    name: "Oakwood Estates",
    city: "Oakwood",
    state: "CA",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=1000",
    propertiesCount: 28,
    description: "Luxurious suburban living with spacious properties and extensive green spaces."
  },
  {
    id: 4,
    name: "Pine Valley",
    city: "Pine Valley",
    state: "CA",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1000",
    propertiesCount: 19,
    description: "Mountain views and premium properties with a close-knit community feel."
  },
  {
    id: 5,
    name: "Sunset Beach",
    city: "Sunset",
    state: "CA",
    image: "https://images.unsplash.com/photo-1527030280862-64139fba04ca?auto=format&fit=crop&q=80&w=1000",
    propertiesCount: 36,
    description: "Beachfront properties with stunning ocean views and vibrant community life."
  },
  {
    id: 6,
    name: "Green Meadows",
    city: "Greenfield",
    state: "CA",
    image: "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?auto=format&fit=crop&q=80&w=1000",
    propertiesCount: 22,
    description: "Eco-friendly community with sustainable homes and extensive natural preserves."
  },
  {
    id: 7,
    name: "Pune Tech Hub",
    city: "Pune",
    state: "Maharashtra",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
    propertiesCount: 29,
    description: "Modern tech district with premium residential complexes and IT parks in a culturally rich setting."
  },
  {
    id: 8,
    name: "Hyderabad Cyber City",
    city: "Hyderabad",
    state: "Telangana",
    image: "https://images.unsplash.com/photo-1466442929976-97f336a657be",
    propertiesCount: 34,
    description: "Rising tech metropolis with luxury apartments and commercial spaces near HITEC City."
  }
];

const Locations: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary text-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Our Locations</h1>
              <p className="text-xl max-w-2xl mx-auto">
                Discover prime real estate opportunities across our featured locations
              </p>
            </div>
          </div>
        </section>
        
        {/* Locations Map */}
        <section className="py-12 bg-bgLight">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gray-200 h-[400px] w-full">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d387193.30599542466!2d-74.25986771959991!3d40.69714941680757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1697605387321!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="p-5 flex justify-center flex-wrap gap-3">
                {locations.map(location => (
                  <Button key={location.id} variant="outline" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> {location.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Locations */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Locations</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {locations.map((location) => (
                <Card key={location.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={location.image} 
                      alt={location.name}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <CardContent className="p-5">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-xl font-bold">{location.name}</h3>
                      <span className="text-sm bg-primary/10 text-primary py-1 px-2 rounded-full font-medium">
                        {location.propertiesCount} Properties
                      </span>
                    </div>
                    <div className="text-gray-500 mb-4 flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {location.city}, {location.state}
                    </div>
                    <p className="text-gray-600 mb-4">{location.description}</p>
                    <Button variant="outline" className="w-full flex items-center justify-center">
                      View Properties <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Statistics */}
        <section className="py-12 bg-bgLight">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <Building className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="text-3xl font-bold mb-2">150+</h3>
                <p className="text-gray-600">Active Listings</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <MapPin className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="text-3xl font-bold mb-2">12</h3>
                <p className="text-gray-600">Cities Covered</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <Home className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="text-3xl font-bold mb-2">1,200+</h3>
                <p className="text-gray-600">Properties Sold</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <Building className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="text-3xl font-bold mb-2">85%</h3>
                <p className="text-gray-600">Client Satisfaction</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Can't Find Your Ideal Location?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Our real estate experts can help you find the perfect property in your desired area
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="secondary" className="font-semibold">
                Contact an Agent
              </Button>
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-primary">
                Browse All Properties
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Locations;

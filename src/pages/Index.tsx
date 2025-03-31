
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import FeaturedProperties from '@/components/FeaturedProperties';
import WhyChooseUs from '@/components/WhyChooseUs';
import TestimonialSection from '@/components/TestimonialSection';
import { featuredProperties } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Building, MapPin } from 'lucide-react';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        
        <FeaturedProperties
          title="Featured Properties"
          description="Explore our handpicked selection of premium properties available for sale and investment."
          properties={featuredProperties}
        />
        
        {/* Property Categories Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Property Categories</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Find the perfect property that meets your specific needs, whether for living, business, or investment.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Residential */}
              <div className="relative overflow-hidden rounded-lg group h-64">
                <img 
                  src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                  alt="Residential Properties" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white text-xl font-bold mb-2">Residential Properties</h3>
                  <p className="text-white/80 mb-4">Find your perfect home with our selection of houses, apartments, and villas</p>
                  <Button variant="secondary" size="sm">
                    View Residential
                  </Button>
                </div>
              </div>
              
              {/* Commercial */}
              <div className="relative overflow-hidden rounded-lg group h-64">
                <img 
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                  alt="Commercial Properties" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white text-xl font-bold mb-2">Commercial Properties</h3>
                  <p className="text-white/80 mb-4">Office spaces, retail locations, and commercial buildings for your business</p>
                  <Button variant="secondary" size="sm">
                    View Commercial
                  </Button>
                </div>
              </div>
              
              {/* Land */}
              <div className="relative overflow-hidden rounded-lg group h-64">
                <img 
                  src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                  alt="Land Properties" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white text-xl font-bold mb-2">Land & Plots</h3>
                  <p className="text-white/80 mb-4">Agricultural, residential, and industrial plots for development</p>
                  <Button variant="secondary" size="sm">
                    View Land
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Locations */}
        <section className="py-16 bg-bgLight">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Locations</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our properties in these prime locations across the country.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {['New York', 'Los Angeles', 'Chicago', 'Miami', 'San Francisco'].map((city, index) => (
                <div key={index} className="relative rounded-lg overflow-hidden group shadow-md">
                  <img 
                    src={`https://source.unsplash.com/featured/?${city.toLowerCase().replace(' ', '')},city`}
                    alt={city}
                    className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-center">
                      <h3 className="text-white font-bold">{city}</h3>
                      <div className="flex items-center justify-center mt-2">
                        <MapPin className="h-4 w-4 text-secondary mr-1" />
                        <span className="text-white text-sm">View Properties</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-2 text-center">
                    <h3 className="font-medium text-textColor">{city}</h3>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Button variant="outline">
                <Building className="mr-2 h-5 w-5" />
                View All Locations
              </Button>
            </div>
          </div>
        </section>
        
        <WhyChooseUs />
        <TestimonialSection />
        
        {/* Call to Action */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Find Your Perfect Property?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Contact our team of experts today and take the first step toward your next property investment.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
              <Button variant="secondary" size="lg">
                Browse Properties
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                Contact Us
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;

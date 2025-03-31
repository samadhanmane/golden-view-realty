
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import PropertyGrid from '@/components/PropertyGrid';
import PropertyAdvancedFilters, { FilterOptions } from '@/components/PropertyAdvancedFilters';
import { mockProperties } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  Building, 
  MapPin, 
  Home,
  Check
} from 'lucide-react';

const Properties: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProperties, setFilteredProperties] = useState(mockProperties);
  
  // Filter state
  const [filters, setFilters] = useState<FilterOptions>({
    type: [],
    category: [],
    priceRange: [0, 5000000],
    location: [],
    bedrooms: '',
    size: '',
    zoneType: [],
    naStatus: null
  });

  const applyFilters = () => {
    // Filter the properties based on the selected filters
    let filtered = [...mockProperties];
    
    // Filter by type
    if (filters.type.length > 0) {
      filtered = filtered.filter(property => filters.type.includes(property.type.toLowerCase()));
    }
    
    // Filter by category
    if (filters.category.length > 0) {
      filtered = filtered.filter(property => filters.category.includes(property.category.toLowerCase()));
    }
    
    // Filter by price range
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 5000000) {
      filtered = filtered.filter(property => 
        property.price >= filters.priceRange[0] && property.price <= filters.priceRange[1]
      );
    }
    
    // Filter by location
    if (filters.location.length > 0) {
      filtered = filtered.filter(property => 
        filters.location.some(loc => property.location.includes(loc))
      );
    }
    
    // In a real implementation, we would also filter by zoneType and naStatus
    // For this demo, we'll just use the mock data
    
    setFilteredProperties(filtered);
  };

  const resetFilters = () => {
    setFilters({
      type: [],
      category: [],
      priceRange: [0, 5000000],
      location: [],
      bedrooms: '',
      size: '',
      zoneType: [],
      naStatus: null
    });
    setFilteredProperties(mockProperties);
  };
  
  // Apply filters when filters change
  useEffect(() => {
    applyFilters();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div 
          className="relative bg-cover bg-center h-[50vh]" 
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)' }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Next Property</h1>
              <p className="text-xl mb-6 max-w-xl mx-auto">
                Browse through our extensive catalog of premium properties
              </p>
            </div>
          </div>
        </div>
        
        {/* Filters Section */}
        <div className="py-8 bg-bgLight">
          <div className="container mx-auto px-4">
            <PropertyAdvancedFilters 
              filters={filters}
              setFilters={setFilters}
              applyFilters={applyFilters}
              resetFilters={resetFilters}
              showFilters={showFilters}
              setShowFilters={setShowFilters}
            />
          </div>
        </div>
        
        {/* Properties Grid */}
        <section className="py-12 bg-bgLight">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">{filteredProperties.length} Properties Found</h2>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">Sort by:</span>
                <select className="border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary">
                  <option>Latest</option>
                  <option>Price (Low to High)</option>
                  <option>Price (High to Low)</option>
                  <option>Most Popular</option>
                </select>
              </div>
            </div>
            
            <PropertyGrid properties={filteredProperties} />
            
            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <nav className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm" className="bg-primary text-white">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <span className="px-2">...</span>
                <Button variant="outline" size="sm">10</Button>
                <Button variant="outline" size="sm">Next</Button>
              </nav>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Can't Find What You're Looking For?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Let us help you find the perfect property. Fill out our property request form and our experts will get in touch with you.
            </p>
            <Button className="bg-secondary hover:bg-secondary-hover">
              Submit Property Request
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Properties;

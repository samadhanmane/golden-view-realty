
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
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
  const [filters, setFilters] = useState({
    type: '',
    category: '',
    priceRange: '',
    location: '',
    bedrooms: '',
    size: ''
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const applyFilters = () => {
    // This would normally filter based on the actual filters
    // For demo purposes, we're just using the mockProperties
    setFilteredProperties(mockProperties);
  };

  const resetFilters = () => {
    setFilters({
      type: '',
      category: '',
      priceRange: '',
      location: '',
      bedrooms: '',
      size: ''
    });
    setFilteredProperties(mockProperties);
  };

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
              <div className="flex justify-center">
                <Button 
                  className="bg-secondary hover:bg-secondary-hover"
                  onClick={() => setShowFilters(prev => !prev)}
                >
                  <Filter className="mr-2 h-5 w-5" />
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Filters Section */}
        <div className={`bg-white shadow-md border-b ${showFilters ? 'py-8' : 'py-0 h-0 overflow-hidden'} transition-all duration-300`}>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              <div>
                <label className="block text-sm font-medium text-textColor mb-2">Property Type</label>
                <select 
                  name="type"
                  value={filters.type}
                  onChange={handleFilterChange}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary"
                >
                  <option value="">Any Type</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="condo">Condo</option>
                  <option value="land">Land</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-textColor mb-2">Category</label>
                <select 
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary"
                >
                  <option value="">Any Category</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                  <option value="agricultural">Agricultural</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-textColor mb-2">Price Range</label>
                <select 
                  name="priceRange"
                  value={filters.priceRange}
                  onChange={handleFilterChange}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary"
                >
                  <option value="">Any Price</option>
                  <option value="0-100000">Under $100,000</option>
                  <option value="100000-500000">$100,000 - $500,000</option>
                  <option value="500000-1000000">$500,000 - $1,000,000</option>
                  <option value="1000000-5000000">$1,000,000 - $5,000,000</option>
                  <option value="5000000+">Over $5,000,000</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-textColor mb-2">Location</label>
                <select 
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary"
                >
                  <option value="">Any Location</option>
                  <option value="new-york">New York</option>
                  <option value="los-angeles">Los Angeles</option>
                  <option value="chicago">Chicago</option>
                  <option value="miami">Miami</option>
                  <option value="san-francisco">San Francisco</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-textColor mb-2">Bedrooms</label>
                <select 
                  name="bedrooms"
                  value={filters.bedrooms}
                  onChange={handleFilterChange}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary"
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-textColor mb-2">Size</label>
                <select 
                  name="size"
                  value={filters.size}
                  onChange={handleFilterChange}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary"
                >
                  <option value="">Any Size</option>
                  <option value="0-1000">Under 1,000 sq ft</option>
                  <option value="1000-2000">1,000 - 2,000 sq ft</option>
                  <option value="2000-3000">2,000 - 3,000 sq ft</option>
                  <option value="3000-5000">3,000 - 5,000 sq ft</option>
                  <option value="5000+">Over 5,000 sq ft</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end mt-6 space-x-4">
              <Button variant="outline" onClick={resetFilters}>Reset Filters</Button>
              <Button className="bg-primary hover:bg-primary-hover" onClick={applyFilters}>
                <Search className="mr-2 h-4 w-4" />
                Apply Filters
              </Button>
            </div>
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map(property => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
            
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


import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection: React.FC = () => {
  return (
    <div className="relative bg-cover bg-center h-[90vh] flex items-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)' }}>
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="container mx-auto px-4 z-10 text-white">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Find Your Perfect Property
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Discover premium properties in the most sought-after locations with Golden View Realty. 
            From luxury homes to investment opportunities, we have what you're searching for.
          </p>
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">Property Type</label>
                <select className="w-full bg-white text-textColor rounded-md px-4 py-2 focus:ring-primary focus:border-primary">
                  <option value="">All Types</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                  <option value="land">Land</option>
                  <option value="agricultural">Agricultural</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <select className="w-full bg-white text-textColor rounded-md px-4 py-2 focus:ring-primary focus:border-primary">
                  <option value="">Any Location</option>
                  <option value="new-york">New York</option>
                  <option value="los-angeles">Los Angeles</option>
                  <option value="chicago">Chicago</option>
                  <option value="miami">Miami</option>
                  <option value="san-francisco">San Francisco</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Price Range</label>
                <select className="w-full bg-white text-textColor rounded-md px-4 py-2 focus:ring-primary focus:border-primary">
                  <option value="">Any Price</option>
                  <option value="0-100000">Under $100,000</option>
                  <option value="100000-300000">$100,000 - $300,000</option>
                  <option value="300000-500000">$300,000 - $500,000</option>
                  <option value="500000-1000000">$500,000 - $1,000,000</option>
                  <option value="1000000+">Over $1,000,000</option>
                </select>
              </div>
            </div>
            <Button className="w-full bg-secondary hover:bg-secondary-hover flex items-center justify-center">
              <Search className="mr-2 h-5 w-5" />
              Search Properties
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

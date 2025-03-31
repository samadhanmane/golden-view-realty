
import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Filter, Search, Check, RefreshCw } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

export interface FilterOptions {
  type: string[];
  category: string[];
  priceRange: number[];
  location: string[];
  bedrooms: string;
  size: string;
  zoneType: string[];
  naStatus: boolean | null;
}

interface PropertyAdvancedFiltersProps {
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
  applyFilters: () => void;
  resetFilters: () => void;
  showFilters: boolean;
  setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
}

const locations = [
  'New York', 'Los Angeles', 'Chicago', 'Miami', 'San Francisco',
  'Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Hyderabad', 'Chennai',
  'Kolkata', 'Ahmedabad', 'Surat', 'Jaipur'
];

const propertyTypes = [
  { id: 'house', label: 'House' },
  { id: 'apartment', label: 'Apartment' },
  { id: 'villa', label: 'Villa' },
  { id: 'condo', label: 'Condo' },
  { id: 'land', label: 'Land' },
  { id: 'plot', label: 'Plot' },
  { id: 'agricultural', label: 'Agricultural Land' },
];

const categories = [
  { id: 'residential', label: 'Residential' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'industrial', label: 'Industrial' },
  { id: 'agricultural', label: 'Agricultural' },
];

const zoneTypes = [
  { id: 'green-zone', label: 'Green Zone' },
  { id: 'red-zone', label: 'Red Zone (R-Zone)' },
  { id: 'industrial-zone', label: 'Industrial Zone' },
  { id: 'commercial-zone', label: 'Commercial Zone' },
  { id: 'agriculture-zone', label: 'Agriculture Zone' },
];

const PropertyAdvancedFilters: React.FC<PropertyAdvancedFiltersProps> = ({
  filters,
  setFilters,
  applyFilters,
  resetFilters,
  showFilters,
  setShowFilters
}) => {
  const handleTypeChange = (type: string) => {
    setFilters(prev => {
      if (prev.type.includes(type)) {
        return { ...prev, type: prev.type.filter(t => t !== type) };
      } else {
        return { ...prev, type: [...prev.type, type] };
      }
    });
  };

  const handleCategoryChange = (category: string) => {
    setFilters(prev => {
      if (prev.category.includes(category)) {
        return { ...prev, category: prev.category.filter(c => c !== category) };
      } else {
        return { ...prev, category: [...prev.category, category] };
      }
    });
  };
  
  const handleZoneTypeChange = (zone: string) => {
    setFilters(prev => {
      if (prev.zoneType.includes(zone)) {
        return { ...prev, zoneType: prev.zoneType.filter(z => z !== zone) };
      } else {
        return { ...prev, zoneType: [...prev.zoneType, zone] };
      }
    });
  };

  const handleLocationChange = (location: string) => {
    setFilters(prev => {
      if (prev.location.includes(location)) {
        return { ...prev, location: prev.location.filter(l => l !== location) };
      } else {
        return { ...prev, location: [...prev.location, location] };
      }
    });
  };

  const handlePriceChange = (value: number[]) => {
    setFilters(prev => ({ ...prev, priceRange: value }));
  };

  const handleNAStatusChange = (value: boolean | null) => {
    setFilters(prev => ({ ...prev, naStatus: value }));
  };

  const activeFilterCount = 
    (filters.type.length > 0 ? 1 : 0) +
    (filters.category.length > 0 ? 1 : 0) +
    (filters.location.length > 0 ? 1 : 0) +
    (filters.zoneType.length > 0 ? 1 : 0) +
    (filters.naStatus !== null ? 1 : 0) +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 5000000 ? 1 : 0);

  return (
    <div>
      <div className="flex justify-center">
        <Button 
          variant="outline"
          className="border-primary/30 hover:bg-primary/10"
          onClick={() => setShowFilters(prev => !prev)}
        >
          <Filter className="mr-2 h-5 w-5" />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>
      
      <div className={`bg-white shadow-md border-b ${showFilters ? 'py-8 opacity-100' : 'py-0 h-0 opacity-0 overflow-hidden'} transition-all duration-300`}>
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h3 className="font-medium text-lg mb-3 text-primary">Active Filters:</h3>
            <div className="flex flex-wrap gap-2 items-center">
              {activeFilterCount === 0 ? (
                <span className="text-gray-400 text-sm">No active filters</span>
              ) : (
                <>
                  {filters.type.length > 0 && (
                    <Badge variant="outline" className="bg-primary/10 hover:bg-primary/20">
                      Property Types: {filters.type.length}
                    </Badge>
                  )}
                  {filters.category.length > 0 && (
                    <Badge variant="outline" className="bg-primary/10 hover:bg-primary/20">
                      Categories: {filters.category.length}
                    </Badge>
                  )}
                  {filters.location.length > 0 && (
                    <Badge variant="outline" className="bg-primary/10 hover:bg-primary/20">
                      Locations: {filters.location.length}
                    </Badge>
                  )}
                  {filters.zoneType.length > 0 && (
                    <Badge variant="outline" className="bg-primary/10 hover:bg-primary/20">
                      Zone Types: {filters.zoneType.length}
                    </Badge>
                  )}
                  {filters.naStatus !== null && (
                    <Badge variant="outline" className="bg-primary/10 hover:bg-primary/20">
                      NA Status: {filters.naStatus ? 'NA Plot' : 'Non-NA Plot'}
                    </Badge>
                  )}
                  {(filters.priceRange[0] > 0 || filters.priceRange[1] < 5000000) && (
                    <Badge variant="outline" className="bg-primary/10 hover:bg-primary/20">
                      Price Range: ${filters.priceRange[0].toLocaleString()} - ${filters.priceRange[1].toLocaleString()}
                    </Badge>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Property Type */}
            <div className="bg-white p-4 rounded-lg border border-gray-100">
              <h3 className="font-semibold mb-3">Property Type</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {propertyTypes.map(type => (
                  <div key={type.id} className="flex items-center">
                    <Checkbox
                      id={`type-${type.id}`}
                      checked={filters.type.includes(type.id)}
                      onCheckedChange={() => handleTypeChange(type.id)}
                      className="mr-2"
                    />
                    <Label htmlFor={`type-${type.id}`} className="cursor-pointer">{type.label}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Category */}
            <div className="bg-white p-4 rounded-lg border border-gray-100">
              <h3 className="font-semibold mb-3">Category</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <div key={category.id} className="flex items-center">
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={filters.category.includes(category.id)}
                      onCheckedChange={() => handleCategoryChange(category.id)}
                      className="mr-2"
                    />
                    <Label htmlFor={`category-${category.id}`} className="cursor-pointer">{category.label}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Price Range */}
            <div className="bg-white p-4 rounded-lg border border-gray-100">
              <h3 className="font-semibold mb-3">Price Range</h3>
              <div className="px-2">
                <Slider 
                  value={filters.priceRange} 
                  min={0}
                  max={5000000}
                  step={10000}
                  onValueChange={handlePriceChange}
                  className="mb-6"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>${filters.priceRange[0].toLocaleString()}</span>
                  <span>${filters.priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            {/* Location */}
            <div className="bg-white p-4 rounded-lg border border-gray-100">
              <h3 className="font-semibold mb-3">Location</h3>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    {filters.location.length > 0 ? `${filters.location.length} selected` : "Select locations"}
                    <Check className={`ml-2 h-4 w-4 ${filters.location.length > 0 ? 'opacity-100' : 'opacity-0'}`} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <ScrollArea className="h-[200px]">
                    <div className="p-3 space-y-2">
                      {locations.map(location => (
                        <div key={location} className="flex items-center">
                          <Checkbox
                            id={`location-${location}`}
                            checked={filters.location.includes(location)}
                            onCheckedChange={() => handleLocationChange(location)}
                            className="mr-2"
                          />
                          <Label htmlFor={`location-${location}`} className="cursor-pointer">{location}</Label>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </PopoverContent>
              </Popover>
            </div>
            
            {/* Zone Type */}
            <div className="bg-white p-4 rounded-lg border border-gray-100">
              <h3 className="font-semibold mb-3">Zone Type</h3>
              <div className="space-y-2">
                {zoneTypes.map(zone => (
                  <div key={zone.id} className="flex items-center">
                    <Checkbox
                      id={`zone-${zone.id}`}
                      checked={filters.zoneType.includes(zone.id)}
                      onCheckedChange={() => handleZoneTypeChange(zone.id)}
                      className="mr-2"
                    />
                    <Label htmlFor={`zone-${zone.id}`} className="cursor-pointer">{zone.label}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* NA Status */}
            <div className="bg-white p-4 rounded-lg border border-gray-100">
              <h3 className="font-semibold mb-3">NA Status</h3>
              <p className="text-sm text-gray-500 mb-3">
                NA (Non-Agricultural) status determines if a property is eligible for housing loan.
              </p>
              <div className="flex gap-3">
                <Button 
                  variant={filters.naStatus === true ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleNAStatusChange(filters.naStatus === true ? null : true)}
                  className={filters.naStatus === true ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  NA Plot
                </Button>
                <Button 
                  variant={filters.naStatus === false ? "default" : "outline"}
                  size="sm" 
                  onClick={() => handleNAStatusChange(filters.naStatus === false ? null : false)}
                  className={filters.naStatus === false ? "bg-amber-600 hover:bg-amber-700" : ""}
                >
                  Non-NA Plot
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-6 space-x-4">
            <Button variant="outline" onClick={resetFilters}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset Filters
            </Button>
            <Button className="bg-primary hover:bg-primary-hover" onClick={applyFilters}>
              <Search className="mr-2 h-4 w-4" />
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyAdvancedFilters;

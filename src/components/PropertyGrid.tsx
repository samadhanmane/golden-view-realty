
import React from 'react';
import PropertyCard, { PropertyCardProps } from './PropertyCard';
import { motion } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';

interface PropertyGridProps {
  properties: PropertyCardProps[];
  className?: string;
  showFiltered?: boolean;
}

const PropertyGrid: React.FC<PropertyGridProps> = ({ 
  properties, 
  className = "",
  showFiltered = true
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`}>
      {properties.length > 0 ? (
        properties.map((property, index) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <PropertyCard {...property} />
          </motion.div>
        ))
      ) : (
        <div className="col-span-3 py-20 text-center">
          <h3 className="text-2xl font-semibold text-gray-500">No properties found matching your criteria</h3>
          <p className="mt-3 text-gray-400">Try adjusting your filters or search terms</p>
        </div>
      )}
    </div>
  );
};

export default PropertyGrid;

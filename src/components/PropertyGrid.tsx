
import React from 'react';
import PropertyCard, { PropertyCardProps } from './PropertyCard';
import { motion } from 'framer-motion';

interface PropertyGridProps {
  properties: PropertyCardProps[];
}

const PropertyGrid: React.FC<PropertyGridProps> = ({ properties }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {properties.map((property, index) => (
        <motion.div
          key={property.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <PropertyCard {...property} />
        </motion.div>
      ))}
    </div>
  );
};

export default PropertyGrid;

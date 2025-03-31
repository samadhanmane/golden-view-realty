
import React from 'react';
import PropertyCard, { PropertyCardProps } from './PropertyCard';

interface FeaturedPropertiesProps {
  title: string;
  description?: string;
  properties: PropertyCardProps[];
}

const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({ 
  title, 
  description, 
  properties 
}) => {
  return (
    <section className="py-16 bg-bgLight">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          {description && (
            <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              {...property}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;

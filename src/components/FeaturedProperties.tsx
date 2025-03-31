
import React from 'react';
import { PropertyCardProps } from './PropertyCard';
import PropertyGrid from './PropertyGrid';

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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">{title}</h2>
          {description && (
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">{description}</p>
          )}
        </div>
        
        <PropertyGrid properties={properties} />
      </div>
    </section>
  );
};

export default FeaturedProperties;

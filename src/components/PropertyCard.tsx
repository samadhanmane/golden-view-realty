
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building, 
  MapPin, 
  Home, 
  ArrowRight,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export interface PropertyCardProps {
  id: number;
  title: string;
  location: string;
  price: number;
  category: string;
  type: string;
  size: string;
  bedrooms?: number;
  bathrooms?: number;
  featured?: boolean;
  imageUrl: string;
  tags?: string[];
  createdAt: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  title,
  location,
  price,
  category,
  type,
  size,
  bedrooms,
  bathrooms,
  featured,
  imageUrl,
  tags,
  createdAt,
}) => {
  // Format price to have commas and dollar sign
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price);

  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 ${featured ? 'ring-2 ring-secondary' : ''}`}>
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-48 object-cover"
        />
        {featured && (
          <Badge className="absolute top-2 right-2 bg-secondary text-white">
            Featured
          </Badge>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h3 className="text-white font-bold text-xl truncate">{title}</h3>
          <div className="flex items-center text-white/90 text-sm">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="truncate">{location}</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-primary font-bold text-xl">{formattedPrice}</span>
          </div>
          <div className="flex space-x-2">
            <Badge variant="outline" className="bg-bgLight text-textColor">
              {category}
            </Badge>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4 mb-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center text-sm text-gray-500">
              <Building className="h-4 w-4 mr-1 text-gray-400" />
              <span>{type}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Home className="h-4 w-4 mr-1 text-gray-400" />
              <span>{size}</span>
            </div>
            {bedrooms !== undefined && (
              <div className="flex items-center text-sm text-gray-500">
                <span className="mr-1">🛏️</span>
                <span>{bedrooms} Bed{bedrooms !== 1 ? 's' : ''}</span>
              </div>
            )}
            {bathrooms !== undefined && (
              <div className="flex items-center text-sm text-gray-500">
                <span className="mr-1">🚿</span>
                <span>{bathrooms} Bath{bathrooms !== 1 ? 's' : ''}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center text-xs text-gray-500 mt-2 mb-4">
          <Calendar className="h-3 w-3 mr-1" />
          <span>Listed on {formattedDate}</span>
        </div>

        <Link to={`/properties/${id}`}>
          <Button className="w-full bg-primary hover:bg-primary-hover">
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;

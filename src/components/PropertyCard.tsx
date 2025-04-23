import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building, 
  MapPin, 
  Home, 
  ArrowRight,
  Calendar,
  Bath,
  Bed,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';

export interface PropertyCardProps {
  id: string | number;
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
  description?: string;
  amenities?: string[];
  nearbyPlaces?: string[];
  yearBuilt?: number | null;
  contactPhone?: string;
  contactEmail?: string;
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
    <Card className={`overflow-hidden h-full transition-all duration-300 hover:shadow-lg ${featured ? 'ring-2 ring-secondary' : ''}`}>
      <div className="relative">
        <AspectRatio ratio={16/9}>
          <img 
            src={imageUrl || 'https://placehold.co/600x400?text=No+Image'} 
            alt={title} 
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error('PropertyCard: Image failed to load:', imageUrl);
              (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Image+Not+Available';
            }}
          />
        </AspectRatio>
        {featured && (
          <Badge className="absolute top-2 right-2 bg-secondary text-white">
            Featured
          </Badge>
        )}
        <Button 
          size="icon" 
          variant="ghost" 
          className="absolute top-2 left-2 bg-white/80 hover:bg-white text-gray-600 hover:text-primary rounded-full"
        >
          <Heart className="h-5 w-5" />
        </Button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-white font-bold text-xl truncate">{title}</h3>
          <div className="flex items-center text-white/90 text-sm">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="truncate">{location}</span>
          </div>
        </div>
      </div>

      <CardContent className="p-5">
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-primary font-bold text-xl">{formattedPrice}</span>
          </div>
          <Badge variant="outline" className="bg-bgLight text-textColor">
            {category}
          </Badge>
        </div>

        <div className="border-t border-gray-200 pt-4 mb-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center text-sm text-gray-500">
              <Building className="h-4 w-4 mr-1.5 text-primary" />
              <span>{type}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Home className="h-4 w-4 mr-1.5 text-primary" />
              <span>{size}</span>
            </div>
            {bedrooms !== undefined && (
              <div className="flex items-center text-sm text-gray-500">
                <Bed className="h-4 w-4 mr-1.5 text-primary" />
                <span>{bedrooms} Bed{bedrooms !== 1 ? 's' : ''}</span>
              </div>
            )}
            {bathrooms !== undefined && (
              <div className="flex items-center text-sm text-gray-500">
                <Bath className="h-4 w-4 mr-1.5 text-primary" />
                <span>{bathrooms} Bath{bathrooms !== 1 ? 's' : ''}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center text-xs text-gray-500 mt-2">
          <Calendar className="h-3 w-3 mr-1" />
          <span>Listed on {formattedDate}</span>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Link to={`/property/${id}`} className="w-full">
          <Button className="w-full bg-primary hover:bg-primary-hover">
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;

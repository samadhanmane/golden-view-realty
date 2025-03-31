
import { PropertyCardProps } from '@/components/PropertyCard';

export const mockProperties: PropertyCardProps[] = [
  {
    id: 1,
    title: "Luxury Waterfront Villa",
    location: "Miami Beach, FL",
    price: 2450000,
    category: "Residential",
    type: "Villa",
    size: "4,500 sq ft",
    bedrooms: 5,
    bathrooms: 4,
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    tags: ["Waterfront", "Luxury", "Pool"],
    createdAt: "2023-09-15"
  },
  {
    id: 2,
    title: "Modern Downtown Condo",
    location: "Los Angeles, CA",
    price: 850000,
    category: "Residential",
    type: "Condo",
    size: "1,200 sq ft",
    bedrooms: 2,
    bathrooms: 2,
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    tags: ["Downtown", "Modern", "View"],
    createdAt: "2023-10-05"
  },
  {
    id: 3,
    title: "Commercial Office Space",
    location: "New York, NY",
    price: 1650000,
    category: "Commercial",
    type: "Office",
    size: "3,000 sq ft",
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    tags: ["Office", "Central", "Modern"],
    createdAt: "2023-08-22"
  },
  {
    id: 4,
    title: "Agricultural Land",
    location: "Sacramento, CA",
    price: 750000,
    category: "Agricultural",
    type: "Land",
    size: "10 acres",
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    tags: ["Fertile", "Irrigated"],
    createdAt: "2023-11-10"
  },
  {
    id: 5,
    title: "Historic Brownstone",
    location: "Boston, MA",
    price: 1850000,
    category: "Residential",
    type: "House",
    size: "3,200 sq ft",
    bedrooms: 4,
    bathrooms: 3,
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    tags: ["Historic", "Renovated"],
    createdAt: "2023-07-28"
  },
  {
    id: 6,
    title: "Industrial Warehouse",
    location: "Chicago, IL",
    price: 980000,
    category: "Industrial",
    type: "Warehouse",
    size: "15,000 sq ft",
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1565963320901-48309a6d7c14?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    tags: ["Warehouse", "Storage", "Industrial"],
    createdAt: "2023-09-30"
  }
];

export const featuredProperties = mockProperties.filter(property => property.featured);
export const residentialProperties = mockProperties.filter(property => property.category === "Residential");
export const commercialProperties = mockProperties.filter(property => property.category === "Commercial");
export const industrialProperties = mockProperties.filter(property => property.category === "Industrial");
export const agriculturalProperties = mockProperties.filter(property => property.category === "Agricultural");


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, Search, Edit, Trash, Calendar, Building, DollarSign, Users, Image, Upload } from 'lucide-react';
import { mockProperties } from '@/data/mockData';

// Mock successful deals data
const initialDeals = mockProperties.slice(0, 5).map(property => ({
  id: Math.random().toString(36).substring(2, 11),
  propertyId: property.id,
  propertyTitle: property.title,
  propertyImage: property.imageUrl,
  originalPrice: property.price,
  soldPrice: property.price - Math.floor(Math.random() * 50000),
  soldDate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
  buyerName: ['John Smith', 'Emily Johnson', 'Michael Williams', 'Sophia Brown', 'Robert Davis'][
    Math.floor(Math.random() * 5)
  ],
  sellerName: ['Alice Thompson', 'David Wilson', 'Sarah Martinez', 'James Anderson', 'Jennifer Taylor'][
    Math.floor(Math.random() * 5)
  ],
  testimonial: [
    "We couldn't be happier with our new home! The entire process was smooth from start to finish.",
    "Golden View Realty made selling my house a breeze. Their professionalism and expertise were invaluable.",
    "Finding my dream property was easy with Golden View. Their agents understood exactly what I was looking for.",
    "The team at Golden View went above and beyond to ensure we got the best deal possible on our new property.",
    "I'm extremely satisfied with how quickly and efficiently my property was sold. Great experience overall!"
  ][Math.floor(Math.random() * 5)],
  additionalImages: Array(Math.floor(Math.random() * 3) + 1).fill(0).map(() => 
    mockProperties[Math.floor(Math.random() * mockProperties.length)].imageUrl
  )
}));

const DealsManagement: React.FC = () => {
  const [deals, setDeals] = useState(initialDeals);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentDeal, setCurrentDeal] = useState<any>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredDeals = deals.filter(deal => 
    deal.propertyTitle.toLowerCase().includes(searchTerm.toLowerCase()) || 
    deal.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deal.sellerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDeal = (formData: any) => {
    const newDeal = {
      id: Math.random().toString(36).substring(2, 11),
      ...formData,
      soldDate: new Date(formData.soldDate).toISOString(),
      additionalImages: formData.additionalImages || []
    };
    
    setDeals([newDeal, ...deals]);
    setIsAddDialogOpen(false);
    toast({
      title: "Success!",
      description: "New successful deal has been added.",
    });
  };

  const handleEditDeal = (formData: any) => {
    const updatedDeals = deals.map(deal => 
      deal.id === currentDeal.id ? { ...deal, ...formData, soldDate: new Date(formData.soldDate).toISOString() } : deal
    );
    
    setDeals(updatedDeals);
    setCurrentDeal(null);
    toast({
      title: "Success!",
      description: "Deal has been updated successfully.",
    });
  };

  const handleDeleteDeal = (id: string) => {
    if (window.confirm("Are you sure you want to delete this deal?")) {
      setDeals(deals.filter(deal => deal.id !== id));
      toast({
        title: "Deleted",
        description: "Deal has been deleted successfully.",
      });
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const DealForm = ({ onSubmit, initialData = {} }: { onSubmit: (data: any) => void, initialData?: any }) => {
    const [formData, setFormData] = useState({
      propertyTitle: initialData.propertyTitle || '',
      propertyImage: initialData.propertyImage || '',
      originalPrice: initialData.originalPrice || 0,
      soldPrice: initialData.soldPrice || 0,
      soldDate: initialData.soldDate ? new Date(initialData.soldDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      buyerName: initialData.buyerName || '',
      sellerName: initialData.sellerName || '',
      testimonial: initialData.testimonial || '',
      additionalImages: initialData.additionalImages || []
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: name === 'originalPrice' || name === 'soldPrice' ? parseInt(value) : value
      }));
    };

    const handleAddImage = () => {
      // In a real app, this would handle image uploads
      // For the demo, we'll just add a random image URL
      const randomImageIndex = Math.floor(Math.random() * mockProperties.length);
      const newImage = mockProperties[randomImageIndex].imageUrl;
      setFormData(prev => ({
        ...prev,
        additionalImages: [...prev.additionalImages, newImage]
      }));
    };

    const handleRemoveImage = (index: number) => {
      setFormData(prev => ({
        ...prev,
        additionalImages: prev.additionalImages.filter((_, i) => i !== index)
      }));
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(formData);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="propertyTitle">Property Title</Label>
            <Input 
              id="propertyTitle"
              name="propertyTitle" 
              value={formData.propertyTitle} 
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="propertyImage">Main Property Image URL</Label>
            <Input 
              id="propertyImage"
              name="propertyImage" 
              value={formData.propertyImage} 
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="originalPrice">Original Price ($)</Label>
            <Input 
              id="originalPrice"
              name="originalPrice" 
              type="number"
              value={formData.originalPrice} 
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="soldPrice">Sold Price ($)</Label>
            <Input 
              id="soldPrice"
              name="soldPrice" 
              type="number"
              value={formData.soldPrice} 
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="buyerName">Buyer Name</Label>
            <Input 
              id="buyerName"
              name="buyerName" 
              value={formData.buyerName} 
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="sellerName">Seller Name</Label>
            <Input 
              id="sellerName"
              name="sellerName" 
              value={formData.sellerName} 
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="soldDate">Sold Date</Label>
          <Input 
            id="soldDate"
            name="soldDate" 
            type="date"
            value={formData.soldDate} 
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="testimonial">Client Testimonial</Label>
          <Textarea 
            id="testimonial"
            name="testimonial" 
            value={formData.testimonial} 
            onChange={handleChange}
            className="min-h-[100px]"
            required
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>Additional Property Images</Label>
            <Button type="button" variant="outline" size="sm" onClick={handleAddImage}>
              <Image className="h-4 w-4 mr-1" /> Add Image
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
            {formData.additionalImages.map((image, index) => (
              <div key={index} className="relative rounded-md overflow-hidden h-20">
                <img src={image} className="w-full h-full object-cover" alt={`Property image ${index + 1}`} />
                <button 
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                >
                  <Trash className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <DialogFooter>
          <Button type="submit">
            {initialData.id ? 'Update Deal' : 'Add Deal'}
          </Button>
        </DialogFooter>
      </form>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="Search deals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Successful Deal
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Successful Deal</DialogTitle>
            </DialogHeader>
            <DealForm onSubmit={handleAddDeal} />
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Deals Table */}
      <Card className="shadow-sm">
        <CardHeader className="py-4">
          <CardTitle className="text-lg font-medium">Successful Deals</CardTitle>
          <CardDescription>
            Manage successful property deals displayed on the website
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Property</TableHead>
                <TableHead>Sold Price</TableHead>
                <TableHead>Date Sold</TableHead>
                <TableHead>Buyer & Seller</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDeals.map((deal) => (
                <TableRow key={deal.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-md overflow-hidden flex-shrink-0">
                        <img src={deal.propertyImage} className="h-full w-full object-cover" alt={deal.propertyTitle} />
                      </div>
                      <div className="font-medium">{deal.propertyTitle}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium text-green-600">${deal.soldPrice.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">
                        Original: ${deal.originalPrice.toLocaleString()}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      {formatDate(deal.soldDate)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm">Buyer: {deal.buyerName}</div>
                      <div className="text-sm">Seller: {deal.sellerName}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={() => setCurrentDeal(deal)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>Edit Successful Deal</DialogTitle>
                          </DialogHeader>
                          <DealForm onSubmit={handleEditDeal} initialData={currentDeal} />
                        </DialogContent>
                      </Dialog>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="text-red-500 hover:text-red-600"
                        onClick={() => handleDeleteDeal(deal.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DealsManagement;

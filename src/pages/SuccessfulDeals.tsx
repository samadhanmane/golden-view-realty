
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import { mockProperties } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Award, ChevronRight, Calendar } from 'lucide-react';

// Simulate some successful deals
const successfulDeals = mockProperties
  .slice(0, 5)
  .map(property => ({
    ...property,
    soldDate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
    soldPrice: property.price - Math.floor(Math.random() * 50000),
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
  }));

const SuccessfulDeals: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Success Stories</h1>
              <p className="text-xl opacity-90 mb-8">
                Discover the properties we've successfully matched with happy clients
              </p>
              <div className="flex justify-center space-x-8">
                <div className="text-center">
                  <span className="block text-3xl font-bold">{successfulDeals.length}+</span>
                  <span className="text-sm opacity-80">Successful Deals</span>
                </div>
                <div className="text-center">
                  <span className="block text-3xl font-bold">$15M+</span>
                  <span className="text-sm opacity-80">Total Value</span>
                </div>
                <div className="text-center">
                  <span className="block text-3xl font-bold">100%</span>
                  <span className="text-sm opacity-80">Client Satisfaction</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Success Story */}
        <section className="py-16 bg-bgLight">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-10 text-center">Featured Success Story</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="rounded-xl overflow-hidden">
                <img 
                  src={successfulDeals[0].imageUrl} 
                  alt="Feature Success Story"
                  className="w-full h-[400px] object-cover" 
                />
              </div>
              <div>
                <Badge className="bg-green-600 mb-4">SOLD</Badge>
                <h3 className="text-2xl font-bold mb-3">{successfulDeals[0].title}</h3>
                <p className="text-gray-600 mb-4">
                  <span className="flex items-center mb-2">
                    <Calendar className="h-4 w-4 mr-2 text-primary" />
                    Sold on {new Date(successfulDeals[0].soldDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </p>
                <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                  <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
                    <div>
                      <span className="text-sm text-gray-500">Original Price</span>
                      <p className="text-lg font-semibold">${successfulDeals[0].price.toLocaleString()}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                    <div>
                      <span className="text-sm text-gray-500">Sold For</span>
                      <p className="text-lg font-semibold text-green-600">${successfulDeals[0].soldPrice.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <span className="text-sm text-gray-500">Buyer</span>
                      <p className="font-medium">{successfulDeals[0].buyerName}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Seller</span>
                      <p className="font-medium">{successfulDeals[0].sellerName}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-start mb-4">
                    <Award className="h-6 w-6 text-yellow-500 mr-3 flex-shrink-0 mt-1" />
                    <p className="italic text-gray-700">{successfulDeals[0].testimonial}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories Grid */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-10 text-center">More Success Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {successfulDeals.slice(1).map((deal) => (
                <Card key={deal.id} className="overflow-hidden">
                  <div className="relative h-[200px]">
                    <img 
                      src={deal.imageUrl} 
                      alt={deal.title}
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-green-600">SOLD</Badge>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-bold text-lg mb-2">{deal.title}</h3>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-gray-500">Sold For</span>
                      <span className="font-semibold text-green-600">${deal.soldPrice.toLocaleString()}</span>
                    </div>
                    <div className="text-sm text-gray-600 mb-4">
                      <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1 text-primary" />
                        Sold on {new Date(deal.soldDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <p className="text-sm italic text-gray-500 border-t border-gray-100 pt-3">
                      "{deal.testimonial.substring(0, 100)}..."
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial Banner */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Join Our Success Stories</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8 opacity-90">
              Whether you're buying or selling, let us help you achieve your real estate goals with our expert guidance and market knowledge.
            </p>
            <div className="flex justify-center space-x-4">
              <a href="/properties" className="bg-white text-primary px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors">
                Browse Properties
              </a>
              <a href="/contact" className="bg-secondary text-white px-6 py-3 rounded-md font-medium hover:bg-secondary-hover transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SuccessfulDeals;

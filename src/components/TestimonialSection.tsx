
import React from 'react';

interface TestimonialProps {
  quote: string;
  author: string;
  position: string;
  imageUrl: string;
}

const testimonials: TestimonialProps[] = [
  {
    quote: "Golden View Realty helped me find my dream home in just two weeks. Their attention to detail and understanding of what I was looking for was exceptional.",
    author: "Sarah Johnson",
    position: "Homeowner",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
  },
  {
    quote: "As an investor, I needed a reliable team to help me expand my property portfolio. Golden View Realty exceeded my expectations with their market knowledge.",
    author: "Michael Chen",
    position: "Real Estate Investor",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
  },
  {
    quote: "Selling our family property was a sensitive process, but the team at Golden View handled everything with professionalism and care. Highly recommended!",
    author: "Robert Miller",
    position: "Property Seller",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
  }
];

const TestimonialSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover why clients choose Golden View Realty for their property needs.
            Our commitment to excellence and customer satisfaction speaks for itself.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 flex flex-col h-full"
            >
              <div className="flex-grow">
                <div className="text-secondary text-4xl mb-4">"</div>
                <p className="text-gray-700 italic mb-6">{testimonial.quote}</p>
              </div>
              <div className="flex items-center">
                <img 
                  src={testimonial.imageUrl} 
                  alt={testimonial.author} 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-textColor">{testimonial.author}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;

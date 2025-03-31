
import React from 'react';
import { Check, Award, Clock, Shield } from 'lucide-react';

const features = [
  {
    icon: <Check className="h-10 w-10 text-primary" />,
    title: 'Verified Properties',
    description: 'All our listings undergo rigorous verification for legal documentation and ownership status.'
  },
  {
    icon: <Award className="h-10 w-10 text-primary" />,
    title: 'Expert Guidance',
    description: 'Our team of experienced real estate professionals provides personalized assistance throughout your journey.'
  },
  {
    icon: <Clock className="h-10 w-10 text-primary" />,
    title: 'Fast Processing',
    description: 'We ensure efficient processing of all paperwork and transactions to save your valuable time.'
  },
  {
    icon: <Shield className="h-10 w-10 text-primary" />,
    title: 'Secure Investments',
    description: 'We prioritize your investment security with transparent dealings and thorough legal checks.'
  }
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Golden View Realty</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We deliver exceptional real estate services with a focus on transparency,
            professionalism, and personalized attention to each client's needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg border border-gray-100 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-bold text-center mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

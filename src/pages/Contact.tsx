
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact: React.FC = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "We'll get back to you as soon as possible!",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary text-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
              <p className="text-xl max-w-2xl mx-auto">
                Have questions about buying or selling property? Our team is here to help you at every step.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information Cards */}
        <section className="py-12 bg-bgLight">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="overflow-hidden">
                <CardContent className="p-6 flex flex-col items-center">
                  <div className="bg-primary/10 p-3 rounded-full mb-4">
                    <Phone className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                  <p className="text-gray-500 mb-4 text-center">Our agents are available from Monday to Friday, 9am to 5pm</p>
                  <a href="tel:+15551234567" className="text-primary font-medium hover:underline">+1 (555) 123-4567</a>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <CardContent className="p-6 flex flex-col items-center">
                  <div className="bg-primary/10 p-3 rounded-full mb-4">
                    <Mail className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                  <p className="text-gray-500 mb-4 text-center">Send us an email and we'll respond as soon as possible</p>
                  <a href="mailto:contact@goldenviewrealty.com" className="text-primary font-medium hover:underline">contact@goldenviewrealty.com</a>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <CardContent className="p-6 flex flex-col items-center">
                  <div className="bg-primary/10 p-3 rounded-full mb-4">
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Working Hours</h3>
                  <p className="text-gray-500 mb-4 text-center">
                    Monday to Friday: 9am - 5pm<br />
                    Saturday: 10am - 3pm<br />
                    Sunday: Closed
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Contact Form and Map */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block mb-2 font-medium">Your Name</label>
                      <Input id="name" placeholder="John Smith" required />
                    </div>
                    <div>
                      <label htmlFor="email" className="block mb-2 font-medium">Your Email</label>
                      <Input id="email" type="email" placeholder="john@example.com" required />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block mb-2 font-medium">Phone Number</label>
                      <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block mb-2 font-medium">Subject</label>
                      <Input id="subject" placeholder="Property Inquiry" required />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block mb-2 font-medium">Message</label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell us how we can help you..."
                      className="min-h-[150px]" 
                      required 
                    />
                  </div>
                  
                  <Button type="submit" className="bg-primary hover:bg-primary-hover w-full md:w-auto">
                    <Send className="mr-2 h-4 w-4" /> Send Message
                  </Button>
                </form>
              </div>
              
              {/* Map and Office Address */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Office</h2>
                <div className="bg-gray-200 h-[300px] mb-6 rounded">
                  <iframe
                    className="w-full h-full rounded"
                    frameBorder="0"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30599542466!2d-74.25986771959991!3d40.69714941680757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1587032094935!5m2!1sen!2s"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">Golden View Realty Headquarters</h3>
                  <p className="flex items-start">
                    <MapPin className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                    <span>1234 Real Estate Blvd, Suite 567, Metropolis, CA 98765</span>
                  </p>
                  <p className="flex items-center">
                    <Phone className="h-5 w-5 mr-2 text-primary" />
                    <span>+1 (555) 123-4567</span>
                  </p>
                  <p className="flex items-center">
                    <Mail className="h-5 w-5 mr-2 text-primary" />
                    <span>contact@goldenviewrealty.com</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;

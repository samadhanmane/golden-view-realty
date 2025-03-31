
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-textColor text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Golden View Realty</h3>
            <p className="mb-4 text-gray-300">
              Discover your dream property with our expert guidance. We specialize in luxury homes, commercial spaces, and investment opportunities.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-secondary">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-secondary">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-secondary">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-secondary">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-secondary">Home</Link>
              </li>
              <li>
                <Link to="/properties" className="text-gray-300 hover:text-secondary">Properties</Link>
              </li>
              <li>
                <Link to="/locations" className="text-gray-300 hover:text-secondary">Locations</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-secondary">Contact Us</Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-secondary">Sign In</Link>
              </li>
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="text-xl font-bold mb-4">Property Types</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/properties?type=residential" className="text-gray-300 hover:text-secondary">Residential</Link>
              </li>
              <li>
                <Link to="/properties?type=commercial" className="text-gray-300 hover:text-secondary">Commercial</Link>
              </li>
              <li>
                <Link to="/properties?type=agricultural" className="text-gray-300 hover:text-secondary">Agricultural Land</Link>
              </li>
              <li>
                <Link to="/properties?type=plots" className="text-gray-300 hover:text-secondary">Plots</Link>
              </li>
              <li>
                <Link to="/properties?type=industrial" className="text-gray-300 hover:text-secondary">Industrial</Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-1" />
                <span>1234 Real Estate Blvd, Suite 567, Metropolis, CA 98765</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <span>contact@goldenviewrealty.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Golden View Realty. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

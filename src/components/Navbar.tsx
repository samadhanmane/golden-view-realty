
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, Search, Home, Building, MapPin, Phone } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-primary text-2xl font-bold">Golden View Realty</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-textColor hover:text-primary flex items-center">
              <Home className="mr-1 h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link to="/properties" className="text-textColor hover:text-primary flex items-center">
              <Building className="mr-1 h-4 w-4" />
              <span>Properties</span>
            </Link>
            <Link to="/locations" className="text-textColor hover:text-primary flex items-center">
              <MapPin className="mr-1 h-4 w-4" />
              <span>Locations</span>
            </Link>
            <Link to="/contact" className="text-textColor hover:text-primary flex items-center">
              <Phone className="mr-1 h-4 w-4" />
              <span>Contact</span>
            </Link>

            <Button variant="outline" size="sm" className="ml-4 flex items-center">
              <Search className="mr-1 h-4 w-4" />
              <span>Search</span>
            </Button>

            <Link to="/login">
              <Button className="bg-primary text-white hover:bg-primary-hover flex items-center">
                <User className="mr-1 h-4 w-4" />
                <span>Sign In</span>
              </Button>
            </Link>
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-textColor hover:text-primary focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-textColor hover:text-primary hover:bg-bgLight"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link 
              to="/properties" 
              className="block px-3 py-2 rounded-md text-base font-medium text-textColor hover:text-primary hover:bg-bgLight"
              onClick={toggleMenu}
            >
              Properties
            </Link>
            <Link 
              to="/locations" 
              className="block px-3 py-2 rounded-md text-base font-medium text-textColor hover:text-primary hover:bg-bgLight"
              onClick={toggleMenu}
            >
              Locations
            </Link>
            <Link 
              to="/contact" 
              className="block px-3 py-2 rounded-md text-base font-medium text-textColor hover:text-primary hover:bg-bgLight"
              onClick={toggleMenu}
            >
              Contact
            </Link>
            <Link 
              to="/login" 
              className="block px-3 py-2 rounded-md text-base font-medium text-white bg-primary hover:bg-primary-hover"
              onClick={toggleMenu}
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

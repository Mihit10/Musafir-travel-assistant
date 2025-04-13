"use client";
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, ArrowUpCircle } from 'lucide-react';

// Brand name and year constants to use throughout the component
const BRAND_NAME = "Musafir";
const CURRENT_YEAR = new Date().getFullYear();

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const footerLinks = {
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Our Mission', path: '/mission' },
      { name: 'Careers', path: '/careers' },
      { name: 'Press', path: '/press' },
    ],
    support: [
      { name: 'Help Center', path: '/help' },
      { name: 'Accessibility', path: '/accessibility' },
      { name: 'Report an Issue', path: '/report' },
      { name: 'Partner Support', path: '/partner-support' },
    ],
  };

  return (
    <footer className="w-full z-40 mt-16"
      style={{
        background: 'radial-gradient(circle at center, #1f3347, #162435, #111827)'
      }}
    >
      <div className="container mx-auto px-4 pt-8 pb-6">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Brand info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="mr-2 text-green-400">
                <img src="https://cdn-icons-png.flaticon.com/512/549/549395.png" alt="Logo" className="w-8 h-8" />
              </div>
              <span className="text-2xl font-bold text-green-400 tracking-tight">
                {BRAND_NAME}
              </span>
            </div>
            <p className="text-gray-300 mb-4">
              Connecting travelers with authentic local experiences across India.
            </p>
            
            {/* Social links */}
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors duration-300">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Company section */}
          <div>
            <h3 className="font-semibold text-white text-lg mb-3">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link href={link.path}>
                    <span className="text-gray-300 hover:text-green-400 transition-colors duration-200">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support section */}
          <div>
            <h3 className="font-semibold text-white text-lg mb-3">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.path}>
                  <Link href={link.path}>
                    <span className="text-gray-300 hover:text-green-400 transition-colors duration-200">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="font-semibold text-white text-lg mb-3">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center text-gray-300">
                <Mail size={16} className="mr-2 text-green-400" />
                <span>support@{BRAND_NAME.toLowerCase()}.com</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone size={16} className="mr-2 text-green-400" />
                <span>+91 1234567890</span>
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin size={16} className="mr-2 text-green-400" />
                <span>Delhi, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {CURRENT_YEAR} {BRAND_NAME}. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm text-gray-400">
            <Link href="/terms">
              <span className="hover:text-green-400 transition-colors duration-200">Terms</span>
            </Link>
            <Link href="/privacy">
              <span className="hover:text-green-400 transition-colors duration-200">Privacy</span>
            </Link>
            <Link href="/cookies">
              <span className="hover:text-green-400 transition-colors duration-200">Cookies</span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Scroll to top button */}
      <button 
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-gray-800/80 backdrop-blur-sm p-2 rounded-full text-green-400 hover:text-green-300 hover:bg-gray-700 transition-all duration-300 z-50"
        aria-label="Scroll to top"
      >
        <ArrowUpCircle size={24} />
      </button>
    </footer>
  );
};

export default Footer;
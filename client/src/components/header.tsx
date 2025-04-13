"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Map } from 'lucide-react';

// Brand name variable that can be referenced throughout the component
const BRAND_NAME = "Raste-pe";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('/');

  // Handle scroll effect to change header appearance on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle setting the active tab based on current route
  useEffect(() => {
    const pathname = window.location.pathname;
    setActiveTab(pathname);
  }, []);

  const navItems = [
    { name: 'Your Itinerary', path: '/home' },
    { name: 'Local Homestays', path: '/homestays' },
    { name: 'Local Guides', path: '/guides' },
    { name: 'Local Vendors', path: '/shops' },
    { name: 'Community', path: '/community' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'shadow-lg backdrop-blur-md' 
          : 'py-2'
      }`}
      style={{
        background: isScrolled 
          ? 'radial-gradient(circle at center, #1a2b38, #121e29, #111827e6)' 
          : 'radial-gradient(circle at center, #1f3347, #162435, #111827)'
      }}
    >
      <div className="container mx-auto px-4 py-4 md:py-3">
        <div className="flex items-center justify-between">
          {/* Brand Logo/Name */}
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center group">
                {/* Using Lucide-React Map icon instead of external image */}
                <div className="mr-2 transform group-hover:scale-110 transition-transform duration-300 text-green-400">
                  {/* <Map size={28} /> */}
                  <img src="https://cdn-icons-png.flaticon.com/512/549/549395.png" alt="`Logo" className="w-8 h-8" />
                </div>
                <span className="text-2xl md:text-3xl font-bold text-green-400 hover:text-green-300 transition-colors duration-300 cursor-pointer tracking-tight relative">
                  {BRAND_NAME}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-300"></span>
                  <span className="absolute text-xs text-green-300/70 -right-4 -top-1 transform rotate-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">✦</span>
                </span>
              </div>
            </Link>
          </div>

           {/* Desktop Navigation */}
           <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link 
                href={item.path} 
                key={item.path}
                onClick={() => setActiveTab(item.path)}
              >
                <span 
                  className={`relative text-md font-medium transition-colors duration-200 ${
                    activeTab === item.path 
                      ? 'text-green-400' 
                      : 'text-gray-300 hover:text-white'
                  } group`}
                >
                  {item.name}
                  <span 
                    className={`absolute -bottom-1 left-0 h-0.5 bg-green-400 transition-all duration-300 ${
                      activeTab === item.path ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  ></span>
                </span>
              </Link>
            ))}

            {/* Only show "Plan Trip" button if not on homepage */}
            {activeTab !== '/' && (
              <Link href="/">
                <span className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg inline-block cursor-pointer">
                  Plan Trip
                </span>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X size={24} className="transition-transform duration-300 transform rotate-90" />
              ) : (
                <Menu size={24} className="transition-transform duration-300 hover:rotate-12" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen 
              ? 'max-h-screen opacity-100 mt-4 pb-4' 
              : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col space-y-4 bg-gray-800/90 backdrop-blur-sm p-4 rounded-lg mt-2">
            {navItems.map((item) => (
              <Link 
                href={item.path} 
                key={item.path}
                onClick={() => {
                  setActiveTab(item.path);
                  setMobileMenuOpen(false);
                }}
              >
                <span 
                  className={`block px-2 py-2 text-md font-medium rounded-md ${
                    activeTab === item.path 
                      ? 'bg-gray-700 text-green-400' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  } transition-all duration-200 ${item.name === 'Your Itinerary' ? 'font-semibold' : ''}`}
                >
                  {item.name}
                </span>
              </Link>
            ))}
            {/* Only show "Plan Trip" button if not on homepage */}
            {activeTab !== '/' && (
              <Link href="/">
                <span className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-md transition-all duration-300 block text-center">
                  Plan Trip
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
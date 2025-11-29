import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';

const getGmailLink = () => {
  // Detect if user is on mobile
  const isMobile = typeof window !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  const to = SITE_CONFIG.email;
  const subject = "I want to book the car";
  const body = `Hi,

I'm interested in booking a vehicle for my travel needs.

Please share:
- Available dates
- Vehicle options
- Pricing

Thank you

Regards`;

  if (isMobile) {
    // For mobile: use mailto (will open Gmail app if installed)
    return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  } else {
    // For desktop: use Gmail web compose
    return `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${to}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
};

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                ✈️
              </div>
              <div>
                <h3 className="text-xl font-bold">Jesus Travel</h3>
                <p className="text-xs text-blue-300">Reliable Rides</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">{SITE_CONFIG.description}</p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-white">Quick Links</h4>
            <div className="space-y-3">
              {[
                { label: 'Home', href: '/' },
                { label: 'Services', href: '/services' },
                { label: 'About Us', href: '/about' },
                { label: 'Contact Us', href: '/book' },
                { label: 'FAQ', href: '/faq' }
              ].map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-gray-400 hover:text-blue-400 text-sm transition-colors duration-200"
                >
                  → {item.label}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Contact Information */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-white">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 mb-1">Address</p>
                  <p className="text-sm text-gray-300">{SITE_CONFIG.address}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 mb-1">Phone</p>
                  <div className="flex flex-col">
                    <a 
                      href={`tel:${SITE_CONFIG.phone}`} 
                      className="text-sm text-gray-300 hover:text-blue-400 transition-colors"
                    >
                      {SITE_CONFIG.phone}
                    </a>
                    <a 
                      href={`tel:${SITE_CONFIG.phone2}`} 
                      className="text-sm text-gray-300 hover:text-blue-400 transition-colors"
                    >
                      {SITE_CONFIG.phone2}
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 mb-1">Email</p>
                  <a 
                    href={getGmailLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-300 hover:text-blue-400 transition-colors break-all"
                  >
                    {SITE_CONFIG.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Connect With Us */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-white">Connect With Us</h4>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              Available 24/7 to help with your vehicle service needs
            </p>
            
            <div className="space-y-3">
              <a
                href={getGmailLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 px-4 py-3 rounded-lg text-sm font-semibold transition-colors duration-200 w-full"
              >
                <Mail className="w-5 h-5" /> Email Us
              </a>
              
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=Hi, I'd like to know more about Jesus Travel services`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-3 rounded-lg text-sm font-semibold transition-colors duration-200 w-full"
              >
                <MessageCircle className="w-5 h-5" /> WhatsApp
              </a>
              
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-lg text-sm font-semibold transition-colors duration-200 w-full"
              >
                <Phone className="w-5 h-5" /> Call Now
              </a>
            </div>
            
            <p className="text-xs text-gray-500 mt-4 text-center">
              <Clock className="w-4 h-4 inline mr-1" /> {SITE_CONFIG.hours}
            </p>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              &copy; {currentYear} Jesus Travel. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/terms" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

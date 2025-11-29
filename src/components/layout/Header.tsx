'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, MessageCircle, Mail } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/book' },
  { label: 'FAQ', href: '/faq' },
];

const getGmailLink = () => {
  // Detect if user is on mobile
  const isMobile = typeof window !== 'undefined' && typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
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
    // For mobile: try Gmail app first with mailto fallback
    return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  } else {
    // For desktop: use Gmail web compose
    return `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${to}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
};

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  return (
    <header className="bg-white shadow-md sticky top-0 z-50 w-full">
      <div className="w-full px-2 sm:px-4 md:px-6">
        <div className="flex items-center justify-between min-h-14 sm:min-h-16 md:min-h-20 gap-2">
          {/* Logo - Clickable to Home */}
          <Link href="/" className="flex items-center flex-shrink-0 hover:opacity-90 transition-opacity">
            <Image 
              src="/logo.svg" 
              alt="Jesus Travel" 
              width={400} 
              height={100}
              className="h-12 sm:h-14 md:h-16 w-auto"
              priority
              quality={95}
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 xl:px-4 py-2 rounded-lg text-xs xl:text-sm font-medium transition-colors whitespace-nowrap",
                  pathname === item.href
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          {/* Quick Actions - Mobile Optimized */}
          <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 flex-wrap justify-end">
            <a 
              href={getGmailLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-0.5 sm:gap-1 bg-blue-100 text-blue-600 hover:bg-blue-200 px-1.5 sm:px-2 md:px-3 py-1.5 sm:py-2 rounded text-xs sm:text-xs md:text-sm font-medium transition-colors"
              title="Email us"
              aria-label="Email us"
            >
              <Mail className="w-3.5 h-3.5 sm:w-4 h-4" />
              <span className="hidden md:inline text-xs">Email</span>
            </a>
            <a 
              href="https://wa.me/919831005736"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-0.5 sm:gap-1 bg-green-50 text-green-600 hover:bg-green-100 px-1.5 sm:px-2 md:px-3 py-1.5 sm:py-2 rounded text-xs sm:text-xs md:text-sm font-medium transition-colors"
              title="WhatsApp"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 sm:w-4 h-4" />
              <span className="hidden md:inline text-xs">WhatsApp</span>
            </a>
            <a 
              href={`tel:${SITE_CONFIG.phone}`}
              className="flex items-center gap-0.5 sm:gap-1 bg-blue-600 text-white hover:bg-blue-700 px-1.5 sm:px-2 md:px-3 py-1.5 sm:py-2 rounded text-xs sm:text-xs md:text-sm font-medium transition-colors"
              title="Call Now"
              aria-label="Call"
            >
              <Phone className="w-3.5 h-3.5 sm:w-4 h-4" />
              <span className="hidden md:inline text-xs">Call</span>
            </a>
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors ml-auto"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 h-6" /> : <Menu className="w-5 h-5 sm:w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 sm:py-4 border-t bg-white">
            <nav className="space-y-1 mb-4">
              {navItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "block px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-colors",
                    pathname === item.href
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:bg-gray-50'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            
            <div className="space-y-2 border-t pt-3 sm:pt-4">
              <a 
                href={getGmailLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 bg-blue-100 text-blue-600 hover:bg-blue-200 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-colors w-full"
              >
                <Mail className="w-4 h-4 sm:w-5 h-5" /> Email
              </a>
              <a 
                href="https://wa.me/919831005736"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 bg-green-600 text-white hover:bg-green-700 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-colors w-full"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 h-5" /> WhatsApp
              </a>
              <a 
                href={`tel:${SITE_CONFIG.phone}`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-colors w-full"
              >
                <Phone className="w-4 h-4 sm:w-5 h-5" /> Call Now
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

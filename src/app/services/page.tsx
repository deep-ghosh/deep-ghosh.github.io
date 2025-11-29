import React from 'react';
import Link from 'next/link';
import { Check, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SERVICES_CONFIG } from '@/config/services';

export const metadata = {
  title: 'Our Services - Jesus Travel',
  description: 'Explore our vehicle booking services including school pickups, office shuttles, wedding cars, and tour packages.',
};

export default function ServicesPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Reliable and professional vehicle services tailored to your needs
          </p>
        </div>
        
        <div className="space-y-12">
          {SERVICES_CONFIG.map((service, index) => (
            <div 
              key={service.id}
              className={`flex flex-col md:flex-row gap-8 items-center ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className="flex-1">
                <div className="text-6xl mb-4">{service.icon}</div>
                <h2 className="text-3xl font-bold mb-3">{service.name}</h2>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <p className="text-2xl font-bold text-blue-600 mb-6">{service.pricing}</p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-600" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link href="/book">
                  <Button>
                    Book Now <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
              
              <div className="flex-1">
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl h-64 md:h-80 flex items-center justify-center">
                  <span className="text-8xl">{service.icon}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="mt-16 bg-blue-600 text-white rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Need a Custom Package?</h2>
          <p className="text-blue-100 mb-6 max-w-xl mx-auto">
            We offer customized solutions for unique requirements. Contact us to discuss your needs.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact">
              <Button variant="secondary">Contact Us</Button>
            </Link>
            <Link href="/book">
              <Button className="bg-white text-blue-600 hover:bg-gray-100">
                Book Now <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Phone, 
  Car, 
  CheckCircle, 
  MapPin, 
  Shield, 
  Clock, 
  Star, 
  ChevronRight, 
  MessageCircle,
  Users,
  Zap,
  Award,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SERVICES, TESTIMONIALS, SITE_CONFIG } from '@/config/site';

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="bg-white">
      {/* Hero Section - Mobile Optimized */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800 text-white py-12 sm:py-16 md:py-24 lg:py-32 relative overflow-hidden">
        {/* Decorative elements - Hidden on mobile */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 opacity-10 rounded-full blur-3xl hidden sm:block"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400 opacity-10 rounded-full blur-3xl hidden sm:block"></div>
        
        <div className="w-full px-4 sm:px-6 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 bg-blue-500/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-blue-400/30">
              <Zap className="w-3.5 h-3.5 sm:w-4 h-4" />
              <span className="text-xs sm:text-sm font-semibold">Professional Vehicle Services in Kolkata</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Reliable Rides, <span className="text-blue-300">Every Time</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-blue-100 leading-relaxed max-w-2xl">
              Professional vehicle services for your school, office, wedding, and travel needs across Kolkata. Safe, punctual, and trustworthy.
            </p>
            
            <div className="flex flex-col gap-3 sm:gap-4 mb-8 sm:mb-12">
              <Link href="/book" className="w-full sm:w-auto">
                <Button className="bg-white text-blue-900 hover:bg-gray-100 font-semibold text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 flex items-center justify-center gap-2 shadow-lg rounded-xl w-full">
                  Get in Touch <ArrowRight className="w-4 h-4 sm:w-5 h-5" />
                </Button>
              </Link>
              <Link href={`tel:${SITE_CONFIG.phone}`} className="w-full sm:w-auto">
                <Button className="border-2 border-white text-white hover:bg-white/10 bg-transparent font-semibold text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 flex items-center justify-center gap-2 rounded-xl w-full">
                  <Phone className="w-4 h-4 sm:w-5 h-5" /> Call Now
                </Button>
              </Link>
            </div>
            
            {/* Quick Contact Options - Stacked on mobile */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 sm:w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-blue-200 text-xs">Call anytime</p>
                  <p className="font-semibold text-sm truncate">{SITE_CONFIG.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-4 h-4 sm:w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-blue-200 text-xs">WhatsApp us</p>
                  <p className="font-semibold text-sm truncate">+91 9831005736</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us - Trust Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Jesus Travel?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Years of trusted service with thousands of satisfied customers
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Safety First',
                description: 'Verified drivers, well-maintained vehicles, and GPS tracking for your peace of mind'
              },
              {
                icon: Clock,
                title: '24/7 Availability',
                description: 'We\'re always ready. Call or message us anytime, day or night'
              },
              {
                icon: Users,
                title: 'Professional Team',
                description: 'Experienced, courteous drivers trained to provide excellent service'
              },
              {
                icon: Award,
                title: 'Reliability',
                description: 'Thousands of happy clients trust us for their daily commute and special occasions'
              },
              {
                icon: Car,
                title: 'Quality Fleet',
                description: 'Well-maintained vehicles suitable for all types of travel'
              },
              {
                icon: MapPin,
                title: 'Kolkata Coverage',
                description: 'Serving Newtown, Action Area, and surrounding areas with excellence'
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Services Grid - Without Pricing */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tailored vehicle solutions for every need
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map(service => (
              <div key={service.id} className="bg-white rounded-xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-blue-300">
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{service.name}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-2">
                  {service.features && service.features.slice(0, 2).map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works - Simplified */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Getting Started is Easy</h2>
            <p className="text-xl text-gray-600">Just three simple steps</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { 
                step: '1', 
                title: 'Contact Us', 
                desc: 'Call, WhatsApp, or fill our contact form with your requirements',
                icon: MessageCircle 
              },
              { 
                step: '2', 
                title: 'Share Details', 
                desc: 'Tell us your date, location, and type of service needed',
                icon: MapPin 
              },
              { 
                step: '3', 
                title: 'Confirm & Ride', 
                desc: 'Get confirmation and enjoy professional, punctual service',
                icon: CheckCircle 
              }
            ].map(item => (
              <div key={item.step} className="relative">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-lg text-gray-600 mb-6">Ready to get started?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`tel:${SITE_CONFIG.phone}`}>
                <Button className="bg-blue-600 hover:bg-blue-700 font-semibold px-8 py-4 flex items-center gap-2">
                  <Phone className="w-5 h-5" /> Call Us
                </Button>
              </a>
              <a href="https://wa.me/919831005736">
                <Button className="bg-green-500 hover:bg-green-600 font-semibold px-8 py-4 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" /> WhatsApp
                </Button>
              </a>
              <Link href="/book">
                <Button className="bg-gray-800 hover:bg-gray-900 font-semibold px-8 py-4 flex items-center gap-2">
                  Send Message <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials - Better Design */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">Trusted by thousands across Kolkata</p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg p-10 border border-blue-100">
              <div className="flex gap-1 mb-6 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 text-xl mb-8 text-center leading-relaxed">
                "{TESTIMONIALS[currentTestimonial].text}"
              </p>
              <div className="text-center border-t border-gray-200 pt-6">
                <p className="font-bold text-lg">{TESTIMONIALS[currentTestimonial].name}</p>
                <p className="text-gray-600 text-sm">{TESTIMONIALS[currentTestimonial].role}</p>
              </div>
              <div className="flex justify-center gap-2 mt-8">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentTestimonial(i)}
                    className={`transition-all duration-300 rounded-full ${
                      i === currentTestimonial 
                        ? 'bg-blue-600 w-3 h-3' 
                        : 'bg-gray-300 w-2 h-2 hover:bg-gray-400'
                    }`}
                    aria-label={`View testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact & CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 opacity-10 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to Book Your Service?</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Contact us today to arrange your perfect ride
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            <div className="bg-white/10 backdrop-blur rounded-xl p-8 border border-white/20 hover:border-white/40 transition-all">
              <Phone className="w-8 h-8 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Call Us</h3>
              <p className="text-blue-100 mb-4">Speak directly with our team</p>
              <a href={`tel:${SITE_CONFIG.phone}`} className="text-lg font-semibold hover:text-blue-300 transition-colors">
                {SITE_CONFIG.phone}
              </a>
              <p className="text-sm text-blue-200 mt-2">Available 24/7</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur rounded-xl p-8 border border-white/20 hover:border-white/40 transition-all">
              <MessageCircle className="w-8 h-8 mb-4" />
              <h3 className="text-2xl font-bold mb-2">WhatsApp</h3>
              <p className="text-blue-100 mb-4">Quick messages and bookings</p>
              <a href="https://wa.me/919831005736" className="text-lg font-semibold hover:text-blue-300 transition-colors">
                Start Chat
              </a>
              <p className="text-sm text-blue-200 mt-2">Instant response</p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-blue-100 mb-6">Or send us a message</p>
            <Link href="/book">
              <Button className="bg-white text-blue-900 hover:bg-gray-100 font-bold text-lg px-10 py-4 shadow-xl">
                Send Message <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

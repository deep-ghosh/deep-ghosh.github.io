import React from 'react';
import { Users, Target, Award, Clock } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';

export const metadata = {
  title: 'About Us - Jesus Travel',
  description: 'Learn about Jesus Travel, your trusted vehicle booking partner in Kolkata.',
};

export default function AboutPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">About Jesus Travel</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted partner for reliable and professional vehicle services in Kolkata since 2015
          </p>
        </div>
        
        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Jesus Travel was founded with a simple mission: to provide safe, reliable, and 
              professional transportation services to the people of Kolkata. What started as 
              a small family business with just two vehicles has grown into a trusted fleet 
              serving hundreds of families and businesses.
            </p>
            <p className="text-gray-600 mb-4">
              Based in Newtown, Action Area 1, we understand the unique transportation needs 
              of our community. Whether it's ensuring children reach school safely, helping 
              employees commute comfortably, or making special occasions memorable, we take 
              pride in every journey we facilitate.
            </p>
            <p className="text-gray-600">
              Our commitment to punctuality, safety, and customer satisfaction has made us 
              the preferred choice for thousands of customers across Kolkata.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl h-80 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-4xl mx-auto mb-4">
                JT
              </div>
              <p className="text-2xl font-bold text-blue-800">Since 2015</p>
            </div>
          </div>
        </div>
        
        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Users, title: 'Customer First', desc: 'Your satisfaction is our top priority' },
              { icon: Target, title: 'Reliability', desc: 'Always on time, every time' },
              { icon: Award, title: 'Quality Service', desc: 'Professional drivers and maintained vehicles' },
              { icon: Clock, title: '24/7 Support', desc: 'Available whenever you need us' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <item.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Stats */}
        <div className="bg-blue-600 text-white rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: '10+', label: 'Years of Service' },
              { number: '5000+', label: 'Happy Customers' },
              { number: '50+', label: 'Vehicle Fleet' },
              { number: '24/7', label: 'Availability' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Team */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Our team of experienced professionals is dedicated to providing you with the 
            best travel experience. From our drivers to our customer support, everyone 
            at Jesus Travel is committed to excellence.
          </p>
          <div className="bg-gray-50 rounded-xl p-8">
            <p className="text-lg">
              📞 Contact us at <a href={`tel:${SITE_CONFIG.phone}`} className="text-blue-600 font-semibold">{SITE_CONFIG.phone}</a>
            </p>
            <p className="text-lg mt-2">
              📧 Email us at <a href={`mailto:${SITE_CONFIG.email}`} className="text-blue-600 font-semibold">{SITE_CONFIG.email}</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

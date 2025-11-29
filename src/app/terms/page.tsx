import React from 'react';
import { SITE_CONFIG } from '@/config/site';

export const metadata = {
  title: 'Terms of Service - Jesus Travel',
};

export default function TermsPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <p className="text-gray-600 mb-8">Last updated: November 2025</p>
          
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 mb-4">
              By accessing and using the services provided by Jesus Travel ("{SITE_CONFIG.name}"), 
              you accept and agree to be bound by the terms and provisions of this agreement.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">2. Services</h2>
            <p className="text-gray-600 mb-4">
              Jesus Travel provides vehicle booking and transportation services including but not 
              limited to school pickups, office shuttles, wedding transportation, and tour services 
              in and around Kolkata, West Bengal, India.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">3. Booking and Cancellation</h2>
            <p className="text-gray-600 mb-4">
              <strong>Booking:</strong> All bookings are subject to vehicle availability. We recommend 
              booking at least 24 hours in advance for guaranteed availability.
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Cancellation:</strong> Cancellations made more than 4 hours before the scheduled 
              pickup time are free of charge. Cancellations made less than 4 hours before may incur 
              a cancellation fee of up to 50% of the estimated fare.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">4. Payment</h2>
            <p className="text-gray-600 mb-4">
              Payment can be made through cash, UPI, bank transfer, or credit/debit cards. 
              For regular services, monthly billing options are available upon approval.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">5. User Responsibilities</h2>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Provide accurate booking information</li>
              <li>Be present at the pickup location at the scheduled time</li>
              <li>Treat drivers and vehicles with respect</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Not engage in illegal activities during transportation</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">6. Liability</h2>
            <p className="text-gray-600 mb-4">
              While we strive to provide safe and reliable service, Jesus Travel shall not be 
              liable for delays, cancellations, or damages caused by circumstances beyond our 
              control including but not limited to traffic conditions, weather, or acts of God.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">7. Changes to Terms</h2>
            <p className="text-gray-600 mb-4">
              We reserve the right to modify these terms at any time. Changes will be effective 
              immediately upon posting on our website.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">8. Contact</h2>
            <p className="text-gray-600 mb-4">
              For questions about these Terms of Service, please contact us at:
            </p>
            <p className="text-gray-600">
              Email: <a href={`mailto:${SITE_CONFIG.email}`} className="text-blue-600">{SITE_CONFIG.email}</a><br />
              Phone: <a href={`tel:${SITE_CONFIG.phone}`} className="text-blue-600">{SITE_CONFIG.phone}</a><br />
              Address: {SITE_CONFIG.address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

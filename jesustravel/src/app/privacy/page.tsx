import React from 'react';
import { SITE_CONFIG } from '@/config/site';

export const metadata = {
  title: 'Privacy Policy - Jesus Travel',
};

export default function PrivacyPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: November 2025</p>
          
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold mt-8 mb-4">1. Information We Collect</h2>
            <p className="text-gray-600 mb-4">
              We collect information you provide directly to us when booking our services:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Name and contact information (phone number, email address)</li>
              <li>Pickup and drop-off locations</li>
              <li>Date and time preferences</li>
              <li>Payment information</li>
              <li>Communication preferences</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Process and manage your bookings</li>
              <li>Communicate with you about your trips</li>
              <li>Send booking confirmations and reminders</li>
              <li>Improve our services</li>
              <li>Respond to your inquiries</li>
              <li>Send promotional communications (with your consent)</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">3. Information Sharing</h2>
            <p className="text-gray-600 mb-4">
              We do not sell your personal information. We may share your information with:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Our drivers to facilitate your trips</li>
              <li>Service providers who assist in our operations</li>
              <li>Legal authorities when required by law</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">4. Data Security</h2>
            <p className="text-gray-600 mb-4">
              We implement appropriate security measures to protect your personal information 
              from unauthorized access, alteration, disclosure, or destruction.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">5. Your Rights</h2>
            <p className="text-gray-600 mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">6. Cookies</h2>
            <p className="text-gray-600 mb-4">
              Our website may use cookies to enhance your browsing experience. You can control 
              cookie settings through your browser preferences.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">7. Changes to This Policy</h2>
            <p className="text-gray-600 mb-4">
              We may update this privacy policy from time to time. We will notify you of any 
              changes by posting the new policy on this page.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">8. Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about this Privacy Policy, please contact us:
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

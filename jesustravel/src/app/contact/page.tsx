'use client';

import React from 'react';
import { ContactForm } from '@/components/booking/ContactForm';

export default function ContactPage() {
  return (
    <div className="py-12 md:py-20 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <div className="container mx-auto px-4">
        <ContactForm />
      </div>
    </div>
  );
}

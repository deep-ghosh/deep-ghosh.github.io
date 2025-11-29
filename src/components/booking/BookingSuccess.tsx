import React from 'react';
import { CheckCircle, Copy, Home } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Booking } from '@/types';
import Link from 'next/link';

interface BookingSuccessProps {
  booking: Booking;
  onClose: () => void;
}

export function BookingSuccess({ booking, onClose }: BookingSuccessProps) {
  const copyReference = () => {
    navigator.clipboard?.writeText(booking.reference);
    alert('Reference copied to clipboard!');
  };
  
  return (
    <Modal isOpen={true} onClose={onClose} title="Booking Confirmed" size="md">
      <div className="text-center py-4">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        
        <h3 className="text-2xl font-bold mb-2">Booking Confirmed!</h3>
        
        <p className="text-gray-600 mb-6">
          Thank you, {booking.name}. Your booking has been successfully created.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600 mb-2">Your Booking Reference</p>
          <div className="flex items-center justify-center gap-2">
            <span className="font-mono text-lg font-bold bg-white px-4 py-2 rounded border">
              {booking.reference}
            </span>
            <button
              onClick={copyReference}
              className="p-2 hover:bg-gray-200 rounded transition-colors"
              title="Copy reference"
            >
              <Copy className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
        
        <div className="text-left bg-blue-50 rounded-lg p-4 mb-6">
          <h4 className="font-semibold mb-2">What's Next?</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>✓ Confirmation email sent to {booking.email}</li>
            <li>✓ We'll contact you at {booking.phone} before your trip</li>
            <li>✓ Save your reference number for tracking</li>
          </ul>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="outline" onClick={copyReference}>
            <Copy className="w-4 h-4" /> Copy Reference
          </Button>
          <Link href="/">
            <Button onClick={onClose}>
              <Home className="w-4 h-4" /> Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </Modal>
  );
}

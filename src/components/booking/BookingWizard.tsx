'use client';

import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  MessageCircle, 
  Phone,
  Copy,
  CheckCircle,
  MapPin,
  Calendar,
  Clock,
  Users,
  Car,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { BookingFormData } from '@/types';
import { calculateFare, formatCurrency } from '@/lib/utils';
import { VEHICLES } from '@/config/vehicles';
import { SITE_CONFIG } from '@/config/site';
import { 
  generateBookingReference, 
  createBookingWhatsAppLink, 
  createCallLink,
  formatServiceType,
  formatVehicleType,
} from '@/lib/whatsapp';

const steps = [
  { id: 1, title: 'Service', description: 'Choose your service type' },
  { id: 2, title: 'Details', description: 'Trip details' },
  { id: 3, title: 'Contact', description: 'Your information' },
  { id: 4, title: 'Confirm', description: 'Book via WhatsApp or Call' },
];

export function BookingWizard() {
  const [step, setStep] = useState(1);
  const [bookingRef, setBookingRef] = useState('');
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState<Partial<BookingFormData>>({
    serviceType: 'local' as BookingFormData['serviceType'],
    vehicleType: 'sedan' as BookingFormData['vehicleType'],
    tripType: 'one-way' as BookingFormData['tripType'],
    recurring: false,
    passengers: 1,
    luggage: 0,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const updateField = (field: keyof BookingFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (step === 2) {
      if (!formData.pickupAddress) newErrors.pickupAddress = 'Pickup address is required';
      if (!formData.dropAddress) newErrors.dropAddress = 'Drop address is required';
      if (!formData.date) newErrors.date = 'Date is required';
      if (!formData.time) newErrors.time = 'Time is required';
    }
    
    if (step === 3) {
      if (!formData.name || formData.name.length < 2) newErrors.name = 'Name is required';
      if (!formData.phone || !/^(\+91)?[6-9]\d{9}$/.test(formData.phone.replace(/\s/g, ''))) {
        newErrors.phone = 'Valid Indian phone number is required';
      }
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Enter a valid email address';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (step === 3) {
        // Generate booking reference before final step
        setBookingRef(generateBookingReference());
      }
      setStep(step + 1);
    }
  };

  const estimatedFare = calculateFare(15, formData.vehicleType!, formData.tripType!);

  const whatsappLink = bookingRef 
    ? createBookingWhatsAppLink(formData as BookingFormData, bookingRef)
    : '';

  const copyReference = () => {
    navigator.clipboard.writeText(bookingRef);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Book Your Ride</h1>
      <p className="text-center text-gray-600 mb-8">
        Fill in the details and complete your booking via WhatsApp or Call
      </p>
      
      {/* Progress Steps */}
      <nav aria-label="Booking progress" className="mb-8">
        <ol className="flex items-center justify-between">
          {steps.map((s, index) => (
            <li key={s.id} className="flex-1 relative">
              <div className="flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                    step > s.id
                      ? 'bg-green-500 text-white'
                      : step === s.id
                      ? 'bg-primary-600 text-white ring-4 ring-primary-100'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                  aria-current={step === s.id ? 'step' : undefined}
                >
                  {step > s.id ? <Check className="w-5 h-5" aria-hidden="true" /> : s.id}
                </div>
                <span className={`text-xs md:text-sm mt-2 text-center ${
                  step >= s.id ? 'text-primary-600 font-medium' : 'text-gray-500'
                }`}>
                  {s.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div 
                  className={`absolute top-5 left-1/2 w-full h-0.5 -z-10 ${
                    step > s.id ? 'bg-green-500' : 'bg-gray-200'
                  }`} 
                  aria-hidden="true"
                />
              )}
            </li>
          ))}
        </ol>
      </nav>
      
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
        {/* Step 1: Service Selection */}
        {step === 1 && (
          <div className="space-y-6" role="group" aria-labelledby="step1-heading">
            <h2 id="step1-heading" className="text-xl md:text-2xl font-bold mb-4">
              Select Service & Vehicle
            </h2>
            
            <Select
              label="Service Type"
              value={formData.serviceType}
              onChange={(e) => updateField('serviceType', e.target.value)}
              options={[
                { value: 'local', label: '🚗 Local Trips' },
                { value: 'outstation', label: '🛣️ Outstation' },
                { value: 'school', label: '🏫 School Pickups' },
                { value: 'office', label: '🏢 Office Shuttles' },
                { value: 'wedding', label: '💒 Weddings & Events' },
                { value: 'tour', label: '🗺️ Tours & Packages' },
              ]}
              required
            />
            
            <Select
              label="Vehicle Type"
              value={formData.vehicleType}
              onChange={(e) => updateField('vehicleType', e.target.value)}
              options={VEHICLES.map(v => ({
                value: v.type,
                label: `${v.name} (${v.capacity} passengers) - ${formatCurrency(v.baseRate)}/km`,
              }))}
              required
            />
            
            <Select
              label="Trip Type"
              value={formData.tripType}
              onChange={(e) => updateField('tripType', e.target.value)}
              options={[
                { value: 'one-way', label: 'One Way' },
                { value: 'round-trip', label: 'Round Trip' },
              ]}
              required
            />
            
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <input
                type="checkbox"
                id="recurring"
                checked={formData.recurring}
                onChange={(e) => updateField('recurring', e.target.checked)}
                className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
              />
              <label htmlFor="recurring" className="text-gray-700">
                This is a recurring/regular booking (daily, weekly, monthly)
              </label>
            </div>
          </div>
        )}
        
        {/* Step 2: Trip Details */}
        {step === 2 && (
          <div className="space-y-6" role="group" aria-labelledby="step2-heading">
            <h2 id="step2-heading" className="text-xl md:text-2xl font-bold mb-4">
              Trip Details
            </h2>
            
            <Input
              label="Pickup Address"
              placeholder="e.g., Salt Lake Sector V, Kolkata"
              value={formData.pickupAddress || ''}
              onChange={(e) => updateField('pickupAddress', e.target.value)}
              error={errors.pickupAddress}
              icon={MapPin}
              required
            />
            
            <Input
              label="Drop Address"
              placeholder="e.g., Howrah Station"
              value={formData.dropAddress || ''}
              onChange={(e) => updateField('dropAddress', e.target.value)}
              error={errors.dropAddress}
              icon={MapPin}
              required
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Date"
                type="date"
                value={formData.date || ''}
                onChange={(e) => updateField('date', e.target.value)}
                error={errors.date}
                icon={Calendar}
                min={new Date().toISOString().split('T')[0]}
                required
              />
              
              <Input
                label="Time"
                type="time"
                value={formData.time || ''}
                onChange={(e) => updateField('time', e.target.value)}
                error={errors.time}
                icon={Clock}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Number of Passengers"
                type="number"
                min={1}
                max={50}
                value={formData.passengers || 1}
                onChange={(e) => updateField('passengers', parseInt(e.target.value) || 1)}
                icon={Users}
              />
              
              <Input
                label="Luggage Bags"
                type="number"
                min={0}
                max={30}
                value={formData.luggage || 0}
                onChange={(e) => updateField('luggage', parseInt(e.target.value) || 0)}
              />
            </div>
          </div>
        )}
        
        {/* Step 3: Contact Information */}
        {step === 3 && (
          <div className="space-y-6" role="group" aria-labelledby="step3-heading">
            <h2 id="step3-heading" className="text-xl md:text-2xl font-bold mb-4">
              Your Information
            </h2>
            
            <Input
              label="Full Name"
              placeholder="Enter your name"
              value={formData.name || ''}
              onChange={(e) => updateField('name', e.target.value)}
              error={errors.name}
              required
            />
            
            <Input
              label="Phone Number"
              type="tel"
              placeholder="+91 98310 05736"
              value={formData.phone || ''}
              onChange={(e) => updateField('phone', e.target.value)}
              error={errors.phone}
              helperText="We'll contact you on this number"
              required
            />
            
            <Input
              label="Email Address"
              type="email"
              placeholder="your@email.com (optional)"
              value={formData.email || ''}
              onChange={(e) => updateField('email', e.target.value)}
              error={errors.email}
            />
            
            {formData.serviceType === 'office' && (
              <>
                <Input
                  label="Company Name"
                  placeholder="Your company name (optional)"
                  value={formData.companyName || ''}
                  onChange={(e) => updateField('companyName', e.target.value)}
                />
                
                <Input
                  label="Employee ID"
                  placeholder="Your employee ID (optional)"
                  value={formData.employeeId || ''}
                  onChange={(e) => updateField('employeeId', e.target.value)}
                />
              </>
            )}
            
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea
                id="notes"
                placeholder="Any special requests or instructions..."
                value={formData.notes || ''}
                onChange={(e) => updateField('notes', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                rows={3}
              />
            </div>
          </div>
        )}
        
        {/* Step 4: Confirmation & WhatsApp/Call */}
        {step === 4 && (
          <div className="space-y-6" role="group" aria-labelledby="step4-heading">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" aria-hidden="true" />
              </div>
              <h2 id="step4-heading" className="text-xl md:text-2xl font-bold mb-2">
                Almost Done!
              </h2>
              <p className="text-gray-600">
                Review your booking and complete via WhatsApp or Call
              </p>
            </div>

            {/* Booking Reference */}
            <div className="bg-primary-50 rounded-xl p-4 text-center">
              <p className="text-sm text-primary-700 mb-1">Your Booking Reference</p>
              <div className="flex items-center justify-center gap-2">
                <code className="text-2xl font-bold text-primary-800 tracking-wider">
                  {bookingRef}
                </code>
                <button
                  onClick={copyReference}
                  className="p-2 hover:bg-primary-100 rounded-lg transition-colors"
                  aria-label="Copy reference"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-green-600" />
                  ) : (
                    <Copy className="w-5 h-5 text-primary-600" />
                  )}
                </button>
              </div>
              <p className="text-xs text-primary-600 mt-1">
                Keep this reference for tracking your booking
              </p>
            </div>
            
            {/* Booking Summary */}
            <div className="bg-gray-50 rounded-xl p-5 space-y-3">
              <h3 className="font-semibold text-gray-900 mb-3">Booking Summary</h3>
              
              <div className="flex items-start gap-3 py-2 border-b border-gray-200">
                <Car className="w-5 h-5 text-gray-400 mt-0.5" aria-hidden="true" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Service & Vehicle</p>
                  <p className="font-medium">
                    {formatServiceType(formData.serviceType!)} • {formatVehicleType(formData.vehicleType!)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 py-2 border-b border-gray-200">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" aria-hidden="true" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Route</p>
                  <p className="font-medium">{formData.pickupAddress}</p>
                  <p className="text-sm text-gray-600">→ {formData.dropAddress}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 py-2 border-b border-gray-200">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5" aria-hidden="true" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Date & Time</p>
                  <p className="font-medium">{formData.date} at {formData.time}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 py-2 border-b border-gray-200">
                <Users className="w-5 h-5 text-gray-400 mt-0.5" aria-hidden="true" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Passengers</p>
                  <p className="font-medium">{formData.passengers} passengers, {formData.luggage} bags</p>
                </div>
              </div>
              
              <div className="flex justify-between py-3 text-lg">
                <span className="font-bold">Estimated Fare</span>
                <span className="font-bold text-primary-600">{formatCurrency(estimatedFare)}</span>
              </div>
              
              <p className="text-xs text-gray-500">
                * Final fare may vary based on actual distance and waiting time
              </p>
            </div>

            {/* Action Buttons - WhatsApp & Call */}
            <div className="space-y-3">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-[#25D366] text-white rounded-xl font-semibold text-lg hover:bg-[#20BD5A] transition-colors shadow-lg shadow-green-500/25"
              >
                <MessageCircle className="w-6 h-6" aria-hidden="true" />
                Complete Booking via WhatsApp
              </a>
              
              <a
                href={createCallLink()}
                className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25"
              >
                <Phone className="w-6 h-6" aria-hidden="true" />
                Call {SITE_CONFIG.phone}
              </a>
            </div>
            
            <p className="text-sm text-gray-500 text-center">
              By completing this booking, you agree to our{' '}
              <a href="/terms" className="text-primary-600 hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="/privacy" className="text-primary-600 hover:underline">Privacy Policy</a>.
            </p>
          </div>
        )}
        
        {/* Navigation Buttons */}
        <div className="mt-8 flex items-center justify-between">
          {step > 1 && step < 4 ? (
            <Button variant="outline" onClick={() => setStep(step - 1)}>
              <ChevronLeft className="w-4 h-4" aria-hidden="true" /> Back
            </Button>
          ) : step === 4 ? (
            <Button variant="ghost" onClick={() => setStep(1)}>
              Start New Booking
            </Button>
          ) : (
            <div />
          )}
          
          {step < 4 && (
            <Button onClick={handleNext}>
              {step === 3 ? 'Review Booking' : 'Next'} <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * WhatsApp & Call Utilities
 * 
 * These utilities handle booking via WhatsApp deep links and phone calls.
 * This is the primary booking method - no database required.
 */

import { format } from 'date-fns';
import { SITE_CONFIG, WHATSAPP_TEMPLATES } from '@/config/site';
import { BookingFormData } from '@/types';

/**
 * Generate a unique booking reference
 * Format: JT-YYYYMMDD-XXXX (e.g., JT-20241129-A3F7)
 */
export function generateBookingReference(): string {
  const date = format(new Date(), 'yyyyMMdd');
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `JT-${date}-${random}`;
}

/**
 * Format phone number for WhatsApp link
 * Removes all non-digit characters except leading +
 */
export function formatPhoneForWhatsApp(phone: string): string {
  // Remove all non-digits
  const digits = phone.replace(/\D/g, '');
  // Ensure it starts with country code
  return digits.startsWith('91') ? digits : `91${digits}`;
}

/**
 * Create WhatsApp deep link URL
 * Works on both mobile and desktop
 */
export function createWhatsAppLink(message: string, phone?: string): string {
  const whatsappNumber = phone || SITE_CONFIG.whatsapp;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
}

/**
 * Create tel: link for click-to-call
 */
export function createCallLink(phone?: string): string {
  const phoneNumber = phone || SITE_CONFIG.phoneClean;
  return `tel:+${phoneNumber}`;
}

/**
 * Format service type for display
 */
export function formatServiceType(type: string): string {
  const serviceNames: Record<string, string> = {
    local: 'Local Trip',
    outstation: 'Outstation Trip',
    school: 'School Pickup/Drop',
    office: 'Office Shuttle',
    wedding: 'Wedding/Event',
    tour: 'Tour Package',
  };
  return serviceNames[type] || type;
}

/**
 * Format vehicle type for display
 */
export function formatVehicleType(type: string): string {
  const vehicleNames: Record<string, string> = {
    sedan: 'Sedan (4 seater)',
    suv: 'SUV (7 seater)',
    tempo: 'Tempo Traveller (12-17 seater)',
    minibus: 'Mini Bus (20-40 seater)',
  };
  return vehicleNames[type] || type;
}

/**
 * Create booking WhatsApp message and link
 */
export function createBookingWhatsAppLink(
  formData: BookingFormData,
  reference: string
): string {
  const message = WHATSAPP_TEMPLATES.booking({
    reference,
    service: formatServiceType(formData.serviceType),
    vehicle: formatVehicleType(formData.vehicleType),
    pickup: formData.pickupAddress,
    drop: formData.dropAddress,
    date: formData.date,
    time: formData.time,
    passengers: formData.passengers,
    name: formData.name,
    phone: formData.phone,
  });
  
  return createWhatsAppLink(message);
}

/**
 * Create quick inquiry WhatsApp link
 */
export function createQuickWhatsAppLink(): string {
  const message = WHATSAPP_TEMPLATES.quickBooking();
  return createWhatsAppLink(message);
}

/**
 * Create contact inquiry WhatsApp link
 */
export function createContactWhatsAppLink(name: string, message: string): string {
  const fullMessage = WHATSAPP_TEMPLATES.inquiry(name, message);
  return createWhatsAppLink(fullMessage);
}

/**
 * Open WhatsApp in new tab/app
 */
export function openWhatsApp(message: string): void {
  const url = createWhatsAppLink(message);
  window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Initiate phone call
 */
export function initiateCall(): void {
  window.location.href = createCallLink();
}

/**
 * Check if device is mobile
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

/**
 * Format booking summary for display
 */
export function formatBookingSummary(formData: BookingFormData): string {
  return [
    `Service: ${formatServiceType(formData.serviceType)}`,
    `Vehicle: ${formatVehicleType(formData.vehicleType)}`,
    `From: ${formData.pickupAddress}`,
    `To: ${formData.dropAddress}`,
    `Date: ${formData.date}`,
    `Time: ${formData.time}`,
    `Passengers: ${formData.passengers}`,
  ].join('\n');
}

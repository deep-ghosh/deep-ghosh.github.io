import { z } from 'zod';

export const bookingSchema = z.object({
  serviceType: z.enum(['school', 'office', 'wedding', 'tour']),
  vehicleType: z.enum(['sedan', 'suv', 'tempo', 'bus']),
  tripType: z.enum(['oneway', 'roundtrip']),
  recurring: z.boolean().optional().default(false),
  pickupAddress: z.string().min(5, 'Pickup address is required'),
  dropAddress: z.string().min(5, 'Drop address is required'),
  pickupLat: z.number().optional(),
  pickupLng: z.number().optional(),
  dropLat: z.number().optional(),
  dropLng: z.number().optional(),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  passengers: z.number().min(1, 'At least 1 passenger required').max(50, 'Maximum 50 passengers'),
  luggage: z.number().min(0).max(30).default(0),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^(\+91)?[6-9]\d{9}$/, 'Please enter a valid Indian phone number'),
  email: z.string().email('Please enter a valid email address'),
  companyName: z.string().optional(),
  employeeId: z.string().optional(),
  notes: z.string().max(500, 'Notes cannot exceed 500 characters').optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^(\+91)?[6-9]\d{9}$/, 'Please enter a valid Indian phone number'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message cannot exceed 1000 characters'),
});

export type BookingFormSchema = z.infer<typeof bookingSchema>;
export type ContactFormSchema = z.infer<typeof contactSchema>;

export function validatePhoneNumber(phone: string): boolean {
  const phoneRegex = /^(\+91)?[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[<>]/g, ''); // Remove angle brackets
}

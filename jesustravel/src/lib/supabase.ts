/**
 * =============================================================================
 * SUPABASE DATABASE - CURRENTLY DISABLED
 * =============================================================================
 * 
 * This file contains all database-related code that is currently DISABLED.
 * The website operates in UI-first mode with WhatsApp/Call booking.
 * 
 * TO ENABLE DATABASE FUNCTIONALITY:
 * 
 * 1. Create a Supabase project at https://supabase.com
 * 
 * 2. Run the migration in supabase/migrations/001_initial_schema.sql
 * 
 * 3. Add these environment variables to .env.local (NEVER commit these!):
 *    - NEXT_PUBLIC_SUPABASE_URL=your-project-url
 *    - NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
 *    - SUPABASE_SERVICE_ROLE_KEY=your-service-key (server-side only!)
 * 
 * 4. Uncomment the code below and update API routes to use saveBooking()
 * 
 * SECURITY NOTES:
 * - NEVER use service_role key on the client side
 * - All database writes should go through server-side API routes
 * - Use Row Level Security (RLS) in Supabase for additional protection
 * 
 * =============================================================================
 */

import { Booking } from '@/types';

// =============================================================================
// SUPABASE CLIENT CODE - COMMENTED OUT
// =============================================================================

/*
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// Client for browser usage (read-only operations)
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

// Admin client for server-side operations (API routes only!)
// WARNING: Never expose this to the client
export const supabaseAdmin = isSupabaseConfigured && supabaseServiceKey
  ? createClient(supabaseUrl!, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null;

// Example: Save booking to Supabase (use in API route only)
export async function saveBookingToSupabase(booking: Booking): Promise<Booking | null> {
  if (!supabaseAdmin) {
    console.warn('[DB] Supabase not configured');
    return null;
  }
  
  const { data, error } = await supabaseAdmin
    .from('bookings')
    .insert({
      reference: booking.reference,
      service_type: booking.serviceType,
      vehicle_type: booking.vehicleType,
      trip_type: booking.tripType,
      pickup_address: booking.pickupAddress,
      drop_address: booking.dropAddress,
      booking_date: booking.date,
      booking_time: booking.time,
      passengers: booking.passengers,
      customer_name: booking.name,
      customer_phone: booking.phone,
      customer_email: booking.email,
      notes: booking.notes,
      estimated_fare: booking.estimatedFare,
      status: 'pending',
    })
    .select()
    .single();
  
  if (error) {
    console.error('[DB] Error saving booking:', error);
    return null;
  }
  
  return data;
}

// Example: Get all bookings (use in API route only)
export async function getBookingsFromSupabase(): Promise<Booking[]> {
  if (!supabaseAdmin) return [];
  
  const { data, error } = await supabaseAdmin
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('[DB] Error fetching bookings:', error);
    return [];
  }
  
  return data || [];
}
*/

// =============================================================================
// PLACEHOLDER EXPORTS - Database functionality disabled
// =============================================================================

export const isSupabaseConfigured = false;
export const supabase = null;
export const supabaseAdmin = null;

/**
 * Placeholder function - Database writes are disabled
 * Bookings are handled via WhatsApp/Call
 */
export async function saveBooking(_booking: Booking): Promise<null> {
  console.log('[DB] Database writes disabled - using WhatsApp/Call booking');
  return null;
}

/**
 * Placeholder function - Returns empty array
 * Enable Supabase code above to fetch real bookings
 */
export async function getBookings(): Promise<Booking[]> {
  console.log('[DB] Database reads disabled');
  return [];
}

/**
 * Demo bookings for admin preview (static data)
 * Replace with real database queries when Supabase is enabled
 */
export const DEMO_BOOKINGS: Booking[] = [
  {
    id: 'demo-1',
    reference: 'JT-20241129-0001',
    serviceType: 'local',
    vehicleType: 'sedan',
    tripType: 'one-way',
    recurring: false,
    pickupAddress: 'Salt Lake Sector V, Kolkata',
    dropAddress: 'Howrah Station',
    date: '2024-11-30',
    time: '09:00',
    passengers: 2,
    luggage: 1,
    name: 'Demo Customer',
    phone: '+919876543210',
    email: 'demo@example.com',
    estimatedFare: 450,
    status: 'pending',
    paymentStatus: 'pending',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'demo-2',
    reference: 'JT-20241128-0002',
    serviceType: 'school',
    vehicleType: 'suv',
    tripType: 'round-trip',
    recurring: true,
    pickupAddress: 'Newtown Action Area 1',
    dropAddress: 'DPS Megacity',
    date: '2024-11-28',
    time: '07:30',
    passengers: 3,
    luggage: 0,
    name: 'Parent Demo',
    phone: '+919876543211',
    email: 'parent@example.com',
    estimatedFare: 3500,
    status: 'confirmed',
    paymentStatus: 'pending',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];


/**
 * =============================================================================
 * BOOKING API - CURRENTLY DISABLED
 * =============================================================================
 * 
 * This endpoint is disabled because bookings are handled via WhatsApp/Call.
 * 
 * TO ENABLE DATABASE BOOKING:
 * 1. Configure Supabase in .env.local (see lib/supabase.ts)
 * 2. Uncomment the database code below
 * 3. Update the BookingWizard to submit to this endpoint
 * 4. Test thoroughly before going live
 * 
 * =============================================================================
 */

import { NextRequest, NextResponse } from 'next/server';

// Response for disabled endpoint
const DISABLED_RESPONSE = {
  success: false,
  error: 'Booking API is currently disabled',
  message: 'Bookings are handled via WhatsApp and Phone. Please use the booking form on our website.',
  whatsapp: 'https://wa.me/919831005736',
  phone: '+919831005736',
};

export async function POST(_req: NextRequest) {
  // Return 501 Not Implemented with helpful message
  return NextResponse.json(DISABLED_RESPONSE, { status: 501 });
}

export async function GET(_req: NextRequest) {
  return NextResponse.json(DISABLED_RESPONSE, { status: 501 });
}

/*
// =============================================================================
// ORIGINAL DATABASE CODE - UNCOMMENT TO ENABLE
// =============================================================================

import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { bookingSchema } from '@/lib/validation';
import { generateBookingRef } from '@/lib/utils';
import { rateLimit } from '@/lib/rate-limit';
import { Booking } from '@/types';

export async function POST(req: NextRequest) {
  // Rate limiting
  const ip = req.headers.get('x-forwarded-for') || 'unknown';
  const rateLimitResult = rateLimit(ip, 5, 60000);
  
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { success: false, error: 'Too many requests' },
      { status: 429 }
    );
  }
  
  try {
    const body = await req.json();
    
    // Validate input
    const validationResult = bookingSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: validationResult.error.errors },
        { status: 400 }
      );
    }
    
    const data = validationResult.data;
    const reference = generateBookingRef();
    
    if (!isSupabaseConfigured || !supabaseAdmin) {
      return NextResponse.json(
        { success: false, error: 'Database not configured' },
        { status: 503 }
      );
    }
    
    const { data: inserted, error } = await supabaseAdmin
      .from('bookings')
      .insert({
        reference,
        service_type: data.serviceType,
        vehicle_type: data.vehicleType,
        // ... rest of fields
      })
      .select()
      .single();
    
    if (error) throw error;
    
    return NextResponse.json({
      success: true,
      data: inserted,
    });
    
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
*/


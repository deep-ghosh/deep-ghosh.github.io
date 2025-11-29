import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { supabaseAdmin, isSupabaseConfigured, localGetBookings } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    let bookings;

    if (isSupabaseConfigured && supabaseAdmin) {
      const { data } = await supabaseAdmin
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });
      bookings = data || [];
    } else {
      bookings = await localGetBookings();
    }

    // Convert to CSV
    const headers = [
      'Reference',
      'Customer Name',
      'Phone',
      'Email',
      'Service Type',
      'Vehicle Type',
      'Pickup Address',
      'Drop Address',
      'Date',
      'Time',
      'Passengers',
      'Estimated Fare',
      'Status',
      'Created At',
    ];

    const rows = bookings.map((b: any) => [
      b.reference || b.id,
      b.customer_name || b.name,
      b.customer_phone || b.phone,
      b.customer_email || b.email,
      b.service_type || b.serviceType,
      b.vehicle_type || b.vehicleType,
      b.pickup_address || b.pickupAddress,
      b.drop_address || b.dropAddress,
      b.booking_date || b.date,
      b.booking_time || b.time,
      b.passengers,
      b.estimated_fare || b.estimatedFare,
      b.status,
      b.created_at || b.createdAt,
    ]);

    const csv = [headers.join(',')]
      .concat(rows.map(row => row.map(cell => `"${cell || ''}"`).join(',')))
      .join('\n');

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="bookings_${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json(
      { success: false, error: 'Export failed' },
      { status: 500 }
    );
  }
}

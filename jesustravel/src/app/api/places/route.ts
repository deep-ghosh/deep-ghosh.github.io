import { NextRequest, NextResponse } from 'next/server';
import { searchPlaces } from '@/lib/places';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const input = searchParams.get('input');
  
  if (!input || input.length < 3) {
    return NextResponse.json(
      { success: false, error: 'Input must be at least 3 characters' },
      { status: 400 }
    );
  }
  
  try {
    const results = await searchPlaces(input);
    return NextResponse.json({
      success: true,
      data: results,
    });
  } catch (error) {
    console.error('Places API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to search places' },
      { status: 500 }
    );
  }
}

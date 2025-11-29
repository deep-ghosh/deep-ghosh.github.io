import { PlaceResult } from '@/types';

const googleApiKey = process.env.GOOGLE_PLACES_API_KEY;

export const isGooglePlacesConfigured = Boolean(googleApiKey);

// Google Places Autocomplete
export async function searchPlacesGoogle(input: string): Promise<PlaceResult[]> {
  if (!googleApiKey) {
    throw new Error('Google Places API not configured');
  }
  
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${googleApiKey}&components=country:in`
  );
  
  const data = await response.json();
  
  if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
    throw new Error(`Google Places API error: ${data.status}`);
  }
  
  if (data.status === 'ZERO_RESULTS') {
    return [];
  }
  
  return data.predictions.map((pred: any) => ({
    description: pred.description,
    placeId: pred.place_id,
  }));
}

// Nominatim (OpenStreetMap) fallback - free, no API key needed
export async function searchPlacesNominatim(input: string): Promise<PlaceResult[]> {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(input)}&countrycodes=in&limit=5`,
    {
      headers: {
        'User-Agent': 'JesusTravel/1.0',
      },
    }
  );
  
  const data = await response.json();
  
  return data.map((place: any) => ({
    description: place.display_name,
    placeId: place.place_id.toString(),
    lat: parseFloat(place.lat),
    lng: parseFloat(place.lon),
  }));
}

// Main search function - uses Google if available, otherwise Nominatim
export async function searchPlaces(input: string): Promise<PlaceResult[]> {
  if (isGooglePlacesConfigured) {
    return searchPlacesGoogle(input);
  }
  return searchPlacesNominatim(input);
}

// Get place details (coordinates)
export async function getPlaceDetails(placeId: string): Promise<{ lat: number; lng: number } | null> {
  if (!googleApiKey) {
    return null; // Nominatim already provides coordinates
  }
  
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=geometry&key=${googleApiKey}`
  );
  
  const data = await response.json();
  
  if (data.status !== 'OK') {
    return null;
  }
  
  return {
    lat: data.result.geometry.location.lat,
    lng: data.result.geometry.location.lng,
  };
}

// Calculate distance between two points (Haversine formula)
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

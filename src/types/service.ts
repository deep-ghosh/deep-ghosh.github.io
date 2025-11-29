export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  pricing: string;
  features: string[];
}

export interface ContactMessage {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export interface PlaceResult {
  description: string;
  placeId: string;
  lat?: number;
  lng?: number;
}

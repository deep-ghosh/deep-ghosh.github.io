// Booking types
export interface Booking {
  id: string;
  reference: string;
  serviceType: ServiceType;
  vehicleType: VehicleType;
  tripType: TripType;
  recurring: boolean;
  pickupAddress: string;
  dropAddress: string;
  pickupLat?: number;
  pickupLng?: number;
  dropLat?: number;
  dropLng?: number;
  date: string;
  time: string;
  passengers: number;
  luggage: number;
  name: string;
  phone: string;
  email: string;
  companyName?: string;
  employeeId?: string;
  notes?: string;
  estimatedFare: number;
  finalFare?: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
  updatedAt?: string;
}

export interface BookingFormData {
  serviceType: ServiceType;
  vehicleType: VehicleType;
  tripType: TripType;
  recurring: boolean;
  pickupAddress: string;
  dropAddress: string;
  pickupLat?: number;
  pickupLng?: number;
  dropLat?: number;
  dropLng?: number;
  date: string;
  time: string;
  passengers: number;
  luggage: number;
  name: string;
  phone: string;
  email: string;
  companyName?: string;
  employeeId?: string;
  notes?: string;
}

export type ServiceType = 'school' | 'office' | 'wedding' | 'tour';
export type VehicleType = 'sedan' | 'suv' | 'tempo' | 'bus';
export type TripType = 'oneway' | 'roundtrip';
export type BookingStatus = 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
export type PaymentStatus = 'pending' | 'partial' | 'paid' | 'refunded';

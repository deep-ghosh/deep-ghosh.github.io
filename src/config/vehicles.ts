import { Vehicle } from '@/types';

export const VEHICLES: Vehicle[] = [
  {
    id: 'sedan',
    type: 'sedan',
    name: 'Sedan',
    capacity: 4,
    luggageCapacity: 2,
    baseRate: 500,
    perKmRate: 12,
    description: 'Comfortable sedan for small groups and city travel',
    features: ['AC', 'Music System', 'Comfortable Seating', 'Boot Space'],
  },
  {
    id: 'suv',
    type: 'suv',
    name: 'SUV',
    capacity: 6,
    luggageCapacity: 4,
    baseRate: 800,
    perKmRate: 16,
    description: 'Spacious SUV for families and groups',
    features: ['AC', 'Music System', 'Extra Legroom', 'Large Boot', 'USB Charging'],
  },
  {
    id: 'tempo',
    type: 'tempo',
    name: 'Tempo Traveller',
    capacity: 12,
    luggageCapacity: 8,
    baseRate: 1500,
    perKmRate: 22,
    description: 'Perfect for medium groups and tours',
    features: ['AC', 'Push-back Seats', 'Music System', 'Ample Luggage Space', 'First Aid Kit'],
  },
  {
    id: 'bus',
    type: 'bus',
    name: 'Mini Bus',
    capacity: 25,
    luggageCapacity: 20,
    baseRate: 3000,
    perKmRate: 35,
    description: 'Ideal for large groups and corporate events',
    features: ['AC', 'Reclining Seats', 'Entertainment System', 'Large Storage', 'Microphone'],
  },
];

export function getVehicleByType(type: string): Vehicle | undefined {
  return VEHICLES.find(v => v.type === type);
}

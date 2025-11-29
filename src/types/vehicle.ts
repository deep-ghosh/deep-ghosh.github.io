export interface Vehicle {
  id: string;
  type: VehicleType;
  name: string;
  capacity: number;
  luggageCapacity: number;
  baseRate: number;
  perKmRate: number;
  description: string;
  features: string[];
  image?: string;
}

import { VehicleType } from './booking';

import { Service } from '@/types';

export const SERVICES_CONFIG: Service[] = [
  {
    id: 'school',
    name: 'School Pickups',
    description: 'Safe and reliable daily transportation for students. Our experienced drivers ensure your children reach school on time, every day.',
    icon: '🏫',
    pricing: 'From ₹3,000/month',
    features: [
      'Verified and trained drivers',
      'Real-time GPS tracking',
      'Daily pickup and drop service',
      'Parent notification system',
      'AC and non-AC options',
      'Flexible timing',
    ],
  },
  {
    id: 'office',
    name: 'Office Shuttles',
    description: 'Corporate commute solutions designed for modern businesses. Keep your team productive with reliable transportation.',
    icon: '🏢',
    pricing: 'From ₹5,000/month',
    features: [
      'Multiple pickup points',
      'Air-conditioned vehicles',
      'Punctual and professional service',
      'Corporate billing options',
      'Route optimization',
      'Employee tracking portal',
    ],
  },
  {
    id: 'wedding',
    name: 'Weddings & Events',
    description: 'Make your special occasions unforgettable with our premium fleet of decorated vehicles.',
    icon: '💒',
    pricing: 'From ₹8,000/day',
    features: [
      'Beautifully decorated vehicles',
      'Professional uniformed chauffeurs',
      'Multiple car packages',
      'Flexible rental hours',
      'VIP service available',
      'Custom decoration options',
    ],
  },
  {
    id: 'tour',
    name: 'Tours & Outstation',
    description: 'Explore Kolkata and beyond with our comfortable tour packages. From airport transfers to long-distance travel.',
    icon: '🗺️',
    pricing: 'From ₹15/km',
    features: [
      'City sightseeing tours',
      'Outstation trip packages',
      'Airport transfers',
      'Pilgrimage tours',
      'Weekend getaways',
      'Custom itineraries',
    ],
  },
];

/**
 * Site Configuration
 * 
 * UPDATE THESE VALUES for your deployment:
 * - phone: Your business phone number (with country code)
 * - whatsapp: WhatsApp number (digits only, with country code)
 * - email: Your business email
 */
export const SITE_CONFIG = {
  name: 'Jesus Travel',
  tagline: 'Reliable Rides from Newtown, Kolkata',
  description: 'Safe, punctual, and professional vehicle services for schools, offices, weddings, and tours across Kolkata',
  domain: 'jesustravel.me',
  url: 'https://jesustravel.me',
  
  // CONTACT INFO - Update these for your business
  phone: '+919831005736',        // Display format with +
  phone2: '+917595025030',       // Alternate phone number
  phoneClean: '919831005736',    // For tel: links (no + or spaces)
  phoneClean2: '917595025030',   // Alternate phone clean
  whatsapp: '919831005736',      // WhatsApp number (digits only)
  email: 'jesustravel.me@gmail.com',
  adminEmail: 'jesustravel.me@gmail.com',
  
  // Location
  address: 'Newtown, Action Area 1, Kolkata - 700156',
  city: 'Kolkata',
  state: 'West Bengal',
  country: 'India',
  
  // Operating hours
  hours: '24/7 Available',
  
  // Social links (optional)
  social: {
    facebook: '',
    instagram: '',
    twitter: '',
  },
};

/**
 * WhatsApp Message Templates
 * These are used to generate prefilled WhatsApp messages
 */
export const WHATSAPP_TEMPLATES = {
  booking: (details: {
    reference: string;
    service: string;
    vehicle: string;
    pickup: string;
    drop: string;
    date: string;
    time: string;
    passengers: number;
    name: string;
    phone: string;
  }) => `🚗 *New Booking Request*

📋 *Reference:* ${details.reference}

*Service Details:*
• Type: ${details.service}
• Vehicle: ${details.vehicle}
• Passengers: ${details.passengers}

*Journey:*
📍 From: ${details.pickup}
📍 To: ${details.drop}
📅 Date: ${details.date}
⏰ Time: ${details.time}

*Customer:*
👤 ${details.name}
📞 ${details.phone}

Please confirm availability and fare. Thank you!`,

  inquiry: (name: string, message: string) => 
    `Hi, I'm ${name}. ${message}`,
    
  quickBooking: () => 
    `Hi, I'd like to book a vehicle. Please share availability.`,
};

export const SERVICES = [
  {
    id: 'school',
    name: 'School Pickups',
    description: 'Safe and reliable daily transportation for students',
    icon: '🏫',
    pricing: 'From ₹3,000/month',
    features: ['Verified drivers', 'GPS tracking', 'Daily pickup/drop', 'Parent notifications'],
  },
  {
    id: 'office',
    name: 'Office Shuttles',
    description: 'Corporate commute solutions for your team',
    icon: '🏢',
    pricing: 'From ₹5,000/month',
    features: ['Multiple pickup points', 'AC vehicles', 'Punctual service', 'Corporate billing'],
  },
  {
    id: 'wedding',
    name: 'Weddings & Events',
    description: 'Make your special day memorable with our fleet',
    icon: '💒',
    pricing: 'From ₹8,000/day',
    features: ['Decorated vehicles', 'Professional chauffeurs', 'Multiple cars', 'Flexible hours'],
  },
  {
    id: 'tour',
    name: 'Tours & Outstation',
    description: 'Explore the city and beyond with comfort',
    icon: '🗺️',
    pricing: 'From ₹15/km',
    features: ['City tours', 'Outstation trips', 'Airport transfers', 'Flexible packages'],
  },
];

export const TESTIMONIALS = [
  {
    name: 'Priya Sharma',
    role: 'Parent, DPS Newtown',
    text: 'Jesus Travel has been fantastic for my children\'s school pickup. Always on time and very safe!',
    rating: 5,
  },
  {
    name: 'Rajesh Kumar',
    role: 'HR Manager, TCS',
    text: 'We\'ve been using their office shuttle service for 2 years. Excellent reliability and professional drivers.',
    rating: 5,
  },
  {
    name: 'Anita Banerjee',
    role: 'Event Planner',
    text: 'Used their services for multiple weddings. The decorated cars and punctual service impressed all our clients.',
    rating: 5,
  },
  {
    name: 'Sanjay Ghosh',
    role: 'Tour Organizer',
    text: 'Best tour vehicle service in Kolkata! Comfortable rides and very reasonable rates.',
    rating: 4,
  },
];

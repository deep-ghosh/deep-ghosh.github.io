export interface FAQ {
  question: string;
  answer: string;
  category: string;
}

export const FAQS: FAQ[] = [
  {
    question: 'How do I book a ride?',
    answer: 'You can book a ride through our online booking form, by calling us at +919831005736, or by sending a WhatsApp message. We recommend booking at least 24 hours in advance for guaranteed availability.',
    category: 'Booking',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept cash, UPI (Google Pay, PhonePe, Paytm), bank transfer, and major credit/debit cards. For corporate clients, we also offer monthly billing.',
    category: 'Payment',
  },
  {
    question: 'Can I cancel or modify my booking?',
    answer: 'Yes, you can cancel or modify your booking up to 4 hours before the scheduled pickup time. Cancellations made less than 4 hours before may incur a cancellation fee.',
    category: 'Booking',
  },
  {
    question: 'Are your drivers verified?',
    answer: 'Yes, all our drivers undergo thorough background checks, have valid commercial licenses, and receive regular training. Your safety is our top priority.',
    category: 'Safety',
  },
  {
    question: 'Do you provide GPS tracking?',
    answer: 'Yes, all our vehicles are equipped with GPS tracking. For school and office services, we provide a tracking link so you can monitor the vehicle in real-time.',
    category: 'Safety',
  },
  {
    question: 'What areas do you serve?',
    answer: 'We primarily serve Newtown, Salt Lake, Rajarhat, and the greater Kolkata area. For outstation trips, we cover all of West Bengal and neighboring states.',
    category: 'Service',
  },
  {
    question: 'Do you offer monthly packages?',
    answer: 'Yes, we offer attractive monthly packages for school pickups and office shuttles. Contact us for customized quotes based on your requirements.',
    category: 'Pricing',
  },
  {
    question: 'What happens if the vehicle breaks down?',
    answer: 'In the rare event of a breakdown, we immediately dispatch a replacement vehicle at no extra cost. Our 24/7 support team ensures minimal disruption to your travel.',
    category: 'Service',
  },
  {
    question: 'Can I request a specific driver?',
    answer: 'For regular services like school pickups and office shuttles, we try to assign the same driver for consistency. Specific driver requests are subject to availability.',
    category: 'Service',
  },
  {
    question: 'Do you provide child seats?',
    answer: 'Yes, we can provide child seats and booster seats upon request. Please mention this requirement while booking.',
    category: 'Safety',
  },
];

export function getFAQsByCategory(category: string): FAQ[] {
  return FAQS.filter(faq => faq.category === category);
}

export function getFAQCategories(): string[] {
  return [...new Set(FAQS.map(faq => faq.category))];
}

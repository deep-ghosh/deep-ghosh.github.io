import { bookingSchema, contactSchema } from '@/lib/validation';

describe('Validation Schemas', () => {
  describe('bookingSchema', () => {
    const validBookingData = {
      serviceType: 'local',
      vehicleType: 'sedan',
      tripType: 'one-way',
      recurring: false,
      pickupAddress: '123 Test Street, Kolkata',
      dropAddress: '456 Destination Road, Kolkata',
      date: '2024-12-25',
      time: '10:00',
      passengers: 2,
      luggage: 1,
      name: 'John Doe',
      phone: '+919876543210',
      email: 'john@example.com',
    };

    it('should validate correct booking data', () => {
      const result = bookingSchema.safeParse(validBookingData);
      expect(result.success).toBe(true);
    });

    it('should reject invalid service type', () => {
      const result = bookingSchema.safeParse({
        ...validBookingData,
        serviceType: 'invalid',
      });
      expect(result.success).toBe(false);
    });

    it('should reject invalid vehicle type', () => {
      const result = bookingSchema.safeParse({
        ...validBookingData,
        vehicleType: 'invalid',
      });
      expect(result.success).toBe(false);
    });

    it('should reject empty pickup address', () => {
      const result = bookingSchema.safeParse({
        ...validBookingData,
        pickupAddress: '',
      });
      expect(result.success).toBe(false);
    });

    it('should reject empty drop address', () => {
      const result = bookingSchema.safeParse({
        ...validBookingData,
        dropAddress: '',
      });
      expect(result.success).toBe(false);
    });

    it('should reject invalid phone number', () => {
      const result = bookingSchema.safeParse({
        ...validBookingData,
        phone: '123',
      });
      expect(result.success).toBe(false);
    });

    it('should reject invalid email', () => {
      const result = bookingSchema.safeParse({
        ...validBookingData,
        email: 'invalid-email',
      });
      expect(result.success).toBe(false);
    });

    it('should reject passengers less than 1', () => {
      const result = bookingSchema.safeParse({
        ...validBookingData,
        passengers: 0,
      });
      expect(result.success).toBe(false);
    });

    it('should reject passengers more than 50', () => {
      const result = bookingSchema.safeParse({
        ...validBookingData,
        passengers: 51,
      });
      expect(result.success).toBe(false);
    });

    it('should accept optional company name', () => {
      const result = bookingSchema.safeParse({
        ...validBookingData,
        companyName: 'Test Company',
      });
      expect(result.success).toBe(true);
    });

    it('should accept optional notes', () => {
      const result = bookingSchema.safeParse({
        ...validBookingData,
        notes: 'Please bring a child seat',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('contactSchema', () => {
    const validContactData = {
      name: 'Jane Doe',
      phone: '+919876543210',
      email: 'jane@example.com',
      message: 'I have a question about your services.',
    };

    it('should validate correct contact data', () => {
      const result = contactSchema.safeParse(validContactData);
      expect(result.success).toBe(true);
    });

    it('should reject empty name', () => {
      const result = contactSchema.safeParse({
        ...validContactData,
        name: '',
      });
      expect(result.success).toBe(false);
    });

    it('should reject short message', () => {
      const result = contactSchema.safeParse({
        ...validContactData,
        message: 'Hi',
      });
      expect(result.success).toBe(false);
    });

    it('should reject long message', () => {
      const result = contactSchema.safeParse({
        ...validContactData,
        message: 'a'.repeat(2001),
      });
      expect(result.success).toBe(false);
    });

    it('should reject invalid email', () => {
      const result = contactSchema.safeParse({
        ...validContactData,
        email: 'not-an-email',
      });
      expect(result.success).toBe(false);
    });
  });
});

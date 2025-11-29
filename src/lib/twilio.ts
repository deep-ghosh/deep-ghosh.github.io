import twilio from 'twilio';
import { Booking } from '@/types';
import { SITE_CONFIG } from '@/config/site';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneNumber = process.env.TWILIO_PHONE_NUMBER;

let client: ReturnType<typeof twilio> | null = null;

if (accountSid && authToken) {
  client = twilio(accountSid, authToken);
}

export const isTwilioConfigured = Boolean(accountSid && authToken && phoneNumber);

export async function sendBookingSMS(
  to: string,
  booking: Booking
): Promise<void> {
  if (!isTwilioConfigured || !client) {
    console.log(`[DEV] SMS would be sent to ${to}: Booking ${booking.reference} confirmed for ${booking.date} at ${booking.time}`);
    return;
  }
  
  const message = `Jesus Travel: Your booking ${booking.reference} is confirmed for ${booking.date} at ${booking.time}. Pickup: ${booking.pickupAddress}. Call ${SITE_CONFIG.phone} for queries.`;
  
  await client.messages.create({
    body: message,
    from: phoneNumber,
    to: to,
  });
}

export async function sendAdminSMS(message: string): Promise<void> {
  if (!isTwilioConfigured || !client) {
    console.log(`[DEV] Admin SMS would be sent: ${message}`);
    return;
  }
  
  await client.messages.create({
    body: message,
    from: phoneNumber,
    to: SITE_CONFIG.phone,
  });
}

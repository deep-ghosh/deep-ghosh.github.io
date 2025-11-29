import sgMail from '@sendgrid/mail';
import { Booking, ContactMessage } from '@/types';
import { SITE_CONFIG } from '@/config/site';

const apiKey = process.env.SENDGRID_API_KEY;
const fromEmail = process.env.SENDGRID_FROM_EMAIL || SITE_CONFIG.email;
const adminEmail = process.env.ADMIN_EMAIL || SITE_CONFIG.adminEmail;

if (apiKey) {
  sgMail.setApiKey(apiKey);
}

export const isSendGridConfigured = Boolean(apiKey);

// Email templates
export function generateBookingConfirmationEmail(booking: Booking): {
  to: string;
  subject: string;
  html: string;
} {
  return {
    to: booking.email,
    subject: `Booking Confirmation - ${booking.reference}`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #2563eb; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
    .info-row { margin: 10px 0; padding: 10px; background: white; border-left: 4px solid #2563eb; }
    .info-label { font-weight: bold; color: #1f2937; }
    .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
    .button { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Booking Confirmed!</h1>
      <p style="margin: 0;">Jesus Travel - Reliable Rides</p>
    </div>
    <div class="content">
      <p>Dear ${booking.name},</p>
      <p>Thank you for booking with Jesus Travel. Your booking has been confirmed.</p>
      
      <div class="info-row">
        <span class="info-label">Booking Reference:</span> ${booking.reference}
      </div>
      <div class="info-row">
        <span class="info-label">Service:</span> ${booking.serviceType}
      </div>
      <div class="info-row">
        <span class="info-label">Vehicle:</span> ${booking.vehicleType}
      </div>
      <div class="info-row">
        <span class="info-label">Pickup:</span> ${booking.pickupAddress}
      </div>
      <div class="info-row">
        <span class="info-label">Drop:</span> ${booking.dropAddress}
      </div>
      <div class="info-row">
        <span class="info-label">Date & Time:</span> ${booking.date} at ${booking.time}
      </div>
      <div class="info-row">
        <span class="info-label">Passengers:</span> ${booking.passengers}
      </div>
      <div class="info-row">
        <span class="info-label">Estimated Fare:</span> ₹${booking.estimatedFare}
      </div>
      
      <p style="margin-top: 20px;">We will contact you at <strong>${booking.phone}</strong> to confirm final details before your journey.</p>
      
      <p>If you have any questions, please don't hesitate to contact us:</p>
      <p>
        📞 <a href="tel:${SITE_CONFIG.phone}">${SITE_CONFIG.phone}</a><br>
        📧 <a href="mailto:${SITE_CONFIG.email}">${SITE_CONFIG.email}</a>
      </p>
      
      <a href="https://${SITE_CONFIG.domain}" class="button">Visit Our Website</a>
      
      <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
        <strong>Important:</strong> Please arrive at the pickup location 5 minutes before the scheduled time.
      </p>
    </div>
    <div class="footer">
      <p>${SITE_CONFIG.name}<br>${SITE_CONFIG.address}</p>
      <p>&copy; ${new Date().getFullYear()} Jesus Travel. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
    `,
  };
}

export function generateAdminNotificationEmail(booking: Booking): {
  to: string;
  subject: string;
  html: string;
} {
  return {
    to: adminEmail,
    subject: `New Booking - ${booking.reference}`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #dc2626; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; background: #f9fafb; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { padding: 10px; text-align: left; border-bottom: 1px solid #e5e7eb; }
    th { background: #f3f4f6; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>🚨 New Booking Alert</h2>
    </div>
    <div class="content">
      <h3>Booking Reference: ${booking.reference}</h3>
      <table>
        <tr><th>Customer Name</th><td>${booking.name}</td></tr>
        <tr><th>Phone</th><td>${booking.phone}</td></tr>
        <tr><th>Email</th><td>${booking.email}</td></tr>
        <tr><th>Service Type</th><td>${booking.serviceType}</td></tr>
        <tr><th>Vehicle</th><td>${booking.vehicleType}</td></tr>
        <tr><th>Trip Type</th><td>${booking.tripType}</td></tr>
        <tr><th>Pickup</th><td>${booking.pickupAddress}</td></tr>
        <tr><th>Drop</th><td>${booking.dropAddress}</td></tr>
        <tr><th>Date</th><td>${booking.date}</td></tr>
        <tr><th>Time</th><td>${booking.time}</td></tr>
        <tr><th>Passengers</th><td>${booking.passengers}</td></tr>
        <tr><th>Luggage</th><td>${booking.luggage}</td></tr>
        <tr><th>Estimated Fare</th><td>₹${booking.estimatedFare}</td></tr>
        ${booking.companyName ? `<tr><th>Company</th><td>${booking.companyName}</td></tr>` : ''}
        ${booking.notes ? `<tr><th>Notes</th><td>${booking.notes}</td></tr>` : ''}
      </table>
      <p><a href="https://${SITE_CONFIG.domain}/admin" style="background: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px;">View in Admin Panel</a></p>
    </div>
  </div>
</body>
</html>
    `,
  };
}

export function generateContactMessageEmail(message: ContactMessage): {
  to: string;
  subject: string;
  html: string;
} {
  return {
    to: adminEmail,
    subject: `New Contact Message from ${message.name}`,
    html: `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <h2 style="color: #2563eb;">New Contact Message</h2>
    <p><strong>Name:</strong> ${message.name}</p>
    <p><strong>Phone:</strong> ${message.phone}</p>
    <p><strong>Email:</strong> ${message.email}</p>
    <p><strong>Message:</strong></p>
    <div style="background: #f9fafb; padding: 15px; border-left: 4px solid #2563eb;">
      ${message.message}
    </div>
    <p style="margin-top: 20px; color: #6b7280; font-size: 14px;">
      Reply to: <a href="mailto:${message.email}">${message.email}</a>
    </p>
  </div>
</body>
</html>
    `,
  };
}

// Send functions
export async function sendBookingConfirmation(booking: Booking): Promise<void> {
  if (!isSendGridConfigured) {
    console.log('[DEV] Email would be sent:', generateBookingConfirmationEmail(booking));
    return;
  }
  
  const email = generateBookingConfirmationEmail(booking);
  await sgMail.send({
    from: fromEmail,
    ...email,
  });
}

export async function sendAdminNotification(booking: Booking): Promise<void> {
  if (!isSendGridConfigured) {
    console.log('[DEV] Admin email would be sent:', generateAdminNotificationEmail(booking));
    return;
  }
  
  const email = generateAdminNotificationEmail(booking);
  await sgMail.send({
    from: fromEmail,
    ...email,
  });
}

export async function sendContactNotification(message: ContactMessage): Promise<void> {
  if (!isSendGridConfigured) {
    console.log('[DEV] Contact email would be sent:', generateContactMessageEmail(message));
    return;
  }
  
  const email = generateContactMessageEmail(message);
  await sgMail.send({
    from: fromEmail,
    ...email,
  });
}

import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';
import { SITE_CONFIG } from '@/config/site';
import { rateLimit } from '@/lib/rate-limit';

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

interface ContactRequest {
  name: string;
  email?: string;
  phone: string;
  serviceType: string;
  message: string;
}

/**
 * Handle contact form submissions
 * Sends email to admin with the contact message
 */
export async function POST(req: NextRequest) {
  try {
    // Rate limiting - 5 messages per 5 minutes per IP
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const rateLimitResult = rateLimit(`contact-${ip}`, 5, 300000);

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Too many messages. Please wait a few minutes before sending another message.' 
        },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await req.json() as ContactRequest;

    // Validate required fields
    if (!body.name?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Name is required' },
        { status: 400 }
      );
    }

    if (!body.phone?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Phone number is required' },
        { status: 400 }
      );
    }

    if (!body.message?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Message is required' },
        { status: 400 }
      );
    }

    // Validate phone number (basic Indian format)
    const phoneRegex = /^(\+91)?[6-9]\d{9}$/;
    if (!phoneRegex.test(body.phone.replace(/\s|-/g, ''))) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid phone number' },
        { status: 400 }
      );
    }

    // Validate email if provided
    if (body.email?.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(body.email)) {
        return NextResponse.json(
          { success: false, error: 'Please enter a valid email address' },
          { status: 400 }
        );
      }
    }

    // If SendGrid is not configured, return success but don't send email
    if (!SENDGRID_API_KEY) {
      console.warn('SendGrid not configured. Email not sent.');
      return NextResponse.json({
        success: true,
        message: 'Message received. We will contact you soon.',
      });
    }

    sgMail.setApiKey(SENDGRID_API_KEY);

    // Email to admin
    const adminEmailContent = {
      to: SITE_CONFIG.adminEmail,
      from: SITE_CONFIG.email || 'noreply@jesustravel.me',
      subject: `New Contact: ${body.name} - ${body.serviceType}`,
      html: generateAdminEmail(body),
      replyTo: body.email || body.phone,
    };

    // Send email to admin
    await sgMail.send(adminEmailContent);

    // Optional: Send confirmation email to user if email provided
    if (body.email?.trim()) {
      try {
        const userEmailContent = {
          to: body.email,
          from: SITE_CONFIG.email || 'noreply@jesustravel.me',
          subject: 'We received your message - Jesus Travel',
          html: generateUserConfirmationEmail(body.name),
        };
        await sgMail.send(userEmailContent);
      } catch (err) {
        // Don't fail the request if confirmation email fails
        console.error('Failed to send confirmation email:', err);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully. We will contact you soon.',
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process your request. Please try again or call us directly.' 
      },
      { status: 500 }
    );
  }
}

/**
 * Generate HTML email for admin
 */
function generateAdminEmail(data: ContactRequest): string {
  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; background: #f5f5f5; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%); color: white; padding: 30px 20px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; }
    .content { padding: 30px 20px; }
    .field { margin-bottom: 20px; }
    .label { font-weight: bold; color: #1e3a8a; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
    .value { color: #333; margin-top: 5px; padding: 10px 15px; background: #f0f4f8; border-radius: 4px; }
    .message-box { background: #fafbfc; border-left: 4px solid #2563eb; padding: 15px; border-radius: 4px; margin-top: 10px; }
    .footer { background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 12px; border-top: 1px solid #e5e7eb; }
    .cta-button { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 15px; }
    .timestamp { color: #9ca3af; font-size: 12px; margin-top: 5px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📨 New Contact Message</h1>
      <p style="margin: 8px 0 0 0; font-size: 14px; opacity: 0.9;">Jesus Travel Booking System</p>
    </div>
    
    <div class="content">
      <h2 style="color: #1e3a8a; margin-top: 0;">Customer Details</h2>
      
      <div class="field">
        <div class="label">📝 Name</div>
        <div class="value">${escapeHtml(data.name)}</div>
      </div>
      
      <div class="field">
        <div class="label">📱 Phone</div>
        <div class="value">
          <a href="tel:${data.phone}" style="color: #2563eb; text-decoration: none;">
            ${escapeHtml(data.phone)}
          </a>
          <br>
          <a href="https://wa.me/${data.phone.replace(/\D/g, '')}" style="color: #22c55e; text-decoration: none; font-size: 12px;">
            💬 Open WhatsApp
          </a>
        </div>
      </div>
      
      ${data.email ? `
      <div class="field">
        <div class="label">✉️ Email</div>
        <div class="value">
          <a href="mailto:${data.email}" style="color: #2563eb; text-decoration: none;">
            ${escapeHtml(data.email)}
          </a>
        </div>
      </div>
      ` : ''}
      
      <div class="field">
        <div class="label">🏷️ Service Type</div>
        <div class="value">${formatServiceType(data.serviceType)}</div>
      </div>
      
      <div class="field">
        <div class="label">💬 Message</div>
        <div class="message-box" style="white-space: pre-wrap; word-break: break-word;">
          ${escapeHtml(data.message)}
        </div>
      </div>

      <div style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 12px; border-radius: 4px; margin-top: 20px;">
        <p style="margin: 0; color: #166534; font-size: 12px;">
          <strong>⏰ Received:</strong> ${timestamp} (IST)
        </p>
      </div>
    </div>
    
    <div class="footer">
      <p style="margin: 0;">
        This is an automated message from your Jesus Travel website.<br>
        Please respond to the customer via phone or email at your earliest convenience.
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Generate confirmation email for user
 */
function generateUserConfirmationEmail(name: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; background: #f5f5f5; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #16a34a 0%, #22c55e 100%); color: white; padding: 30px 20px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; }
    .content { padding: 30px 20px; }
    .message-box { background: #f0fdf4; border-left: 4px solid #16a34a; padding: 15px; border-radius: 4px; margin: 20px 0; }
    .cta-section { text-align: center; margin: 30px 0; }
    .cta-button { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 0 10px; }
    .contact-info { background: #f0f4f8; padding: 15px; border-radius: 4px; margin: 20px 0; }
    .footer { background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 12px; border-top: 1px solid #e5e7eb; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✅ Message Received!</h1>
      <p style="margin: 8px 0 0 0; font-size: 14px; opacity: 0.9;">Jesus Travel - Reliable Rides</p>
    </div>
    
    <div class="content">
      <h2 style="color: #1e3a8a;">Hi ${escapeHtml(name)},</h2>
      
      <p style="color: #555;">Thank you for contacting Jesus Travel! We have received your message and will get back to you shortly.</p>
      
      <div class="message-box">
        <p style="margin: 0; color: #166534;">
          <strong>✓ Your message has been received</strong><br>
          We'll contact you via phone or WhatsApp soon.
        </p>
      </div>
      
      <h3 style="color: #1e3a8a; margin-top: 30px;">In the meantime, you can reach us directly:</h3>
      
      <div class="contact-info">
        <p style="margin: 0 0 10px 0;">
          <strong>📱 Phone:</strong> <a href="tel:${SITE_CONFIG.phone}" style="color: #2563eb; text-decoration: none;">${SITE_CONFIG.phone}</a>
        </p>
        <p style="margin: 0;">
          <strong>💬 WhatsApp:</strong> <a href="https://wa.me/919831005736" style="color: #22c55e; text-decoration: none;">Start Chat</a>
        </p>
      </div>
      
      <p style="color: #555; margin-top: 20px;">
        We appreciate your interest and look forward to helping you with your vehicle service needs.
      </p>
      
      <p style="color: #555;">
        Best regards,<br>
        <strong>Jesus Travel Team</strong>
      </p>
    </div>
    
    <div class="footer">
      <p style="margin: 0;">
        This is an automated confirmation email. Please do not reply to this email.<br>
        For further assistance, please call us or send a WhatsApp message.
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

/**
 * Format service type for display
 */
function formatServiceType(type: string): string {
  const serviceMap: Record<string, string> = {
    'general': 'General Inquiry',
    'school': 'School Pickup Service',
    'office': 'Office Shuttle Service',
    'wedding': 'Wedding/Event Transportation',
    'tour': 'Tour or Outstation Travel',
    'local': 'Local Trip',
    'other': 'Other',
  };
  return serviceMap[type] || type;
}

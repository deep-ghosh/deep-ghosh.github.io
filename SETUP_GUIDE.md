# Jesus Travel - Professional Vehicle Services Website

A modern, responsive website for Jesus Travel - providing reliable vehicle services for schools, offices, weddings, and tours across Kolkata.

## ✨ Key Features

- **Professional Design**: Modern, clean UI with gradient backgrounds and smooth animations
- **Mobile Optimized**: Fully responsive design that works perfectly on all devices
- **Contact Form**: Simple form for customers to reach out with their requirements
- **Email Integration**: Automatic email notifications to admin when customers submit inquiries
- **WhatsApp Integration**: Direct WhatsApp links for quick communication
- **No Database Required**: Simple, frontend-focused solution
- **No Pricing Display**: Focus on services and direct contact
- **24/7 Availability**: Clear contact information and WhatsApp availability

## 📞 Contact Information

- **Email**: jesustravel.me@gmail.com
- **Phone 1**: +91 9831005736
- **Phone 2**: +91 7595025030
- **WhatsApp**: +91 9831005736
- **Address**: Newtown, Action Area 1, Kolkata - 700156

## 🚀 Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the `jesustravel` directory with the following variables:

```env
# SendGrid Configuration (for email notifications)
SENDGRID_API_KEY=your_sendgrid_api_key_here
SENDGRID_FROM_EMAIL=jesustravel.me@gmail.com
ADMIN_EMAIL=jesustravel.me@gmail.com
```

### 2. Get SendGrid API Key

1. Go to [SendGrid](https://sendgrid.com/)
2. Sign up for a free account
3. Navigate to Settings → API Keys
4. Create a new API Key with Mail Send permissions
5. Copy the key and paste it in `.env.local`

### 3. Install Dependencies

```bash
cd jesustravel
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the website.

## 📁 Project Structure

```
jesustravel/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing page (home)
│   │   ├── book/
│   │   │   └── page.tsx          # Contact form page
│   │   ├── contact/
│   │   │   └── page.tsx          # Contact information page
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts      # Contact form API endpoint
│   │   └── ...
│   ├── components/
│   │   ├── booking/
│   │   │   └── ContactForm.tsx   # Contact form component
│   │   ├── layout/
│   │   │   ├── Header.tsx        # Navigation header
│   │   │   └── Footer.tsx        # Footer with contact info
│   │   └── ui/                   # Reusable UI components
│   ├── config/
│   │   └── site.ts               # Site configuration
│   └── lib/
│       ├── sendgrid.ts           # SendGrid utilities
│       └── rate-limit.ts         # Rate limiting
├── package.json
└── ...
```

## 🎨 UI/UX Highlights

### Homepage
- **Hero Section**: Eye-catching gradient background with clear CTA buttons
- **Why Choose Us**: 6 key benefits with icons
- **Services Grid**: Visual display of all service types
- **Getting Started**: 3-step process flow
- **Testimonials**: Rotating customer testimonials
- **Contact Section**: Multiple contact options (Phone, WhatsApp, Form)

### Contact Form Page (/book)
- Clean, professional contact form
- Service type selection dropdown
- Form validation with helpful error messages
- Success confirmation screen
- Quick contact options (Phone + WhatsApp)
- Mobile-optimized form layout

### Header
- Sticky navigation with responsive menu
- WhatsApp and Call buttons for quick access
- Mobile hamburger menu

### Footer
- Comprehensive contact information
- Quick links to all pages
- WhatsApp and Call buttons
- Professional branding

## 📧 How Contact Form Works

1. **User submits form** on `/book` page with:
   - Name (required)
   - Phone (required)
   - Email (optional)
   - Service type (dropdown)
   - Message (required)

2. **Validation**:
   - All required fields checked
   - Phone number format validated (Indian format)
   - Email format validated
   - Rate limiting (5 messages per 5 minutes per IP)

3. **Admin Email**:
   - Professional HTML email sent to admin
   - Includes all customer details
   - WhatsApp link for quick reply
   - Timestamp of message

4. **User Confirmation**:
   - Success message shown in form
   - Optional confirmation email sent to user

## 🔒 Security Features

- **Rate Limiting**: Prevents spam (5 messages per 5 minutes per IP)
- **Input Validation**: All form inputs validated
- **HTML Escaping**: XSS protection for email templates
- **CORS**: Secure API endpoints

## 📱 Mobile Optimization

- Responsive grid layouts
- Touch-friendly buttons and inputs
- Mobile-optimized navigation
- Readable font sizes
- Proper spacing and padding
- Fast load times

## 🎯 SEO & Performance

- Semantic HTML structure
- Meta tags for social sharing
- Optimized images
- Fast CSS and animations
- Clean, maintainable code

## 🛠️ Technology Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Email**: SendGrid
- **Language**: TypeScript
- **Rate Limiting**: Custom in-memory solution

## 📝 Configuration

Edit `src/config/site.ts` to customize:
- Business name and tagline
- Contact information
- Service offerings
- Testimonials
- WhatsApp message templates

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

Ensure the following environment variables are set:
- `SENDGRID_API_KEY`
- `SENDGRID_FROM_EMAIL`
- `ADMIN_EMAIL`

## ❓ Troubleshooting

### Emails not sending?
- Check `SENDGRID_API_KEY` is correct
- Verify `ADMIN_EMAIL` matches your account
- Check SendGrid dashboard for delivery logs

### Form not working?
- Check browser console for errors
- Verify API endpoint is accessible
- Check rate limiting isn't triggered

### Mobile menu not opening?
- Clear browser cache
- Check for console errors
- Ensure JavaScript is enabled

## 📞 Support

For questions or issues:
- Call: +91 9831005736
- WhatsApp: +91 9831005736
- Email: jesustravel.me@gmail.com

## 📄 License

All rights reserved © 2024 Jesus Travel

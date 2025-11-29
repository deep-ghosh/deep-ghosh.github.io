# 🚀 Jesus Travel Website - Quick Start Guide

Welcome! This guide will get your website up and running in 10 minutes.

## ⚡ TL;DR (Too Long; Didn't Read)

```bash
# 1. Copy environment template
cp .env.local.example .env.local

# 2. Add your SendGrid API key to .env.local
# Edit .env.local and paste your API key

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev

# 5. Visit http://localhost:3000
```

## 📋 What You'll Get

✅ **Modern Landing Page** - Professional design showcasing services  
✅ **Contact Form** - Customers can request quotes/services  
✅ **Email Notifications** - Get alerts when customers submit forms  
✅ **WhatsApp Integration** - Direct WhatsApp chat links  
✅ **Mobile Optimized** - Perfect on phones and tablets  
✅ **No Database** - Simple, no maintenance required  

## 🎯 Step-by-Step Setup

### Step 1: Get SendGrid API Key (5 minutes)

This is how you'll receive email notifications when customers contact you.

1. Go to https://sendgrid.com and sign up (free)
2. Verify your email
3. Go to Settings → API Keys
4. Create new API Key with "Mail Send" permission
5. Copy the key (it starts with `SG.`)

**That's it!** You now have an API key.

### Step 2: Add API Key to Your Project (2 minutes)

1. In the `jesustravel` folder, find or create `.env.local` file
2. Paste your API key:

```env
SENDGRID_API_KEY=SG.your_key_here
SENDGRID_FROM_EMAIL=jesustravel.me@gmail.com
ADMIN_EMAIL=jesustravel.me@gmail.com
```

3. Save the file

**Important:** Do NOT commit `.env.local` to git!

### Step 3: Install & Run (3 minutes)

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:3000 in your browser. You should see the website!

### Step 4: Test Contact Form (Optional)

1. Go to http://localhost:3000/book
2. Fill out the contact form
3. Submit it
4. Check your email for the notification!

## 📱 Website Structure

```
Home Page (/)
├─ Hero section with CTA buttons
├─ Why Choose Us section
├─ Services grid
├─ Getting Started steps
├─ Customer testimonials
└─ Contact section

Contact Form (/book or /contact)
├─ Professional contact form
├─ Success confirmation
└─ Quick contact options

Other Pages (/services, /about, /faq)
├─ Professional information pages
└─ Links throughout website
```

## 🎨 Customization

### Change Contact Information

Edit `src/config/site.ts`:

```typescript
export const SITE_CONFIG = {
  phone: '+919831005736',
  phone2: '+917595025030',
  email: 'jesustravel.me@gmail.com',
  adminEmail: 'jesustravel.me@gmail.com',
  address: 'Newtown, Action Area 1, Kolkata - 700156',
  // ... other config
};
```

### Customize Services

Edit the SERVICES array in `src/config/site.ts` to add/remove/edit services.

### Change Colors

The website uses Tailwind CSS. Edit color classes in:
- `src/app/page.tsx` - Landing page
- `src/components/booking/ContactForm.tsx` - Contact form
- `src/components/layout/Header.tsx` - Header
- `src/components/layout/Footer.tsx` - Footer

Replace `blue-600` with `green-600`, `purple-600`, etc. to change colors.

## 🌐 Deploy to Production

### Option 1: Vercel (Recommended)

```bash
# 1. Push to GitHub
git add .
git commit -m "Initial commit"
git push origin main

# 2. Go to vercel.com
# 3. Click "New Project"
# 4. Select your GitHub repo
# 5. Add environment variables in settings:
#    - SENDGRID_API_KEY
#    - SENDGRID_FROM_EMAIL
#    - ADMIN_EMAIL
# 6. Deploy!
```

### Option 2: Other Platforms

Just set the same 3 environment variables:
- `SENDGRID_API_KEY`
- `SENDGRID_FROM_EMAIL`
- `ADMIN_EMAIL`

## 📧 How Email Works

```
Customer fills form
        ↓
Form validates data
        ↓
Sends to API (/api/contact)
        ↓
API sends email via SendGrid
        ↓
Admin receives professional email
        ↓
Admin can reply via phone/WhatsApp
```

All automatic! No manual email sending needed.

## 🚨 Common Issues & Fixes

| Problem | Solution |
|---------|----------|
| "Emails not sending" | Check SENDGRID_API_KEY in .env.local |
| "Form not working" | Restart dev server after .env changes |
| "Page looks broken" | Clear browser cache (Ctrl+Shift+Delete) |
| "Mobile menu not working" | Check JavaScript is enabled |
| "WhatsApp link not opening" | WhatsApp app must be installed |

## 📞 Contact Information

Your business contact info (used throughout the site):

- **Email**: jesustravel.me@gmail.com
- **Phone 1**: +91 9831005736
- **Phone 2**: +91 7595025030
- **WhatsApp**: +91 9831005736
- **Address**: Newtown, Action Area 1, Kolkata

## 📚 Full Documentation

For detailed information, see:
- `SETUP_GUIDE.md` - Comprehensive setup guide
- `SENDGRID_SETUP.md` - Email configuration details
- `README.md` - Original project README

## 🎓 What's Included

### Pages
- ✅ Home page (landing page)
- ✅ Book/Contact page (contact form)
- ✅ Services page
- ✅ About page
- ✅ Contact info page
- ✅ FAQ page
- ✅ Terms & Privacy pages

### Features
- ✅ Professional design
- ✅ Mobile responsive
- ✅ Contact form with validation
- ✅ Email notifications
- ✅ WhatsApp integration
- ✅ Rate limiting (anti-spam)
- ✅ SEO optimized
- ✅ Fast performance

### Technology
- ✅ Next.js (React framework)
- ✅ Tailwind CSS (styling)
- ✅ TypeScript (type safety)
- ✅ SendGrid (email service)
- ✅ Lucide Icons (beautiful icons)

## 💡 Tips for Success

1. **Keep contact info updated** - Update SITE_CONFIG whenever you change phone/email
2. **Monitor emails** - Check SendGrid dashboard for delivery issues
3. **Test on mobile** - Always test on phone before launching
4. **Use good photos** - Replace placeholder images with your own
5. **Regular backups** - Backup your code on GitHub
6. **Update content** - Keep testimonials and services current

## 🎉 You're Ready!

Your professional Jesus Travel website is now ready to:
- Attract customers
- Accept inquiries
- Send you email notifications
- Provide 24/7 availability

Good luck! 🚀

---

**Questions?** Check the detailed guides or contact your developer.

**Found a bug?** Check the code or restart your dev server.

**Need changes?** Edit the relevant files and refresh your browser!

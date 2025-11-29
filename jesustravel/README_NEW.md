# Jesus Travel - Professional Vehicle Services Website

A modern, professional website for Jesus Travel providing reliable vehicle services for schools, offices, weddings, and tours across Kolkata.

## ✨ Features

- **Modern Design**: Professional UI with gradient backgrounds and smooth animations
- **Mobile Optimized**: Fully responsive design for all devices
- **Contact Form**: Simple contact form for customer inquiries
- **Email Notifications**: Automatic email when customers submit inquiries
- **WhatsApp Integration**: Direct WhatsApp links for quick communication
- **24/7 Availability**: Clear contact information and direct links
- **No Database**: Simple, no-maintenance solution
- **No Pricing Display**: Focus on direct contact and services
- **Professional UI/UX**: Modern, user-engaging design

## 🚀 Quick Start (10 minutes)

### 1. Get SendGrid API Key (5 minutes)
```bash
1. Visit https://sendgrid.com
2. Sign up for free account
3. Go to Settings → API Keys
4. Create new API Key with "Mail Send" permission
5. Copy your API key
```

### 2. Setup Environment Variables (2 minutes)
```bash
# Copy the example file
cp .env.local.example .env.local

# Edit .env.local and add your SendGrid API key
# SENDGRID_API_KEY=SG.your_key_here
```

### 3. Install & Run (3 minutes)
```bash
npm install
npm run dev
```

Visit `http://localhost:3000` - Your website is live! 🎉

## 📖 Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** - Get started in 10 minutes ⭐
- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Comprehensive setup guide
- **[SENDGRID_SETUP.md](./SENDGRID_SETUP.md)** - Email configuration guide
- **[DESIGN_OVERVIEW.md](./DESIGN_OVERVIEW.md)** - Visual design overview
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - What's been completed
- **[SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md)** - Setup checklist

**👉 Start with QUICKSTART.md for fastest setup!**

## 📁 Project Structure

```
jesustravel/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Landing page
│   │   ├── book/page.tsx               # Contact form page
│   │   ├── contact/page.tsx            # Contact info
│   │   ├── api/contact/route.ts        # Contact API
│   │   └── [other pages]
│   ├── components/
│   │   ├── booking/ContactForm.tsx     # Contact form
│   │   ├── layout/                     # Header & Footer
│   │   └── ui/                         # UI components
│   ├── config/
│   │   └── site.ts                     # Configuration
│   └── lib/
│       └── sendgrid.ts                 # Email utilities
├── public/                             # Assets
├── package.json
├── .env.local.example                  # Environment template
└── [Documentation files]
```

## 📞 Contact Information

- **Email**: jesustravel.me@gmail.com
- **Phone**: +91 9831005736
- **Alternate Phone**: +91 7595025030
- **WhatsApp**: +91 9831005736
- **Address**: Newtown, Action Area 1, Kolkata - 700156

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (React)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Email**: SendGrid
- **Language**: TypeScript
- **Deployment**: Vercel (recommended)

## 📧 How Contact Form Works

```
1. Customer fills form
2. Form validates data
3. Sends to /api/contact
4. API sends email via SendGrid
5. Admin receives professional email
6. Admin replies via phone/WhatsApp
7. Service booked! ✅
```

## 🚀 Deployment to Production

### Option 1: Vercel (Recommended - Easiest)

```bash
# 1. Push code to GitHub
git add .
git commit -m "Initial commit"
git push origin main

# 2. Go to vercel.com
# 3. Click "New Project"
# 4. Select your GitHub repo
# 5. Add environment variables:
#    SENDGRID_API_KEY=your_key
#    SENDGRID_FROM_EMAIL=jesustravel.me@gmail.com
#    ADMIN_EMAIL=jesustravel.me@gmail.com
# 6. Deploy!
```

### Option 2: Other Platforms
Set the same 3 environment variables on your hosting platform.

## 📱 Website Pages

- `/` - Landing page with services overview
- `/book` - Contact form for inquiries
- `/contact` - Contact information
- `/services` - Services listing
- `/about` - About Jesus Travel
- `/faq` - Frequently asked questions
- `/privacy` - Privacy policy
- `/terms` - Terms of service

## 🎨 Customization

### Change Contact Information
Edit `src/config/site.ts`:
```typescript
export const SITE_CONFIG = {
  phone: '+919831005736',
  email: 'jesustravel.me@gmail.com',
  // ... other config
};
```

### Change Colors
Search and replace color classes:
- `blue-600` → `green-600` (changes blue to green)
- `green-500` → `purple-500` (changes green to purple)

### Update Services
Edit the SERVICES array in `src/config/site.ts`

## 🔒 Security

- ✅ Input validation (name, phone, email)
- ✅ Rate limiting (5 messages per 5 minutes)
- ✅ XSS protection (HTML escaping)
- ✅ Email validation
- ✅ Phone format validation
- ✅ HTTPS (automatic with hosting)

## ⚡ Performance

- No database (instant responses)
- Static page generation
- Optimized bundle size
- Responsive design
- Smooth animations
- Fast email processing

## 📊 Browser Support

- ✅ Chrome (latest 2 versions)
- ✅ Firefox (latest 2 versions)
- ✅ Safari (latest 2 versions)
- ✅ Edge (latest 2 versions)
- ✅ Mobile browsers (iOS, Android)

## 🎯 Key Benefits

| Feature | Benefit |
|---------|---------|
| No Database | Easier maintenance, lower cost |
| Email Notifications | Get alerts instantly |
| Mobile Responsive | Works on all devices |
| Contact-First | Simple, effective approach |
| WhatsApp Integration | Meet customers where they are |
| 24/7 Availability | Always reachable |
| Professional Design | Build customer trust |
| Fast Performance | Better user experience |

## 📞 Support & Help

1. **First Time?** Read `QUICKSTART.md`
2. **Email Setup?** Read `SENDGRID_SETUP.md`
3. **Errors?** Check browser console
4. **Stuck?** Check code comments (well documented)

## ✅ What's Included

- ✅ Professional landing page
- ✅ Contact form with validation
- ✅ Email notification system
- ✅ WhatsApp integration
- ✅ Responsive design
- ✅ Professional UI/UX
- ✅ Complete documentation (6 guides)
- ✅ Ready for deployment

## 🚨 Before Going Live

- [ ] Get SendGrid API key
- [ ] Setup `.env.local`
- [ ] Test contact form locally
- [ ] Test on mobile device
- [ ] Deploy to Vercel/hosting
- [ ] Add environment variables
- [ ] Test on production URL
- [ ] Monitor email delivery

## 📝 Configuration

### Required Environment Variables

```env
SENDGRID_API_KEY=SG.your_api_key_here
SENDGRID_FROM_EMAIL=jesustravel.me@gmail.com
ADMIN_EMAIL=jesustravel.me@gmail.com
```

### Optional Customization

Edit `src/config/site.ts` to customize:
- Company name and tagline
- Contact information
- Operating hours
- Services offered
- Testimonials
- WhatsApp message templates

## 🎉 Getting Started Path

1. **Read** `QUICKSTART.md` (5 min)
2. **Setup** SendGrid following `SENDGRID_SETUP.md` (5 min)
3. **Install** `npm install` (2 min)
4. **Run** `npm run dev` (1 min)
5. **Test** contact form (2 min)
6. **Deploy** to Vercel (5 min)
7. **Monitor** email delivery

**Total: 20 minutes from nothing to live website! 🚀**

## 📈 Success Tips

1. **Keep it updated** - Update phone/email when they change
2. **Monitor emails** - Check SendGrid dashboard regularly
3. **Respond quickly** - Reply to customers within 24 hours
4. **Fresh content** - Keep testimonials and services current
5. **Mobile first** - Always test on mobile phones

## 🤝 What to Do Next

1. **Start here**: Read `QUICKSTART.md`
2. **Setup email**: Follow `SENDGRID_SETUP.md`
3. **Deploy**: Use `SETUP_GUIDE.md`
4. **Launch**: Use `SETUP_CHECKLIST.md`

## 📄 License

All rights reserved © 2024 Jesus Travel

---

## 🌟 Features Summary

### Frontend
- Modern, professional design
- Fully responsive (mobile, tablet, desktop)
- Smooth animations and transitions
- Professional color scheme
- Accessible UI components

### Contact System
- Simple contact form
- Real-time validation
- Success confirmation
- WhatsApp integration
- Phone call links

### Email Integration
- Automatic notifications
- Professional HTML templates
- Customer confirmations
- Admin notifications
- SendGrid integration

### Performance
- Fast page loads
- Optimized images
- No database overhead
- Instant responses
- Production-ready

---

## 💡 Need Help?

1. **Setup questions?** → Read `QUICKSTART.md`
2. **Email not working?** → Read `SENDGRID_SETUP.md`
3. **Deployment issues?** → Read `SETUP_GUIDE.md`
4. **Design questions?** → Read `DESIGN_OVERVIEW.md`
5. **Errors in browser?** → Check console + `.env.local`

---

**Your professional Jesus Travel website is ready to serve customers! 🎉**

Built with ❤️ for Jesus Travel, Kolkata.

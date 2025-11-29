# Jesus Travel Website - Setup Checklist

Use this checklist to track your setup progress.

## Pre-Deployment Checklist

### Step 1: Get API Key
- [ ] Visit https://sendgrid.com
- [ ] Sign up for free account
- [ ] Verify email
- [ ] Go to Settings → API Keys
- [ ] Create new API Key (Mail Send permission)
- [ ] Copy API Key (save it somewhere safe)
- [ ] Verify sender email in SendGrid

### Step 2: Local Setup
- [ ] Create `.env.local` file in `jesustravel` folder
- [ ] Add `SENDGRID_API_KEY=SG.your_key_here`
- [ ] Add `SENDGRID_FROM_EMAIL=jesustravel.me@gmail.com`
- [ ] Add `ADMIN_EMAIL=jesustravel.me@gmail.com`
- [ ] Run `npm install`
- [ ] Run `npm run dev`
- [ ] Visit http://localhost:3000

### Step 3: Testing
- [ ] Homepage loads correctly
- [ ] All pages accessible from header
- [ ] Contact form page displays
- [ ] Contact form has all fields
- [ ] Submit test message
- [ ] Check email for notification
- [ ] Success screen appears

### Step 4: Mobile Testing
- [ ] Open on mobile device
- [ ] Header responsive
- [ ] Menu opens/closes
- [ ] Contact form readable
- [ ] Buttons are clickable
- [ ] WhatsApp link works
- [ ] Phone link works

### Step 5: Configuration Review
- [ ] Contact info in footer is correct
- [ ] Contact info in header is correct
- [ ] WhatsApp number is correct
- [ ] Email address is correct
- [ ] Phone number is correct
- [ ] Address is correct

### Step 6: Code Review
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] All imports working
- [ ] All components displaying
- [ ] No broken links

## Pre-Deployment Checklist

### Vercel Deployment

- [ ] Code pushed to GitHub
- [ ] Account created on Vercel
- [ ] Repository connected to Vercel
- [ ] Environment variables added:
  - [ ] `SENDGRID_API_KEY`
  - [ ] `SENDGRID_FROM_EMAIL`
  - [ ] `ADMIN_EMAIL`
- [ ] Deployment successful
- [ ] Site accessible via Vercel URL
- [ ] All pages load correctly

### Domain Setup (Optional)

- [ ] Domain registered (e.g., jesustravel.me)
- [ ] DNS records configured
- [ ] Domain connected to Vercel
- [ ] SSL certificate installed
- [ ] Site accessible via custom domain
- [ ] Email links work with custom domain

## Post-Deployment Checklist

### Live Testing

- [ ] Visit live site
- [ ] All pages load correctly
- [ ] Contact form submits
- [ ] Email received in inbox
- [ ] Links work correctly
- [ ] Mobile layout correct
- [ ] Performance is good

### Monitoring

- [ ] Check SendGrid dashboard daily
- [ ] Monitor email delivery
- [ ] Check for bounce/spam reports
- [ ] Monitor website uptime
- [ ] Review customer feedback

### Maintenance

- [ ] Update content as needed
- [ ] Monitor contact form submissions
- [ ] Respond to customer inquiries
- [ ] Keep backups of code
- [ ] Update dependencies periodically

## Customization Checklist

### Branding

- [ ] Update company name (if different)
- [ ] Update logo (if available)
- [ ] Update color scheme
- [ ] Update tagline
- [ ] Update description

### Content

- [ ] Update services description
- [ ] Update testimonials
- [ ] Update FAQs
- [ ] Update about page
- [ ] Update privacy policy
- [ ] Update terms of service

### Functionality

- [ ] Email notifications working
- [ ] Form validation working
- [ ] WhatsApp links working
- [ ] Phone links working
- [ ] Success screen displaying

## Deployment Platforms

### Choose Your Platform

- [ ] **Vercel** (Recommended)
  - [ ] Free tier available
  - [ ] Easy deployment
  - [ ] Good performance
  
- [ ] **Netlify**
  - [ ] Free tier available
  - [ ] Good deployment experience
  
- [ ] **AWS/Azure**
  - [ ] More complex
  - [ ] More features
  - [ ] Potentially more expensive

## Documentation

- [ ] Read `QUICKSTART.md`
- [ ] Read `SETUP_GUIDE.md`
- [ ] Read `SENDGRID_SETUP.md`
- [ ] Review environment variables
- [ ] Understand API flow

## Security Checklist

- [ ] API key is NOT in `.env.local` on GitHub
- [ ] `.env.local` added to `.gitignore`
- [ ] No hardcoded secrets in code
- [ ] Email validation working
- [ ] Phone validation working
- [ ] Rate limiting active
- [ ] HTTPS enabled (automatic with Vercel)

## Performance Checklist

- [ ] Page load speed acceptable
- [ ] Images optimized
- [ ] CSS minified
- [ ] JavaScript minified
- [ ] No console errors
- [ ] No network errors

## SEO Checklist (Optional)

- [ ] Meta title updated
- [ ] Meta description updated
- [ ] Open Graph tags configured
- [ ] Sitemap generated
- [ ] Robots.txt configured
- [ ] Google Analytics set up

## Final Verification

### Before Going Live

- [ ] All URLs working
- [ ] All links functional
- [ ] Forms submitting
- [ ] Emails sending
- [ ] Mobile responsive
- [ ] Desktop looks good
- [ ] Performance acceptable
- [ ] No errors in console

### After Going Live

- [ ] Monitor error logs
- [ ] Check email delivery
- [ ] Respond to inquiries
- [ ] Keep backup
- [ ] Track analytics

## Troubleshooting Checklist

If something doesn't work:

- [ ] Check `.env.local` file exists
- [ ] Check API key is correct
- [ ] Check email is verified in SendGrid
- [ ] Restart dev server (if local)
- [ ] Clear browser cache
- [ ] Check browser console for errors
- [ ] Check network tab for failed requests
- [ ] Check SendGrid dashboard logs
- [ ] Read the documentation files
- [ ] Try a fresh test submission

## Contact Information

- **Your Business Email**: jesustravel.me@gmail.com
- **Your Business Phone**: +91 9831005736
- **Backup Phone**: +91 7595025030
- **WhatsApp**: +91 9831005736

---

## Status Tracker

- [ ] Setup started: _____________
- [ ] API key obtained: _____________
- [ ] Local testing complete: _____________
- [ ] Deployed to production: _____________
- [ ] Live and working: _____________

## Notes

Use this space for any notes or reminders:

```
_____________________________________________________________________

_____________________________________________________________________

_____________________________________________________________________

_____________________________________________________________________
```

---

**Congratulations!** Once you've checked all items, your Jesus Travel website is ready to serve customers! 🎉

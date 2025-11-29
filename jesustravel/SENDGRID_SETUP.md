# SendGrid Email Setup Guide

This document explains how to set up email notifications for the Jesus Travel contact form.

## 📧 What Happens When Someone Submits the Form?

1. **Customer submits contact form** on `/book` or `/contact` page
2. **Admin receives email** with all customer details to `jesustravel.me@gmail.com`
3. **Customer receives confirmation** (optional, only if email provided)
4. **Admin can reply** directly via phone or WhatsApp from the email

## 🔧 Setup Steps

### Step 1: Create SendGrid Account

1. Visit [https://sendgrid.com/](https://sendgrid.com/)
2. Click "Sign Up Free" (free account includes 100 emails/day, sufficient for small business)
3. Complete the signup process
4. Verify your email

### Step 2: Generate API Key

1. Log in to SendGrid dashboard
2. Go to **Settings** → **API Keys** (left sidebar)
3. Click **"Create API Key"** button
4. Name it: `Jesus Travel Website`
5. Select permissions:
   - ✅ Mail Send
   - Leave all others unchecked
6. Click **"Create & Copy"**
7. **Copy the API Key** (you'll only see it once!)

### Step 3: Verify Sender Email

1. In SendGrid dashboard, go to **Settings** → **Sender Authentication**
2. Click **"Verify a Single Sender"**
3. Fill in:
   - **From Email Address**: `jesustravel.me@gmail.com`
   - **From Name**: `Jesus Travel`
   - **Reply To**: Your preferred reply email
4. Click **"Create"**
5. Check your email for verification link
6. Click the link to verify

### Step 4: Update Environment Variables

1. Open `.env.local` file in the `jesustravel` directory
2. Add these lines:

```env
SENDGRID_API_KEY=SG.your_api_key_here_replace_with_actual_key
SENDGRID_FROM_EMAIL=jesustravel.me@gmail.com
ADMIN_EMAIL=jesustravel.me@gmail.com
```

Replace `SG.your_api_key_here_replace_with_actual_key` with your actual API key from Step 2.

### Step 5: Test the Setup

1. Start development server: `npm run dev`
2. Go to `http://localhost:3000/book`
3. Fill out the contact form with test data
4. Submit the form
5. Check your email (jesustravel.me@gmail.com) for the test message

## 📨 Email Template Preview

### Admin Email
The admin receives a professional HTML email with:
- Customer name
- Phone number (clickable tel: link)
- Email (if provided)
- Service type selected
- Full message
- Timestamp (IST)
- WhatsApp direct link for quick reply

### Customer Confirmation Email (Optional)
If customer provides email, they receive:
- Confirmation that message was received
- Direct phone numbers
- WhatsApp link
- Professional branding

## 🚀 Deployment to Production

### Vercel Deployment

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Update environment variables"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Select your GitHub repository
   - Import the `jesustravel` directory

3. **Add Environment Variables**
   - In Vercel dashboard, go to project settings
   - Click "Environment Variables"
   - Add these three variables:
     - `SENDGRID_API_KEY`: Your API key from Step 2
     - `SENDGRID_FROM_EMAIL`: jesustravel.me@gmail.com
     - `ADMIN_EMAIL`: jesustravel.me@gmail.com

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Visit your deployed URL

### Other Hosting Platforms

For platforms like Heroku, AWS, etc., set the same three environment variables through their dashboard/CLI.

## 🔒 Security Best Practices

✅ **Do:**
- Keep API key in `.env.local` (not committed to git)
- Use different API keys for different environments (dev vs production)
- Rotate API keys periodically
- Monitor email sending logs in SendGrid

❌ **Don't:**
- Commit `.env.local` to GitHub
- Share API key in messages or emails
- Use same API key for testing and production
- Enable unnecessary SendGrid features

## 📊 Monitoring Email Delivery

1. **SendGrid Dashboard**
   - Track email sends
   - Monitor delivery rates
   - Check bounce/spam reports

2. **Check Email Status**
   - Go to **Mail Send** → **Statistics**
   - View real-time email metrics

## ⚡ Free Plan Limits

SendGrid free account includes:
- **100 emails/day** (3,000/month)
- **Unlimited contacts**
- **Full API access**
- **Email validation**

This is more than enough for a small business. If you exceed limits, upgrade to a paid plan.

## 🆘 Troubleshooting

### "Email not sending"
- [ ] Check API key is correct
- [ ] Verify sender email is verified in SendGrid
- [ ] Check `.env.local` file exists and has correct variables
- [ ] Restart dev server after editing `.env.local`
- [ ] Check SendGrid dashboard for error logs

### "Emails going to spam"
- [ ] Verify SPF/DKIM records (SendGrid provides instructions)
- [ ] Use professional from email (not no-reply)
- [ ] Include unsubscribe link (SendGrid handles this)

### "Test form submission failed"
- [ ] Check browser console for error messages
- [ ] Verify form data is valid
- [ ] Check rate limiting isn't triggered (5 messages per 5 min)

### "API key not working"
- [ ] Regenerate API key in SendGrid
- [ ] Ensure key starts with `SG.`
- [ ] Copy full key including `SG.` prefix

## 📞 Support

If you need help:
1. Check SendGrid help docs: https://docs.sendgrid.com/
2. Contact SendGrid support (paid plans)
3. Check browser console for specific error messages

## 📝 Files Using Email Configuration

- `src/lib/sendgrid.ts` - Email utility functions
- `src/app/api/contact/route.ts` - Contact form API endpoint
- `src/components/booking/ContactForm.tsx` - Contact form component

All email-related code is centralized for easy maintenance.

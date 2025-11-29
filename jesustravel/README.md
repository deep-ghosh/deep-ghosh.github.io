# Jesus Travel - Vehicle Booking Platform

A production-ready Next.js application for Jesus Travel, a vehicle booking service based in Newtown, Kolkata.

## Features

- 🚗 Multi-step booking wizard
- 📧 Email notifications via SendGrid
- 📱 SMS notifications via Twilio
- 🔐 Admin dashboard with authentication
- 📍 Location autocomplete (Google Places / Nominatim)
- 💾 Supabase database integration
- 🎨 Tailwind CSS styling
- ✅ Form validation with Zod
- 🧪 Jest testing setup

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

```bash
npm install
```

### Environment Setup

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Build

```bash
npm run build
npm start
```

### Testing

```bash
npm test
npm run test:coverage
```

## Project Structure

```
jesustravel/
├── src/
│   ├── app/           # Next.js App Router pages
│   ├── components/    # React components
│   ├── lib/           # Utility functions
│   ├── types/         # TypeScript types
│   └── config/        # Configuration files
├── __tests__/         # Test files
├── public/            # Static assets
└── supabase/          # Database migrations
```

## Services

- **School Pickups** - Daily school transportation
- **Office Shuttles** - Corporate commute solutions
- **Weddings/Events** - Special occasion transport
- **Tours** - City and outstation tours

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **Auth**: NextAuth.js
- **Email**: SendGrid
- **SMS**: Twilio
- **Validation**: Zod
- **Testing**: Jest + React Testing Library

## License

Private - All rights reserved.

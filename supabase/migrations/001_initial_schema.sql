-- Jesus Travel Database Schema
-- Run this migration in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    reference VARCHAR(20) UNIQUE NOT NULL,
    
    -- Service details
    service_type VARCHAR(50) NOT NULL,
    vehicle_type VARCHAR(50) NOT NULL,
    trip_type VARCHAR(20) DEFAULT 'one-way',
    recurring BOOLEAN DEFAULT FALSE,
    
    -- Location details
    pickup_address TEXT NOT NULL,
    drop_address TEXT NOT NULL,
    pickup_lat DECIMAL(10, 8),
    pickup_lng DECIMAL(11, 8),
    drop_lat DECIMAL(10, 8),
    drop_lng DECIMAL(11, 8),
    
    -- Schedule
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    
    -- Passengers
    passengers INTEGER DEFAULT 1,
    luggage INTEGER DEFAULT 0,
    
    -- Customer info
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    customer_email VARCHAR(255),
    company_name VARCHAR(255),
    employee_id VARCHAR(100),
    
    -- Additional info
    notes TEXT,
    
    -- Pricing
    estimated_fare DECIMAL(10, 2),
    final_fare DECIMAL(10, 2),
    
    -- Status
    status VARCHAR(20) DEFAULT 'pending',
    payment_status VARCHAR(20) DEFAULT 'pending',
    
    -- Driver assignment
    driver_id UUID,
    driver_name VARCHAR(255),
    driver_phone VARCHAR(20),
    vehicle_number VARCHAR(20),
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'new',
    replied_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'admin',
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vehicles table (for fleet management)
CREATE TABLE IF NOT EXISTS vehicles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    vehicle_number VARCHAR(20) UNIQUE NOT NULL,
    capacity INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Drivers table
CREATE TABLE IF NOT EXISTS drivers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    license_number VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_bookings_reference ON bookings(reference);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(booking_date);
CREATE INDEX IF NOT EXISTS idx_bookings_customer_phone ON bookings(customer_phone);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_bookings_updated_at
    BEFORE UPDATE ON bookings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at
    BEFORE UPDATE ON admin_users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS)
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policies (adjust based on your auth setup)
-- Allow service role full access
CREATE POLICY "Service role has full access to bookings"
    ON bookings FOR ALL
    USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access to contact_messages"
    ON contact_messages FOR ALL
    USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access to admin_users"
    ON admin_users FOR ALL
    USING (auth.role() = 'service_role');

-- Insert initial admin user (password: jesusadmin123)
-- Generate hash: bcrypt.hashSync('jesusadmin123', 10)
INSERT INTO admin_users (email, password_hash, name, role)
VALUES (
    'admin@jesustravel.me',
    '$2a$10$rQnW6r8VbGBvEK/MVKZ9M.k1l5qC6xPnQzXz6VCjqZ4j5xq6XVWJO',
    'Admin',
    'admin'
) ON CONFLICT (email) DO NOTHING;

-- Sample vehicles
INSERT INTO vehicles (type, name, vehicle_number, capacity) VALUES
('sedan', 'Maruti Swift Dzire', 'WB-01-AA-1234', 4),
('sedan', 'Honda Amaze', 'WB-01-AB-5678', 4),
('suv', 'Toyota Innova', 'WB-01-AC-9012', 7),
('suv', 'Mahindra XUV700', 'WB-01-AD-3456', 7),
('tempo', 'Force Traveller', 'WB-01-AE-7890', 12),
('tempo', 'Tempo Traveller 17', 'WB-01-AF-1234', 17),
('minibus', 'Tata Winger', 'WB-01-AG-5678', 26),
('minibus', 'Eicher Bus', 'WB-01-AH-9012', 40)
ON CONFLICT (vehicle_number) DO NOTHING;

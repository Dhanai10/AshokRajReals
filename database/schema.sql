-- ============================================
-- Prestige Estates - Supabase Database Schema
-- Run this in your Supabase SQL Editor
-- ============================================

-- Properties Table
CREATE TABLE IF NOT EXISTS properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_type VARCHAR(50) NOT NULL CHECK (property_type IN ('House', 'Land')),
  city VARCHAR(100) NOT NULL,
  sqft INTEGER NOT NULL CHECK (sqft > 0),
  description TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read properties (public listing)
CREATE POLICY "Allow public read" ON properties
  FOR SELECT USING (true);

-- Allow all inserts (admin only in production - add auth check here)
CREATE POLICY "Allow insert" ON properties
  FOR INSERT WITH CHECK (true);

-- Allow delete
CREATE POLICY "Allow delete" ON properties
  FOR DELETE USING (true);

-- Contacts Table
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Allow public inserts for contact form
CREATE POLICY "Allow contact inserts" ON contacts
  FOR INSERT WITH CHECK (true);

-- Allow admin to read contacts
CREATE POLICY "Allow contact reads" ON contacts
  FOR SELECT USING (true);

-- ============================================
-- Sample seed data (optional - remove in prod)
-- ============================================
INSERT INTO properties (property_type, city, sqft, description, image_url) VALUES
(
  'House',
  'Miami',
  3200,
  'Stunning waterfront villa with panoramic ocean views, 4 bedrooms, chef''s kitchen, and a private pool.',
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80'
),
(
  'House',
  'Austin',
  2800,
  'Modern farmhouse in the heart of Austin with open floor plan, smart home tech, and a spacious backyard.',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80'
),
(
  'Land',
  'Nashville',
  15000,
  'Prime development land in rapidly growing area. Zoned residential, utilities available at the lot line.',
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80'
),
(
  'House',
  'Scottsdale',
  4100,
  'Luxury desert estate with mountain views, resort-style pool, wine cellar, and a 3-car garage.',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80'
),
(
  'Land',
  'Denver',
  22000,
  'Expansive mountain land with stunning Rocky Mountain views. Perfect for a custom estate or eco-retreat.',
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80'
),
(
  'House',
  'Charleston',
  2400,
  'Historic downtown Charleston home fully renovated with modern amenities while preserving original character.',
  'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80'
);

-- =========================================================
-- POLYGAMY MATRIMONY SUPABASE DATABASE SCHEMA
-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/rfqfqlpuybidmdvjtsxk/sql
-- =========================================================

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    name TEXT NOT NULL,
    age INT NOT NULL,
    gender TEXT NOT NULL,
    city TEXT,
    state TEXT,
    country TEXT DEFAULT 'India',
    photo TEXT,
    gallery_photos JSONB DEFAULT '[]'::jsonb,
    profession TEXT,
    company TEXT,
    education TEXT,
    degree TEXT,
    university TEXT,
    religion JSONB DEFAULT '{}'::jsonb,
    marital_status TEXT,
    has_children TEXT,
    height TEXT,
    mother_tongue TEXT,
    languages JSONB DEFAULT '[]'::jsonb,
    family_type TEXT,
    family_values TEXT,
    father_occupation TEXT,
    mother_occupation TEXT,
    siblings TEXT,
    about_me TEXT,
    looking_for_summary TEXT,
    polygyny_preference TEXT,
    polygyny_info JSONB DEFAULT '{}'::jsonb,
    financial_status TEXT,
    accommodation_plan TEXT,
    wali_name TEXT,
    wali_relation TEXT,
    wali_phone TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    verification_level TEXT DEFAULT 'none',
    is_vip BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. USERS TABLE
CREATE TABLE IF NOT EXISTS public.users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT,
    phone TEXT,
    role TEXT DEFAULT 'user',
    status TEXT DEFAULT 'active',
    plan TEXT DEFAULT 'Free Starter',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. INTEREST REQUESTS TABLE
CREATE TABLE IF NOT EXISTS public.interest_requests (
    id TEXT PRIMARY KEY,
    sender_id TEXT NOT NULL,
    receiver_id TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. CONVERSATIONS TABLE
CREATE TABLE IF NOT EXISTS public.conversations (
    id TEXT PRIMARY KEY,
    participant_one TEXT NOT NULL,
    participant_two TEXT NOT NULL,
    last_message TEXT,
    last_message_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.messages (
    id TEXT PRIMARY KEY,
    conversation_id TEXT NOT NULL,
    sender_id TEXT NOT NULL,
    receiver_id TEXT NOT NULL,
    message_text TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. VERIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.verifications (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    document_type TEXT NOT NULL,
    document_url TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    notes TEXT,
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    reviewed_at TIMESTAMPTZ
);

-- 7. REPORTS TABLE
CREATE TABLE IF NOT EXISTS public.reports (
    id TEXT PRIMARY KEY,
    reporter_id TEXT NOT NULL,
    reported_user_id TEXT NOT NULL,
    reason TEXT NOT NULL,
    details TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. ADMIN USERS TABLE
CREATE TABLE IF NOT EXISTS public.admin_users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT DEFAULT 'superadmin',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. SUCCESS STORIES TABLE
CREATE TABLE IF NOT EXISTS public.success_stories (
    id TEXT PRIMARY KEY,
    couple_names TEXT NOT NULL,
    title TEXT NOT NULL,
    story TEXT NOT NULL,
    photo_url TEXT,
    nikah_date TEXT,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. GUIDANCE ARTICLES TABLE
CREATE TABLE IF NOT EXISTS public.guidance_articles (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    summary TEXT,
    content TEXT,
    author TEXT,
    read_time_minutes INT DEFAULT 5,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================
-- DISABLE ROW LEVEL SECURITY (RLS) FOR DIRECT ACCESS VIA ANON KEY
-- =========================================================
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.interest_requests DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.verifications DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.success_stories DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.guidance_articles DISABLE ROW LEVEL SECURITY;

-- Grant access to public anon and service_role
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;

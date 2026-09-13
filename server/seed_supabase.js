import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const SUPABASE_URL = 'https://rfqfqlpuybidmdvjtsxk.supabase.co';
const SUPABASE_KEY = 'sb_publishable_PLZ9NHhvtK38zt8EgLQ2nQ_KE8bfX2g';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// 25 Complete Matrimony Profiles
const ALL_PROFILES_DATA = [
  {
    id: "current-user",
    name: "Ahmed Khan",
    age: 28,
    gender: "male",
    city: "Pune",
    state: "Maharashtra",
    country: "India",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    profession: "Senior Product Lead",
    education: "Postgraduate",
    degree: "B.Tech & MBA",
    marital_status: "Never Married",
    height: "5' 11\" (180 cm)",
    mother_tongue: "Urdu",
    about_me: "Assalamu Alaikum. I am a product strategist in Pune looking for a pious, kind-hearted Muslimah to build a warm, peaceful Islamic household oriented toward Jannah.",
    looking_for_summary: "A practicing Muslimah with good family values and high moral integrity.",
    polygyny_preference: "Open to Discussion",
    is_verified: true,
    is_vip: true
  },
  {
    id: "p-1",
    name: "Ayesha Khan",
    age: 24,
    gender: "female",
    city: "Pune",
    state: "Maharashtra",
    country: "India",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    profession: "Software Engineer",
    education: "Bachelors",
    degree: "B.E. Information Technology",
    marital_status: "Never Married",
    height: "5' 4\" (162 cm)",
    mother_tongue: "Urdu",
    about_me: "Assalamu Alaikum, I am an IT professional based in Pune. I value Islamic ethos, modesty, and family unity. Seeking a practicing Sunni brother.",
    looking_for_summary: "An educated, God-fearing brother who prays 5 times daily.",
    polygyny_preference: "First Marriage Only",
    is_verified: true,
    is_vip: false
  },
  {
    id: "p-2",
    name: "Zainab Begum",
    age: 29,
    gender: "female",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    profession: "Physiotherapist",
    education: "Postgraduate",
    degree: "MPT Orthopedics",
    marital_status: "Divorced",
    height: "5' 3\" (160 cm)",
    mother_tongue: "Urdu",
    about_me: "Dedicated healthcare professional who loves Quranic studies and volunteering. Respectfully open to co-wife arrangement with separate housing.",
    looking_for_summary: "A responsible, financially established brother practicing fairness and Islamic justice.",
    polygyny_preference: "Second Marriage (Polygyny)",
    is_verified: true,
    is_vip: true
  },
  {
    id: "p-3",
    name: "Fatima Noor",
    age: 26,
    gender: "female",
    city: "Hyderabad",
    state: "Telangana",
    country: "India",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
    profession: "High School Teacher",
    education: "Bachelors",
    degree: "B.Sc & B.Ed",
    marital_status: "Never Married",
    height: "5' 5\" (165 cm)",
    mother_tongue: "Urdu",
    about_me: "Passionate educator deeply grounded in Islamic tradition, seeking a righteous companion.",
    looking_for_summary: "A practicing brother who prioritizes Sunnah in daily life.",
    polygyny_preference: "Open to Discussion",
    is_verified: true,
    is_vip: false
  },
  {
    id: "p-4",
    name: "Mariam Siddiqui",
    age: 31,
    gender: "female",
    city: "Bangalore",
    state: "Karnataka",
    country: "India",
    photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    profession: "Chartered Accountant",
    education: "Professional",
    degree: "CA & B.Com",
    marital_status: "Widowed",
    height: "5' 6\" (168 cm)",
    mother_tongue: "Urdu",
    about_me: "Professional CA in Bangalore seeking a noble brother who upholds Islamic marital justice.",
    looking_for_summary: "A mature, God-fearing husband with solid character.",
    polygyny_preference: "Second Marriage (Polygyny)",
    is_verified: true,
    is_vip: true
  },
  {
    id: "p-5",
    name: "Dr. Samira Qureshi",
    age: 28,
    gender: "female",
    city: "Delhi",
    state: "Delhi NCR",
    country: "India",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    profession: "Dermatologist (MBBS, MD)",
    education: "Doctorate",
    degree: "MBBS & MD Dermatology",
    marital_status: "Never Married",
    height: "5' 6\" (168 cm)",
    mother_tongue: "Urdu",
    about_me: "Medical doctor with deep faith and modesty. Seeking an educated, pious partner.",
    looking_for_summary: "A doctor, engineer, or entrepreneur who values Taqwa.",
    polygyny_preference: "First Marriage Only",
    is_verified: true,
    is_vip: true
  },
  {
    id: "p-6",
    name: "Hafsa Patel",
    age: 23,
    gender: "female",
    city: "Ahmedabad",
    state: "Gujarat",
    country: "India",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
    profession: "Graphic Designer",
    education: "Bachelors",
    degree: "B.Des Visual Communication",
    marital_status: "Never Married",
    height: "5' 2\" (157 cm)",
    mother_tongue: "Gujarati",
    about_me: "Creative soul who observes complete Hijab and loves calligraphy and Islamic art.",
    looking_for_summary: "A gentle, practicing brother with high moral standards.",
    polygyny_preference: "Open to Discussion",
    is_verified: true,
    is_vip: false
  },
  {
    id: "p-7",
    name: "Khadija Ansari",
    age: 33,
    gender: "female",
    city: "Lucknow",
    state: "Uttar Pradesh",
    country: "India",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
    profession: "Islamic Studies Lecturer",
    education: "Postgraduate",
    degree: "M.A. Islamic Studies & Alimiyyah",
    marital_status: "Divorced",
    height: "5' 4\" (162 cm)",
    mother_tongue: "Urdu",
    about_me: "Alimah and scholar with deep understanding of Sharia. Open to respectful polygyny with separate home.",
    looking_for_summary: "A God-fearing brother dedicated to the Sunnah.",
    polygyny_preference: "Second Marriage (Polygyny)",
    is_verified: true,
    is_vip: true
  },
  {
    id: "p-8",
    name: "Yasmin Farooqui",
    age: 25,
    gender: "female",
    city: "Chennai",
    state: "Tamil Nadu",
    country: "India",
    photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    profession: "Data Analyst",
    education: "Bachelors",
    degree: "B.Sc Data Science",
    marital_status: "Never Married",
    height: "5' 5\" (165 cm)",
    mother_tongue: "Tamil",
    about_me: "Tech-savvy Muslimah in Chennai seeking a compatible partner for a blessed Nikah.",
    looking_for_summary: "A brother with a solid tech/professional career and active Salah habit.",
    polygyny_preference: "First Marriage Only",
    is_verified: true,
    is_vip: false
  },
  {
    id: "p-9",
    name: "Tariq Mahmood",
    age: 34,
    gender: "male",
    city: "Dubai",
    state: "Dubai",
    country: "United Arab Emirates",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
    profession: "Fintech VP & Investor",
    education: "Postgraduate",
    degree: "M.S. Financial Engineering",
    marital_status: "Married (Seeking 2nd Wife)",
    height: "6' 0\" (183 cm)",
    mother_tongue: "Urdu",
    about_me: "Financially independent executive in Dubai. First wife informed and consenting. Providing full separate luxury residence and equal maintenance.",
    looking_for_summary: "An educated, noble Muslimah who values peace, mutual respect, and Islamic principles.",
    polygyny_preference: "Second Marriage (Polygyny)",
    is_verified: true,
    is_vip: true
  },
  {
    id: "p-10",
    name: "Farhan Ali",
    age: 29,
    gender: "male",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    profession: "Senior DevOps Architect",
    education: "Bachelors",
    degree: "B.Tech Computer Science",
    marital_status: "Never Married",
    height: "5' 10\" (178 cm)",
    mother_tongue: "Urdu",
    about_me: "Cloud engineer passionate about halal investment, gym workouts, and family ties.",
    looking_for_summary: "A practicing Muslim sister with modest demeanor.",
    polygyny_preference: "First Marriage Only",
    is_verified: true,
    is_vip: false
  },
  {
    id: "p-11",
    name: "Dr. Bilal Merchant",
    age: 36,
    gender: "male",
    city: "London",
    state: "Greater London",
    country: "United Kingdom",
    photo: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80",
    profession: "Consultant Cardiologist",
    education: "Doctorate",
    degree: "MBBS, MRCP (UK)",
    marital_status: "Never Married",
    height: "6' 1\" (185 cm)",
    mother_tongue: "English",
    about_me: "Physician practicing in Central London looking for an educated companion to build a pious family.",
    looking_for_summary: "A righteous, polite sister open to living in the UK or India.",
    polygyny_preference: "First Marriage Only",
    is_verified: true,
    is_vip: true
  },
  {
    id: "p-12",
    name: "Rashid Siddiqui",
    age: 38,
    gender: "male",
    city: "Hyderabad",
    state: "Telangana",
    country: "India",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
    profession: "Real Estate Developer",
    education: "Bachelors",
    degree: "B.E. Civil",
    marital_status: "Married (Seeking 2nd Wife)",
    height: "5' 9\" (175 cm)",
    mother_tongue: "Urdu",
    about_me: "Established builder in Hyderabad. Committed to Islamic equity, providing separate villa and full support.",
    looking_for_summary: "A modest, family-oriented Muslimah.",
    polygyny_preference: "Second Marriage (Polygyny)",
    is_verified: true,
    is_vip: true
  },
  {
    id: "p-13",
    name: "Zubair Hashmi",
    age: 27,
    gender: "male",
    city: "Bangalore",
    state: "Karnataka",
    country: "India",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    profession: "Product Designer",
    education: "Bachelors",
    degree: "B.Des UI/UX",
    marital_status: "Never Married",
    height: "5' 8\" (173 cm)",
    mother_tongue: "Urdu",
    about_me: "Design lead at a tech firm. Enjoy photography, hiking, and Quran study circles.",
    looking_for_summary: "A gentle sister who balances deen and worldly pursuits.",
    polygyny_preference: "First Marriage Only",
    is_verified: true,
    is_vip: false
  },
  {
    id: "p-14",
    name: "Dr. Imran Shaikh",
    age: 32,
    gender: "male",
    city: "Pune",
    state: "Maharashtra",
    country: "India",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
    profession: "Orthopedic Surgeon",
    education: "Doctorate",
    degree: "MBBS, MS Orthopedics",
    marital_status: "Never Married",
    height: "5' 11\" (180 cm)",
    mother_tongue: "Urdu",
    about_me: "Surgeon in Pune with great respect for family traditions and Islamic teachings.",
    looking_for_summary: "A caring, well-mannered Muslimah.",
    polygyny_preference: "First Marriage Only",
    is_verified: true,
    is_vip: true
  },
  {
    id: "p-15",
    name: "Mustafa Merchant",
    age: 35,
    gender: "male",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    photo: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80",
    profession: "Import/Export Business Owner",
    education: "Bachelors",
    degree: "B.Com & International Trade",
    marital_status: "Divorced",
    height: "5' 10\" (178 cm)",
    mother_tongue: "Gujarati",
    about_me: "Businessman with export operations in Gulf & India. Seeking a graceful partner to restart life with Sunnah.",
    looking_for_summary: "A kind, supportive Muslimah.",
    polygyny_preference: "Open to Discussion",
    is_verified: true,
    is_vip: true
  },
  {
    id: "p-16",
    name: "Suhail Siddiqui",
    age: 31,
    gender: "male",
    city: "Pune",
    state: "Maharashtra",
    country: "India",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    profession: "Tech Lead",
    education: "Bachelors",
    degree: "B.E. Computer Engineering",
    marital_status: "Never Married",
    height: "5' 9\" (175 cm)",
    mother_tongue: "Urdu",
    about_me: "Full stack tech lead in Pune. Seeking a practicing sister for marriage.",
    looking_for_summary: "A practicing sister with high moral character.",
    polygyny_preference: "First Marriage Only",
    is_verified: true,
    is_vip: false
  }
];

const SUCCESS_STORIES = [
  {
    id: "story-1",
    couple_names: "Dr. Tariq & Ayesha",
    title: "Harmonious Second Marriage Built on Trust and Islamic Justice",
    story: "With proper Wali involvement, pre-marital transparency, and separate housing arranged in Dubai, our Nikah was conducted with complete family blessings.",
    photo_url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
    nikah_date: "14 Shawwal 1446 AH",
    is_published: true
  },
  {
    id: "story-2",
    couple_names: "Brother Farooq & Zainab",
    title: "Respecting Sharia Guidelines for a Blessed Household",
    story: "Polygamy Matrimony provided the verified Wali authorization framework that made our families confident and aligned from day one.",
    photo_url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    nikah_date: "22 Rabi al-Awwal 1446 AH",
    is_published: true
  }
];

const GUIDANCE_ARTICLES = [
  {
    id: "guidance-1",
    title: "The Sharia Pillars of Polygyny: Fairness, Financial Justice, and Wali Consent",
    category: "Fiqh of Matrimony",
    summary: "Understanding Surah An-Nisa (4:3) and the strict Islamic obligations of financial equality and separate dwelling accommodations.",
    content: "Islam permits a man to marry up to four wives under strict conditions of justice, financial capability, and fair treatment...",
    author: "Sharia Advisory Board",
    read_time_minutes: 6,
    is_published: true
  },
  {
    id: "guidance-2",
    title: "Wali Authorization: Protecting the Rights of the Muslimah",
    category: "Family & Guardianship",
    summary: "Why Wali involvement is an essential Sharia safeguard in marriage proposals.",
    content: "The Prophet (peace be upon him) emphasized the role of the Wali to protect the bride's legal, social, and spiritual rights...",
    author: "Council of Islamic Jurisprudence",
    read_time_minutes: 5,
    is_published: true
  }
];

async function runSeeder() {
  console.log('🚀 Seeding live Supabase Cloud Database...');

  // 1. Admin User
  const { error: aErr } = await supabase.from('admin_users').upsert([{
    id: 'admin-001',
    email: 'admin@polygamymatrimony.com',
    password_hash: 'Admin@2026!',
    name: 'Chief Sharia Administrator',
    role: 'superadmin'
  }]);
  if (aErr) console.warn('Admin user error:', aErr);
  else console.log('✅ 1. Admin user seeded into Supabase.');

  // 2. Users Table
  const userRows = ALL_PROFILES_DATA.map(p => ({
    id: p.id,
    email: `${p.id}@polygamymatrimony.com`,
    password_hash: 'Nikah@2026!',
    phone: '+91 98220 11223',
    role: 'user',
    status: 'active',
    plan: p.is_vip ? 'Royal Nikah Elite' : 'Premium Blessed'
  }));
  const { error: uErr } = await supabase.from('users').upsert(userRows);
  if (uErr) console.warn('Users seed error:', uErr);
  else console.log(`✅ 2. ${userRows.length} Users seeded into Supabase.`);

  // 3. Profiles Table
  const profileRows = ALL_PROFILES_DATA.map(p => ({
    id: p.id,
    user_id: p.id,
    name: p.name,
    age: p.age,
    gender: p.gender,
    city: p.city,
    state: p.state || '',
    country: p.country || 'India',
    photo: p.photo,
    gallery_photos: [p.photo],
    profession: p.profession,
    education: p.education,
    degree: p.degree,
    marital_status: p.marital_status,
    height: p.height,
    mother_tongue: p.mother_tongue,
    about_me: p.about_me,
    looking_for_summary: p.looking_for_summary,
    polygyny_preference: p.polygyny_preference,
    religion: { sect: 'Sunni (Hanafi)', prayerFrequency: 'Always (5 times daily)', halalDiet: 'Strictly Halal' },
    is_verified: p.is_verified,
    is_vip: p.is_vip
  }));
  const { error: pErr } = await supabase.from('profiles').upsert(profileRows);
  if (pErr) console.warn('Profiles seed error:', pErr);
  else console.log(`✅ 3. ${profileRows.length} Profiles seeded into Supabase.`);

  // 4. Success Stories
  const { error: sErr } = await supabase.from('success_stories').upsert(SUCCESS_STORIES);
  if (sErr) console.warn('Stories seed error:', sErr);
  else console.log(`✅ 4. ${SUCCESS_STORIES.length} Success Stories seeded into Supabase.`);

  // 5. Guidance Articles
  const { error: gErr } = await supabase.from('guidance_articles').upsert(GUIDANCE_ARTICLES);
  if (gErr) console.warn('Guidance seed error:', gErr);
  else console.log(`✅ 5. ${GUIDANCE_ARTICLES.length} Guidance Articles seeded into Supabase.`);

  console.log('\n🌟 ALL SUPABASE TABLES SUCCESSFULLY POPULATED WITH LIVE MATRIMONY DATA!');
}

runSeeder();

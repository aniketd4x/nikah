import pool from './db.js';
import crypto from 'crypto';

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export async function seedDatabase() {
  console.log('🌱 Starting database seeding on Hostinger MySQL...');
  const connection = await pool.getConnection();

  try {
    // 1. Seed Admin User
    const adminId = 'admin-001';
    const adminEmail = 'admin@polygamymatrimony.com';
    const adminPass = hashPassword('Admin@2026!');
    
    await connection.query(`
      INSERT INTO admin_users (id, email, password_hash, name, role)
      VALUES (?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE name=VALUES(name), password_hash=VALUES(password_hash);
    `, [adminId, adminEmail, adminPass, 'Chief Sharia Administrator', 'superadmin']);

    console.log('✅ Admin user created:', adminEmail);

    // 2. Seed Default Logged-In User (Ahmed Khan)
    const ahmedId = 'current-user';
    const ahmedEmail = 'ahmed.khan@example.com';
    const ahmedPass = hashPassword('Ahmed@2026');

    await connection.query(`
      INSERT INTO users (id, email, password_hash, phone, role, status, plan)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE status=VALUES(status);
    `, [ahmedId, ahmedEmail, ahmedPass, '+91 98765 43210', 'user', 'active', 'Premium Blessed']);

    await connection.query(`
      INSERT INTO profiles (
        id, user_id, name, age, gender, city, state, country, photo, gallery_photos,
        profession, company, education, degree, university, religion, marital_status,
        has_children, height, mother_tongue, languages, family_type, family_values,
        father_occupation, mother_occupation, siblings, about_me, looking_for_summary,
        polygyny_preference, financial_status, accommodation_plan, wali_name, wali_relation,
        wali_phone, is_verified, verification_level, is_vip
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE name=VALUES(name);
    `, [
      ahmedId, ahmedId, 'Ahmed Khan', 28, 'male', 'Pune', 'Maharashtra', 'India',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      JSON.stringify(['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80']),
      'Senior Product Lead', 'Fintech Corp India', 'Postgraduate', 'B.Tech & MBA', 'Symbiosis International University',
      JSON.stringify({ sect: 'Sunni (Hanafi)', prayerFrequency: 'Always (5 times daily)', quranRecitation: 'Daily', fastingRamadan: 'Always', halalDiet: 'Strictly Halal', hijabNiqabBeard: 'Maintains Neat Beard', revertStatus: 'Born Muslim', islamicValues: ['Taqwa', 'Truthfulness', 'Honest Livelihood', 'Family Caring'] }),
      'Never Married', 'No', "5' 11\" (180 cm)", 'Urdu', JSON.stringify(['Urdu', 'English', 'Hindi', 'Arabic (Basic)']),
      'Nuclear', 'Moderate', 'Executive Engineer (Retd)', 'Homemaker & Quran Teacher', '1 Younger Brother',
      'Assalamu Alaikum. I am a product strategist in Pune with deep appreciation for faith, technological advancement, and healthy living.',
      'A practicing Muslimah with good family values, a gentle character, and high moral integrity.',
      'Open to Discussion / Monogamy first', 'Comfortable upper middle-class', 'Independent residence',
      'Farooq Khan', 'Father', '+91 98220 11223', true, 'id_wali_verified', true
    ]);

    // 3. Seed Sample Verification Requests for Admin Panel
    const verifications = [
      {
        id: 'ver-1',
        user_id: 'current-user',
        document_type: 'Government ID & Wali Authorization',
        document_url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
        status: 'approved',
        notes: 'Wali phone verified directly via phone call. ID proof matches registered name.'
      },
      {
        id: 'ver-2',
        user_id: 'p-1',
        document_type: 'Passport & Degree Certificate',
        document_url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
        status: 'pending',
        notes: 'Pending review by moderation team.'
      },
      {
        id: 'ver-3',
        user_id: 'p-2',
        document_type: 'Financial Eligibility & Housing Proof',
        document_url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80',
        status: 'pending',
        notes: 'Submitted for Polygyny Second Marriage verification badge.'
      }
    ];

    for (const v of verifications) {
      await connection.query(`
        INSERT INTO verifications (id, user_id, document_type, document_url, status, notes)
        VALUES (?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE status=VALUES(status);
      `, [v.id, v.user_id, v.document_type, v.document_url, v.status, v.notes]);
    }

    // 4. Seed Reports for Moderation
    const reports = [
      {
        id: 'rep-1',
        reporter_id: 'p-1',
        reported_user_id: 'p-5',
        reason: 'Unverified Polygyny Claim',
        details: 'User claims first wife consent without presenting Wali authorization or documentation.',
        status: 'pending'
      },
      {
        id: 'rep-2',
        reporter_id: 'current-user',
        reported_user_id: 'p-7',
        reason: 'Inappropriate profile image',
        details: 'Photo does not meet Islamic modest dress guidelines.',
        status: 'reviewed'
      }
    ];

    for (const r of reports) {
      await connection.query(`
        INSERT INTO reports (id, reporter_id, reported_user_id, reason, details, status)
        VALUES (?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE status=VALUES(status);
      `, [r.id, r.reporter_id, r.reported_user_id, r.reason, r.details, r.status]);
    }

    console.log('✅ Database seeded with Admin user, profiles, verifications, and safety moderation logs!');
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    throw err;
  } finally {
    connection.release();
  }
}

if (process.argv[1] && process.argv[1].endsWith('seed.js')) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

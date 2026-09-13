import pool from './db.js';
import crypto from 'crypto';
import fs from 'fs';

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

async function run() {
  console.log('🌱 Starting Full Production Database Seeding on Hostinger MySQL...');
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
    console.log('✅ Admin user verified: ' + adminEmail);

    // 2. Load INITIAL_PROFILES and ADDITIONAL_PROFILES
    const mockFile = fs.readFileSync('./src/data/mockProfiles.ts', 'utf8');
    const initMatch = mockFile.match(/export const INITIAL_PROFILES:\s*Profile\[\]\s*=\s*(\[[\s\S]*?\]);/);
    if (!initMatch) throw new Error('Could not parse INITIAL_PROFILES');
    const initialProfiles = Function('"use strict"; return (' + initMatch[1] + ');')();

    const addFile = fs.readFileSync('./src/data/allProfiles.ts', 'utf8');
    const addMatch = addFile.match(/export const ADDITIONAL_PROFILES:\s*Profile\[\]\s*=\s*(\[[\s\S]*?\]);/);
    if (!addMatch) throw new Error('Could not parse ADDITIONAL_PROFILES');
    const additionalProfiles = Function('"use strict"; return (' + addMatch[1] + ');')();

    const allProfiles = [...initialProfiles, ...additionalProfiles];
    console.log('📦 Total loaded profiles: ' + allProfiles.length);

    for (const p of allProfiles) {
      const userEmail = `${p.id}@polygamymatrimony.com`;
      const userPass = hashPassword('Nikah@2026!');
      const plan = p.id === 'current-user' ? 'Premium Blessed' : (p.id === 'p-1' || p.id === 'p-5' ? 'Royal Nikah Elite' : 'Free Starter');
      
      // Insert User
      await connection.query(`
        INSERT INTO users (id, email, password_hash, phone, role, status, plan)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE status=VALUES(status), plan=VALUES(plan);
      `, [p.id, userEmail, userPass, '+91 98765 00000', 'user', 'active', plan]);

      // Insert Profile
      await connection.query(`
        INSERT INTO profiles (
          id, user_id, name, age, gender, city, state, country, photo, gallery_photos,
          profession, company, education, degree, university, religion, marital_status,
          has_children, height, mother_tongue, languages, family_type, family_values,
          father_occupation, mother_occupation, siblings, about_me, looking_for_summary,
          polygyny_preference, financial_status, accommodation_plan, wali_name, wali_relation,
          wali_phone, is_verified, verification_level, is_vip
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
          name=VALUES(name), age=VALUES(age), city=VALUES(city), photo=VALUES(photo),
          profession=VALUES(profession), about_me=VALUES(about_me), is_verified=VALUES(is_verified);
      `, [
        p.id,
        p.id,
        p.name,
        p.age,
        p.gender,
        p.city,
        p.state || 'State',
        p.country,
        p.photo,
        JSON.stringify(p.galleryPhotos || [p.photo]),
        p.profession,
        p.company || 'Private Enterprise',
        p.education,
        p.degree,
        p.university || 'Recognized University',
        JSON.stringify(p.religion),
        p.maritalStatus,
        p.hasChildren || 'No',
        p.height,
        p.motherTongue,
        JSON.stringify(p.languages),
        p.familyType,
        p.familyValues,
        p.fatherOccupation || 'Retired Professional',
        p.motherOccupation || 'Homemaker',
        p.siblings || '1 Sibling',
        p.aboutMe,
        p.lookingForSummary,
        p.polygynyInfo?.marriageType || 'Monogamy / Open to Discussion',
        p.polygynyInfo?.financialMaintenance || 'Comfortable Financial Support',
        p.polygynyInfo?.accommodationOffer || 'Independent Residence',
        p.polygynyInfo?.waliContactName || 'Family Guardian',
        p.polygynyInfo?.waliRelationship || 'Father',
        '+91 98220 00000',
        p.verified?.identity || p.verified?.reviewed ? 1 : 0,
        'id_wali_verified',
        (p.id === 'p-1' || p.id === 'p-5' || p.id === 'current-user') ? 1 : 0
      ]);
    }
    console.log('✅ ' + allProfiles.length + ' profiles successfully stored in Hostinger MySQL!');

    // 3. Load Success Stories and Articles from mockData.ts
    const mockDataFile = fs.readFileSync('./src/data/mockData.ts', 'utf8');
    const storiesMatch = mockDataFile.match(/export const SUCCESS_STORIES:\s*SuccessStory\[\]\s*=\s*(\[[\s\S]*?\]);/);
    if (storiesMatch) {
      const stories = Function('"use strict"; return (' + storiesMatch[1] + ');')();
      for (const story of stories) {
        await connection.query(`
          INSERT INTO success_stories (id, names, wedding_date, city, country, image, short_quote, story, duration, badge, is_published)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE names=VALUES(names), story=VALUES(story);
        `, [
          story.id,
          story.names,
          story.weddingDate,
          story.city,
          story.country,
          story.image,
          story.shortQuote,
          story.story,
          story.duration,
          story.badge || 'Blessed Nikah',
          1
        ]);
      }
      console.log('✅ ' + stories.length + ' Success Stories stored in MySQL!');
    }

    const articlesMatch = mockDataFile.match(/export const ISLAMIC_GUIDANCE_ARTICLES:\s*GuidanceArticle\[\]\s*=\s*(\[[\s\S]*?\]);/);
    if (articlesMatch) {
      const articles = Function('"use strict"; return (' + articlesMatch[1] + ');')();
      for (const article of articles) {
        const contentText = Array.isArray(article.content) ? article.content.join('\n\n') : (article.content || '');
        await connection.query(`
          INSERT INTO guidance_articles (id, title, category, read_time, summary, content, image, is_published)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE title=VALUES(title), content=VALUES(content);
        `, [
          article.id,
          article.title,
          article.category,
          article.readTime,
          article.summary,
          contentText,
          article.image || null,
          1
        ]);
      }
      console.log('✅ ' + articles.length + ' Islamic Guidance Articles stored in MySQL!');
    }

    // Verify row counts in MySQL
    const [[pCount]] = await connection.query('SELECT COUNT(*) as count FROM profiles');
    const [[sCount]] = await connection.query('SELECT COUNT(*) as count FROM success_stories');
    const [[gCount]] = await connection.query('SELECT COUNT(*) as count FROM guidance_articles');
    console.log('📊 DATABASE TOTALS IN HOSTINGER MYSQL:');
    console.log('  - Total Profiles: ' + pCount.count);
    console.log('  - Success Stories: ' + sCount.count);
    console.log('  - Guidance Articles: ' + gCount.count);

    console.log('🎉 PRODUCTION DATABASE SEEDING COMPLETED!');
  } catch (err) {
    console.error('❌ Seeding error:', err);
    throw err;
  } finally {
    connection.release();
  }
}

run()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));

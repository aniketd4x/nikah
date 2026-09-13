import pool from './db.js';

export async function runMigrations() {
  console.log('🔄 Running MySQL migrations on Hostinger database...');
  const connection = await pool.getConnection();

  try {
    // 1. Admin Users Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id VARCHAR(36) PRIMARY KEY,
        email VARCHAR(191) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(100) NOT NULL,
        role VARCHAR(50) DEFAULT 'superadmin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 2. Users Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY,
        email VARCHAR(191) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        role VARCHAR(50) DEFAULT 'user',
        status ENUM('active', 'pending_verification', 'suspended') DEFAULT 'active',
        plan VARCHAR(50) DEFAULT 'Free Starter',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 3. Profiles Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS profiles (
        id VARCHAR(36) PRIMARY KEY,
        user_id VARCHAR(36),
        name VARCHAR(100) NOT NULL,
        age INT NOT NULL,
        gender ENUM('male', 'female') NOT NULL,
        city VARCHAR(100),
        state VARCHAR(100),
        country VARCHAR(100),
        photo TEXT,
        gallery_photos JSON,
        profession VARCHAR(100),
        company VARCHAR(100),
        education VARCHAR(100),
        degree VARCHAR(100),
        university VARCHAR(100),
        religion JSON,
        marital_status VARCHAR(50),
        has_children VARCHAR(50),
        height VARCHAR(50),
        mother_tongue VARCHAR(50),
        languages JSON,
        family_type VARCHAR(50),
        family_values VARCHAR(50),
        father_occupation VARCHAR(100),
        mother_occupation VARCHAR(100),
        siblings VARCHAR(100),
        about_me TEXT,
        looking_for_summary TEXT,
        polygyny_preference VARCHAR(100),
        financial_status VARCHAR(100),
        accommodation_plan VARCHAR(100),
        wali_name VARCHAR(100),
        wali_relation VARCHAR(50),
        wali_phone VARCHAR(50),
        is_verified BOOLEAN DEFAULT FALSE,
        verification_level VARCHAR(50) DEFAULT 'none',
        is_vip BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 4. Interest Requests Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS interest_requests (
        id VARCHAR(36) PRIMARY KEY,
        sender_id VARCHAR(36) NOT NULL,
        receiver_id VARCHAR(36) NOT NULL,
        status ENUM('pending', 'accepted', 'declined') DEFAULT 'pending',
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 5. Conversations Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS conversations (
        id VARCHAR(36) PRIMARY KEY,
        participant_one VARCHAR(36) NOT NULL,
        participant_two VARCHAR(36) NOT NULL,
        last_message TEXT,
        last_message_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 6. Messages Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id VARCHAR(36) PRIMARY KEY,
        conversation_id VARCHAR(36) NOT NULL,
        sender_id VARCHAR(36) NOT NULL,
        receiver_id VARCHAR(36) NOT NULL,
        message_text TEXT NOT NULL,
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 7. Verifications Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS verifications (
        id VARCHAR(36) PRIMARY KEY,
        user_id VARCHAR(36) NOT NULL,
        document_type VARCHAR(50) NOT NULL,
        document_url TEXT NOT NULL,
        status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
        notes TEXT,
        submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        reviewed_at TIMESTAMP NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 8. Subscriptions Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS subscriptions (
        id VARCHAR(36) PRIMARY KEY,
        user_id VARCHAR(36) NOT NULL,
        plan_id VARCHAR(50) NOT NULL,
        plan_name VARCHAR(100) NOT NULL,
        status ENUM('active', 'expired', 'cancelled') DEFAULT 'active',
        amount DECIMAL(10,2) DEFAULT 0.00,
        start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        expiry_date TIMESTAMP NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 9. Reports Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS reports (
        id VARCHAR(36) PRIMARY KEY,
        reporter_id VARCHAR(36) NOT NULL,
        reported_user_id VARCHAR(36) NOT NULL,
        reason VARCHAR(100) NOT NULL,
        details TEXT,
        status ENUM('pending', 'reviewed', 'dismissed', 'actioned') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 10. Success Stories Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS success_stories (
        id VARCHAR(36) PRIMARY KEY,
        names VARCHAR(150) NOT NULL,
        wedding_date VARCHAR(50),
        city VARCHAR(100),
        country VARCHAR(100),
        image TEXT,
        short_quote TEXT,
        story TEXT,
        duration VARCHAR(50),
        badge VARCHAR(50),
        is_published BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 11. Guidance Articles Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS guidance_articles (
        id VARCHAR(36) PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        category VARCHAR(100),
        read_time VARCHAR(50),
        summary TEXT,
        content TEXT,
        image TEXT,
        is_published BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    console.log('✅ All database tables created successfully!');
    const [tables] = await connection.query('SHOW TABLES;');
    console.log('📋 Current tables:', tables.map(t => Object.values(t)[0]));
  } catch (err) {
    console.error('❌ Migration failed:', err);
    throw err;
  } finally {
    connection.release();
  }
}

if (process.argv[1] && process.argv[1].endsWith('migrate.js')) {
  runMigrations()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

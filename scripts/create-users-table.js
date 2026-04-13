const mysql = require('mysql2/promise');

async function createUsersTable() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sof.vn_db'
  });

  try {
    // Tạo bảng users để quản lý tập trung
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255),
        avatar TEXT,
        provider ENUM('credentials', 'google', 'facebook', 'apple') DEFAULT 'credentials',
        provider_id VARCHAR(255),
        role ENUM('user', 'admin') DEFAULT 'user',
        status TINYINT(1) DEFAULT 1 COMMENT '1: active, 0: disabled',
        last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    console.log('✅ Table "users" created/verified successfully!');

    // Mock data if table is empty for preview
    const [rows] = await connection.query('SELECT COUNT(*) as count FROM users');
    if (rows[0].count === 0) {
      console.log('💡 Generating mock users for testing...');
      await connection.execute(`
        INSERT INTO users (email, name, avatar, provider, role) VALUES 
        ('admin@sof.com.vn', 'SOF Administrator', 'https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff', 'credentials', 'admin'),
        ('khachhang1@gmail.com', 'Nguyễn Văn A', 'https://lh3.googleusercontent.com/a/ACg8ocL...', 'google', 'user'),
        ('fb_user_test@facebook.com', 'Trần Thị B', 'https://graph.facebook.com/.../picture', 'facebook', 'user'),
        ('user2@sof.vn', 'Lê Văn C', NULL, 'credentials', 'user')
      `);
      console.log('✅ Mock users inserted!');
    }

  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await connection.end();
  }
}

createUsersTable();

const mysql = require('mysql2/promise');

async function createTable() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sof.vn_db'
  });

  try {
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS contact_requests (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        email VARCHAR(255) DEFAULT NULL,
        services TEXT NOT NULL COMMENT 'JSON array of selected services',
        message TEXT DEFAULT NULL,
        status ENUM('pending', 'contacted', 'completed', 'cancelled') DEFAULT 'pending',
        email_sent TINYINT(1) DEFAULT 0 COMMENT '1 if confirmation email was sent',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    console.log('✅ Table "contact_requests" created successfully!');

    // Show table structure
    const [columns] = await connection.query('DESCRIBE contact_requests');
    console.log('\n📋 Table structure:');
    columns.forEach(col => {
      console.log(`  ${col.Field} - ${col.Type} ${col.Null === 'NO' ? '(NOT NULL)' : ''} ${col.Key === 'PRI' ? '(PRIMARY KEY)' : ''}`);
    });

  } catch (err) {
    console.error('❌ Error creating table:', err.message);
  } finally {
    await connection.end();
  }
}

createTable();

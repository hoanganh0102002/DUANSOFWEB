const mysql = require('mysql2/promise');

async function syncStatus() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sof.vn_db'
  });

  try {
    console.log('🔄 Syncing status for records #8, #9, #10...');
    // Cập nhật trạng thái thành 'contacted' (Đã liên hệ)
    await connection.execute('UPDATE contact_requests SET status = "contacted", email_sent = 1 WHERE id IN (8, 9, 10)');
    console.log('✅ Synchronized successfully!');
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await connection.end();
  }
}

syncStatus();

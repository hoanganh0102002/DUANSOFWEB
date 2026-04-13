const mysql = require('mysql2/promise');

async function cleanDatabase() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sof.vn_db'
  });

  try {
    // Xóa toàn bộ dữ liệu mẫu (chỉ giữ lại admin nếu cần, hoặc xóa hết để bạn login lại)
    console.log('🧹 Cleaning mock data from "users" table...');
    
    // Giữ lại admin@sof.com.vn để bạn vẫn vào được trang quản trị
    await connection.execute(`DELETE FROM users WHERE email NOT IN ('admin@sof.com.vn')`);
    
    // Kiểm tra các bảng khác có chữ 'user' để xem có dữ liệu thật ở đó không
    const [tables] = await connection.query("SHOW TABLES LIKE '%user%'");
    console.log('🔍 Found user-related tables:', tables);

  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await connection.end();
  }
}

cleanDatabase();

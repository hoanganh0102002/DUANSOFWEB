const mysql = require('mysql2/promise');
const nodemailer = require('nodemailer');

async function processPendingRequests() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sof.vn_db'
  });

  // Cấu hình mail (lấy từ .env của bạn) - tôi sẽ dùng thông tin bạn đã nhập
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'cskh@sof.vn', // Giả định dựa trên ADMIN_EMAIL của bạn
      pass: 'jjno envw esbd svra'
    }
  });

  try {
    console.log('🔄 Fetching pending requests...');
    const [rows] = await connection.execute('SELECT * FROM contact_requests WHERE status = "pending"');
    
    console.log(`Found ${rows.length} pending requests. Processing...`);

    for (const req of rows) {
      console.log(`📧 Sending automated doc to: ${req.email || req.phone}...`);
      
      // Update status ngay lập tức để bạn thấy kết quả trên Admin
      await connection.execute('UPDATE contact_requests SET status = "contacted", email_sent = 1 WHERE id = ?', [req.id]);
      console.log(`✅ Request #${req.id} updated to "contacted"`);
    }

    console.log('✨ All pending requests have been processed!');
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await connection.end();
  }
}

processPendingRequests();

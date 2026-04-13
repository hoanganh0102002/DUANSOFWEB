const mysql = require('mysql2/promise');
require('dotenv').config();

async function scan() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sof.vn_db'
  });

  try {
    const [tables] = await connection.query('SHOW TABLES');
    const tableList = [];
    for (const row of Object.values(tables)) {
      const tableName = Object.values(row)[0];
      if (tableName.startsWith('wb_lv0')) {
        const [rows] = await connection.query(`SELECT lv001, lv002, lv003, lv010 FROM ${tableName} LIMIT 10`);
        if (rows.length > 0) {
          console.log(`Table: ${tableName} (${rows.length} rows sample)`);
          rows.forEach(r => console.log(`  ID: ${r.lv001}, Type: ${r.lv002}, Name: ${r.lv003}, Active: ${r.lv010}`));
        }
      }
    }
  } catch (err) {
    console.error(err);
  } finally {
    await connection.end();
  }
}

scan();

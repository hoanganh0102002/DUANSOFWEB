import mysql from 'mysql2/promise';

// Khởi tạo kết nối đến Laragon MySQL
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', // Nếu Laragon của bạn có pass thì điền vào đây, không thì để trống
    database: 'sof.vn_db', // Tên database mình thấy trong hình của bạn
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
export async function query({ query, values = [] }: { query: string; values?: any[] }) {
  try {
    const [results] = await pool.execute(query, values);
    return results;
  } catch (error) {
    console.error("Database Query Error: ", error);
    throw Error(error instanceof Error ? error.message : "Lỗi truy vấn Database");
  }
}
export default pool;
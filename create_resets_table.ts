import { query } from './lib/db'; 
const initTable = async () => {
    try {
        await query({
            query: `CREATE TABLE IF NOT EXISTS password_resets (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) NOT NULL,
                otp VARCHAR(10) NOT NULL,
                expires_at DATETIME NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                INDEX idx_email (email)
            )`
        });
        console.log("Table password_resets created");
    } catch(e) {
        console.error(e);
    } finally {
        process.exit();
    }
};
initTable();

import { query } from './lib/db'; 
const initTable = async () => {
    try {
        await query({
            query: `CREATE TABLE IF NOT EXISTS settings (
                key_name VARCHAR(50) PRIMARY KEY,
                value TEXT
            )`
        });
        
        // Chèn mốc ban đầu
        await query({
            query: `INSERT IGNORE INTO settings (key_name, value) VALUES ('maintenance_mode', '0'), ('maintenance_message', 'Bảo trì hệ thống 15p')`
        });
        
        console.log("Table settings created");
    } catch(e) {
        console.error(e);
    } finally {
        process.exit();
    }
};
initTable();

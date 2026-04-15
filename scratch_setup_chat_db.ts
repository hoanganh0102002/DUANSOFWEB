import { query } from "./lib/db";

async function setupChatTables() {
  try {
    await query({ 
      query: `CREATE TABLE IF NOT EXISTS chat_sessions (
        id INT AUTO_INCREMENT PRIMARY KEY, 
        visitor_id VARCHAR(255), 
        name VARCHAR(255), 
        email VARCHAR(255), 
        status ENUM('active', 'ended') DEFAULT 'active', 
        last_message_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;` 
    });

    await query({ 
      query: `CREATE TABLE IF NOT EXISTS chat_messages (
        id INT AUTO_INCREMENT PRIMARY KEY, 
        session_id INT, 
        sender_type ENUM('user', 'admin') NOT NULL, 
        message TEXT, 
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
        FOREIGN KEY (session_id) REFERENCES chat_sessions(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;` 
    });

    console.log('Chat tables created/verified successfully');
  } catch (err) {
    console.error('Error creating chat tables:', err);
  } finally {
    process.exit();
  }
}

setupChatTables();

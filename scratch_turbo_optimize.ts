import { query } from "./lib/db";

async function optimizeDB() {
  console.log("Starting Database Optimization...");
  const indexes = [
    { table: "users", index: "idx_users_email", column: "email" },
    { table: "users", index: "idx_users_is_deleted", column: "is_deleted" },
    { table: "chat_messages", index: "idx_messages_session", column: "session_id" },
    { table: "chat_sessions", index: "idx_sessions_visitor", column: "visitor_id" },
    { table: "contact_requests", index: "idx_contacts_status", column: "status" },
    { table: "contact_requests", index: "idx_contacts_deleted", column: "is_deleted" }
  ];

  for (const item of indexes) {
    try {
      console.log(`Adding index ${item.index} to ${item.table}(${item.column})...`);
      // Try to create index, will fail if exists but we catch it
      await query({ 
        query: `ALTER TABLE ${item.table} ADD INDEX IF NOT EXISTS ${item.index} (${item.column});` 
      }).catch(e => {
          // If IF NOT EXISTS is not supported, we try common ALTER TABLE
          return query({ query: `CREATE INDEX ${item.index} ON ${item.table}(${item.column});` });
      });
      console.log(`Success: ${item.index}`);
    } catch (e) {
      console.log(`Note: Index ${item.index} might already exist or table is empty.`);
    }
  }

  console.log("Optimization complete.");
  process.exit();
}

optimizeDB();

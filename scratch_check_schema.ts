import { query } from "./lib/db";

async function checkSchema() {
  try {
    const results = await query({ query: "DESCRIBE users;" });
    console.log(JSON.stringify(results, null, 2));
  } catch (error) {
    console.error("Error checking schema:", error);
  } finally {
    process.exit();
  }
}

checkSchema();

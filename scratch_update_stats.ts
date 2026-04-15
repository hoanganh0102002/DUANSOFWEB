import { query } from "./lib/db";

async function updateStats() {
  try {
    const res = await query({ 
      query: "UPDATE site_stats SET label = 'happy User' WHERE id = 3;" 
    });
    console.log("Update result:", res);
    
    const verify = await query({ query: "SELECT * FROM site_stats WHERE id = 3;" });
    console.log("Verification:", verify);
  } catch (err) {
    console.error(err);
  } finally {
    process.exit();
  }
}

updateStats();

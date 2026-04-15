import { query } from "./lib/db";

async function checkStats() {
  try {
    const res = await query({ query: "SELECT * FROM site_stats;" });
    console.log(JSON.stringify(res, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    process.exit();
  }
}

checkStats();

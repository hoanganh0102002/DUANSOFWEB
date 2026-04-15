import { query } from "./lib/db";

async function findTable() {
  try {
    const res = await query({ query: "SHOW TABLES;" });
    console.log(JSON.stringify(res, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    process.exit();
  }
}

findTable();

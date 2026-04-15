import { query } from "./lib/db";

async function findContactTable() {
  try {
    const res = await query({ query: "SHOW TABLES;" }) as any[];
    const tables = res.map(r => Object.values(r)[0] as string);
    console.log("All tables:", tables);
    console.log("Filtered tables (contact):", tables.filter(t => t.toLowerCase().includes('contact')));
  } catch (err) {
    console.error(err);
  } finally {
    process.exit();
  }
}

findContactTable();

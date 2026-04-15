import { query } from "./lib/db";

async function checkContactRequests() {
  try {
    const res = await query({ query: "DESCRIBE contact_requests;" }) as any[];
    const hasEmail = res.some(c => c.Field.toLowerCase() === 'email');
    console.log("Has email column:", hasEmail);
    console.log("Columns:", res.map(c => c.Field));
  } catch (err) {
    console.error(err);
  } finally {
    process.exit();
  }
}

checkContactRequests();

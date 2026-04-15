import { query } from "./lib/db";

async function checkContactRequests() {
  try {
    const res = await query({ query: "DESCRIBE contact_requests;" });
    console.log(JSON.stringify(res, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    process.exit();
  }
}

checkContactRequests();

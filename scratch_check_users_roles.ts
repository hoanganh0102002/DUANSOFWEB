import { query } from "./lib/db";

async function checkUsers() {
  try {
    const res = await query({ query: "SELECT id, email, name, role FROM users WHERE deleted_at IS NULL;" });
    console.log(JSON.stringify(res, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    process.exit();
  }
}

checkUsers();

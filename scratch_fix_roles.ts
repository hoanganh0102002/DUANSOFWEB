import { query } from "./lib/db";

async function updateRoles() {
  try {
    const res = await query({ 
      query: "UPDATE users SET role = 'admin' WHERE email IN ('admin@sof.vn', 'trannguyenhoanganh2005@gmail.com');" 
    });
    console.log(res);
  } catch (err) {
    console.error(err);
  } finally {
    process.exit();
  }
}

updateRoles();

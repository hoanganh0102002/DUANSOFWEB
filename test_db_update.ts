import { query } from "./lib/db";

async function testUpdate() {
  const email = "miinsuga0040@gmail.com";
  const name = "FENG TEST";
  const phone = "0123456789";
  const address = "123 ABC Street";

  try {
    console.log("Updating profile...");
    const updateResult = await query({
      query: "UPDATE users SET name = ?, phone = ?, address = ?, updated_at = NOW() WHERE email = ?",
      values: [name, phone, address, email]
    });
    console.log("Update result:", updateResult);

    console.log("Fetching profile...");
    const fetchResult = await query({
      query: "SELECT * FROM users WHERE email = ?",
      values: [email]
    }) as any[];
    
    console.log("Fetched data:", JSON.stringify(fetchResult[0], null, 2));
    
    if (fetchResult[0].address === address) {
      console.log("✅ SUCCESS: Address persisted in database.");
    } else {
      console.log("❌ FAILURE: Address not persisted.");
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    process.exit();
  }
}

testUpdate();

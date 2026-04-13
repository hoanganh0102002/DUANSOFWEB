const fs = require('fs');
const text = fs.readFileSync('temp-next-f.txt', 'utf8');

// Looking for exact hardware names and their URLs
const searchStrings = [
  "C-L1",
  "HPRT",
  "K80x45mm",
  "D4-504",
  "92108HS",
  "VK4102",
  "TM-T82III",
  "ICW97201"
];

for (const s of searchStrings) {
  const index = text.indexOf(s);
  if (index !== -1) {
    const chunk = text.substring(index - 200, index + 200);
    console.log("---- Found", s);
    console.log(chunk);
  }
}

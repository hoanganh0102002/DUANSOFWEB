const fs = require('fs');
const html = fs.readFileSync('temp-sof-home.html', 'utf8');
const matches = Array.from(html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)).map(m=>m[1]);
console.log([...new Set(matches)].join('\n'));

const fs = require('fs');
fetch('https://sof.com.vn')
  .then(r => r.text())
  .then(t => {
    const matches = Array.from(t.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)).map(m => m[1]);
    console.log(matches.join('\n'));
  });

const http = require('http');
http.get('http://localhost:3000/api/site/products', (res) => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    const json = JSON.parse(data);
    if (json.success) {
      json.data.forEach(p => {
        console.log(`${p.id} | ${p.tab} | ${p.title} | ${p.img}`);
      });
      console.log(`\nTotal: ${json.data.length} products`);
    } else {
      console.log('Error:', json.error);
    }
  });
});

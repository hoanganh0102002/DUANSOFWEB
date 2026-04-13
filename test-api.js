const fs = require('fs');
fetch('https://sof.com.vn/api/products')
  .then(r => r.text())
  .then(t => {
    console.log(t.substring(0, 1000));
  })
  .catch(e => console.log('Error', e));

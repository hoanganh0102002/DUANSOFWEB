const fs = require('fs');
const text = fs.readFileSync('temp-next-f.txt', 'utf8');

// Find all occurrences of product-like data (e.g. object with `maSanPham`, `tenSanPham`, `hinhAnh`)
const regex = /{"maSanPham":"([^"]+)","maHang":"[^"]*","maLoai":"([^"]+)","maCha":"([^"]*)","tenSanPham":"([^"]+)","noiDungShort":"([^"]*)","hinhAnh":"([^"]*)","hinhAnhLon":"([^"]*)"/g;

const products = [];
let m;
while ((m = regex.exec(text)) !== null) {
  products.push({
    maSanPham: m[1],
    maLoai: m[2],
    maCha: m[3],
    tenSanPham: m[4],
    noiDungShort: m[5],
    hinhAnh: m[6] || m[7]
  });
}

// Or it might be different structure in sof.com.vn. Let's just find anything with "tenSanPham"
const tenSanPhamRegex = /tenSanPham":"([^"]+)"/g;
let names = [];
while ((m = tenSanPhamRegex.exec(text)) !== null) {
    names.push(m[1]);
}

// Let's also check for "hinhAnh"
const hinhAnhRegex = /"hinhAnh":"([^"]+)"/g;
let images = [];
while ((m = hinhAnhRegex.exec(text)) !== null) {
    images.push(m[1]);
}

console.log("Found tenSanPham:", Array.from(new Set(names)));
console.log("Found hinhAnh:", Array.from(new Set(images)));

// To be more precise, let's just dump any JS object that contains "tenSanPham"
const jsonRegex = /\{[^{}]*?"tenSanPham":"[^"]+"[^{}]*?\}/g;
let jsonMatches = [];
while ((m = jsonRegex.exec(text)) !== null) {
    jsonMatches.push(m[0]);
}
fs.writeFileSync('temp-products.json', `[${jsonMatches.join(',')}]`);

const fs = require('fs');
const html = fs.readFileSync('temp-sof-home.html', 'utf8');

// The site is a Next.js site, it probably has some JSON state in `<script id="__NEXT_DATA__"` or similar.
const nextDataMatch = html.match(/<script id="__NEXT_DATA__" type="application\/json">({.*?})<\/script>/is);
if (nextDataMatch) {
  const data = JSON.parse(nextDataMatch[1]);
  fs.writeFileSync('temp-sof-data.json', JSON.stringify(data, null, 2));
  console.log("Extracted __NEXT_DATA__");
} else {
  // If not, we look for self.__next_f inside script tags. Next.js App Router uses self.__next_f
  const parts = [];
  const regex = /self\.__next_f\.push\(\[1,"(.*?)"]\)/g;
  let m;
  while ((m = regex.exec(html)) !== null) {
      // Decode the string literal from JS
      try {
          parts.push(JSON.parse(`"${m[1]}"`));
      } catch (e) {}
  }
  fs.writeFileSync('temp-next-f.txt', parts.join('\n'));
  console.log("Extracted self.__next_f chunks to temp-next-f.txt");
}

const http  = require('http');
const fs    = require('fs');
const path  = require('path');

const API_KEY    = '4zbcbwxse5pe84q2x2efevj5';
const BASE_URL   = 'http://developer.tmsimg.com/';
const movies     = require('../src/data/movies.json');
const postersDir = path.join(__dirname, '../public/posters');

if (!fs.existsSync(postersDir)) fs.mkdirSync(postersDir, { recursive: true });

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    http.get(url, res => {
      if (res.statusCode === 200) {
        res.pipe(file);
        file.on('finish', () => { file.close(); resolve(true); });
      } else {
        file.close();
        fs.unlink(dest, () => {});
        reject(`HTTP ${res.statusCode}`);
      }
    }).on('error', err => {
      file.close();
      fs.unlink(dest, () => {});
      reject(err.message);
    });
  });
}

async function main() {
  let downloaded = 0, skipped = 0, failed = 0;

  for (const movie of movies) {
    const rawUri = movie.preferredImage?.uri;
    if (!rawUri) { skipped++; continue; }

    const uriPath  = rawUri.split('?')[0];           // assets/p31207784_v_v11_ad.jpg
    const filename = uriPath.split('/').pop();        // p31207784_v_v11_ad.jpg
    const dest     = path.join(postersDir, filename);

    if (fs.existsSync(dest)) {
      process.stdout.write(`  skip  ${filename}\n`);
      skipped++;
      continue;
    }

    const url = `${BASE_URL}${rawUri}&api_key=${API_KEY}`;

    try {
      await downloadImage(url, dest);
      process.stdout.write(`  ✓     ${filename}\n`);
      downloaded++;
    } catch (err) {
      process.stdout.write(`  ✗     ${filename} — ${err}\n`);
      failed++;
    }
  }

  console.log(`\nDone — downloaded: ${downloaded}  skipped: ${skipped}  failed: ${failed}`);
}

main();

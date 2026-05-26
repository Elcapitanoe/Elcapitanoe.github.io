import fs from 'fs';
import path from 'path';
import https from 'https';

const URL = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&family=Kalam:wght@300;400;700&display=swap';
const FONTS_DIR = path.join(process.cwd(), 'public', 'fonts');

if (!fs.existsSync(FONTS_DIR)) {
  fs.mkdirSync(FONTS_DIR, { recursive: true });
}

function fetch(url, headers = {}) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers }, (res) => {
      let data = '';
      if (res.statusCode !== 200) {
        return reject(new Error('Failed to fetch ' + url));
      }
      res.setEncoding('utf8');
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function downloadBinary(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (res) => {
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => reject(err));
    });
  });
}

async function run() {
  console.log('Fetching CSS from Google Fonts...');
  const css = await fetch(URL, { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36' });
  
  let newCss = css;
  const urlRegex = /url\((https:\/\/[^\)]+)\)/g;
  let match;
  let counter = 1;
  
  while ((match = urlRegex.exec(css)) !== null) {
    const fontUrl = match[1];
    const filename = `font-${counter++}.woff2`;
    const filepath = path.join(FONTS_DIR, filename);
    console.log(`Downloading ${fontUrl} to ${filename}...`);
    await downloadBinary(fontUrl, filepath);
    newCss = newCss.replace(fontUrl, `/fonts/${filename}`);
  }
  
  fs.writeFileSync(path.join(process.cwd(), 'src', 'styles', 'fonts.css'), newCss);
  console.log('Fonts downloaded and fonts.css generated successfully.');
}

run().catch(console.error);

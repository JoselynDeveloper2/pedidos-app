const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const PORT = 9876;
const PUBLIC_DIR = path.resolve(__dirname, '.output/public');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

function serveFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
}

const server = http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];
  let filePath = path.join(PUBLIC_DIR, urlPath === '/' ? 'index.html' : urlPath);
  
  if (fs.existsSync(filePath)) {
    if (fs.statSync(filePath).isDirectory()) {
      const indexPath = path.join(filePath, 'index.html');
      if (fs.existsSync(indexPath)) {
        serveFile(res, indexPath);
        return;
      }
    } else {
      serveFile(res, filePath);
      return;
    }
  }
  
  serveFile(res, path.join(PUBLIC_DIR, 'index.html'));
});

server.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}`);

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const baseUrl = `http://localhost:${PORT}`;

  // Screenshot 1: Login (no auth needed)
  await page.goto(`${baseUrl}/login`);
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(__dirname, 'screenshot-login.png'), fullPage: true });
  console.log('Screenshot: login');

  // Screenshot 2: Verify (needs phone in localStorage)
  await page.evaluate(() => {
    localStorage.setItem('kiwi-auth-state', JSON.stringify({
      phone: '8095551234',
      countryCode: '+1-809',
      role: 'cliente',
      verified: false,
      user: { name: '', email: '', location: null }
    }));
  });
  await page.goto(`${baseUrl}/verify`);
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(__dirname, 'screenshot-verify.png'), fullPage: true });
  console.log('Screenshot: verify');

  // Screenshot 3: Profile (needs verified=true)
  await page.evaluate(() => {
    localStorage.setItem('kiwi-auth-state', JSON.stringify({
      phone: '8095551234',
      countryCode: '+1-809',
      role: 'repartidor',
      verified: true,
      user: { name: 'Juan Pérez', email: 'juan@test.com', location: null }
    }));
  });
  await page.goto(`${baseUrl}/profile`);
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(__dirname, 'screenshot-profile.png'), fullPage: true });
  console.log('Screenshot: profile');

  await browser.close();
  server.close();
  console.log('All screenshots done!');
});

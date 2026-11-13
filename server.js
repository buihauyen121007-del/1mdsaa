const http = require('http');
const fs = require('fs');
const path = require('path');
const apiHandler = require('./api/index.js');

const PORT = process.env.PORT || 8055;
const publicDir = path.join(__dirname, 'public');

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.html': return 'text/html; charset=utf-8';
    case '.css': return 'text/css; charset=utf-8';
    case '.js': return 'application/javascript; charset=utf-8';
    case '.json': return 'application/json; charset=utf-8';
    case '.jpg':
    case '.jpeg': return 'image/jpeg';
    case '.png': return 'image/png';
    case '.ico': return 'image/x-icon';
    case '.svg': return 'image/svg+xml';
    default: return 'application/octet-stream';
  }
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = parsedUrl.pathname;

  // Handle API routes
  if (pathname.startsWith('/api')) {
    return apiHandler(req, res);
  }

  // Handle static assets
  let staticRelPath = pathname === '/' ? 'index.html' : pathname.replace(/^\//, '');
  let filePath = path.join(publicDir, staticRelPath);

  if (!fs.existsSync(filePath)) {
    filePath = path.join(__dirname, 'web', staticRelPath);
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    res.statusCode = 200;
    res.setHeader('Content-Type', getContentType(filePath));
    return fs.createReadStream(filePath).pipe(res);
  }

  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end('Not Found');
});

server.listen(PORT, () => {
  console.log(`============================================================`);
  console.log(` Dai Thanh Partner AI Agent Node.js Server is RUNNING`);
  console.log(` URL : http://localhost:${PORT}/`);
  console.log(`============================================================`);
});


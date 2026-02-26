const http = require("http");
const fs = require("fs");
const path = require("path");
const child = require("child_process");

const PORT = process.env.PORT || 8000;
const HOST = "0.0.0.0";
const ROOT = path.resolve(__dirname);
const OPEN_URL = `http://localhost:${PORT}/ui/`;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".md": "text/markdown",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf",
  ".txt": "text/plain",
};

function safeJoin(base, target) {
  const targetPath = "." + path.normalize("/" + target);
  return path.join(base, targetPath);
}

const server = http.createServer((req, res) => {
  try {
    const decoded = decodeURI(req.url.split("?")[0]);
    let filePath = safeJoin(ROOT, decoded);

    fs.stat(filePath, (err, stats) => {
      if (err) {
        res.statusCode = 404;
        res.end("Not found");
        return;
      }

      if (stats.isDirectory()) {
        // if directory, serve index.html inside it if exists
        const indexPath = path.join(filePath, "index.html");
        fs.stat(indexPath, (ie, istats) => {
          if (!ie && istats.isFile()) {
            streamFile(indexPath, res);
          } else {
            // fallback: try to serve index.html at root
            const rootIndex = path.join(ROOT, "ui", "index.html");
            if (fs.existsSync(rootIndex)) streamFile(rootIndex, res);
            else {
              res.statusCode = 404;
              res.end("Index not found");
            }
          }
        });
      } else if (stats.isFile()) {
        streamFile(filePath, res);
      } else {
        res.statusCode = 404;
        res.end("Not a file");
      }
    });
  } catch (e) {
    res.statusCode = 500;
    res.end("Server error");
  }
});

function streamFile(absPath, res) {
  const ext = path.extname(absPath).toLowerCase();
  const mime = MIME[ext] || "application/octet-stream";
  res.setHeader("Content-Type", mime);
  const stream = fs.createReadStream(absPath);
  stream.on("error", () => {
    res.statusCode = 500;
    res.end("Read error");
  });
  stream.pipe(res);
}

server.listen(PORT, HOST, () => {
  console.log(`Server running at ${OPEN_URL}`);
  // attempt to open default browser
  const platform = process.platform;
  let cmd;
  if (platform === "win32") {
    cmd = `start "" "${OPEN_URL}"`;
  } else if (platform === "darwin") {
    cmd = `open "${OPEN_URL}"`;
  } else {
    cmd = `xdg-open "${OPEN_URL}"`;
  }
  child.exec(cmd, (err) => {
    if (err) console.log("Could not open browser automatically:", err.message);
  });
});

// graceful shutdown
process.on("SIGINT", () => {
  console.log("Shutting down");
  server.close(() => process.exit(0));
});

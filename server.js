const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, "data");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".ico": "image/x-icon",
  ".svg": "image/svg+xml",
};

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function sendJson(res, code, payload) {
  res.writeHead(code, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify(payload));
}

function keymapPath(lang) {
  const safe = lang === "en" ? "en" : "ru";
  return path.join(DATA_DIR, "keymap-" + safe + ".json");
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

const server = http.createServer(async (req, res) => {
  const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
  const method = (req.method || "GET").toUpperCase();

  // API: разметка пальцев
  const keymapMatch = urlPath.match(/^\/api\/keymap\/(ru|en)$/);
  if (keymapMatch) {
    const lang = keymapMatch[1];
    const file = keymapPath(lang);

    if (method === "GET") {
      fs.readFile(file, "utf8", (err, data) => {
        if (err) {
          if (err.code === "ENOENT") {
            sendJson(res, 404, { ok: false, error: "not_found" });
            return;
          }
          sendJson(res, 500, { ok: false, error: "read_failed" });
          return;
        }
        try {
          sendJson(res, 200, { ok: true, map: JSON.parse(data) });
        } catch (_) {
          sendJson(res, 500, { ok: false, error: "invalid_json" });
        }
      });
      return;
    }

    if (method === "POST") {
      try {
        const raw = await readBody(req);
        const parsed = JSON.parse(raw || "{}");
        const map = parsed && typeof parsed.map === "object" && parsed.map ? parsed.map : parsed;
        if (!map || typeof map !== "object" || Array.isArray(map)) {
          sendJson(res, 400, { ok: false, error: "bad_payload" });
          return;
        }
        fs.writeFile(file, JSON.stringify(map, null, 2), "utf8", (err) => {
          if (err) {
            sendJson(res, 500, { ok: false, error: "write_failed" });
            return;
          }
          sendJson(res, 200, { ok: true, file: path.relative(ROOT, file) });
        });
      } catch (_) {
        sendJson(res, 400, { ok: false, error: "bad_json" });
      }
      return;
    }

    sendJson(res, 405, { ok: false, error: "method_not_allowed" });
    return;
  }

  const safePath = urlPath === "/" ? "/index.html" : urlPath;
  const filePath = path.normalize(path.join(ROOT, safePath));
  const rootResolved = path.resolve(ROOT) + path.sep;
  if (!filePath.toLowerCase().startsWith(rootResolved.toLowerCase()) && path.resolve(filePath).toLowerCase() !== path.resolve(ROOT).toLowerCase()) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(err.code === "ENOENT" ? 404 : 500);
      res.end(err.code === "ENOENT" ? "Not Found" : "Server Error");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Тренажёр слепой печати: http://localhost:${PORT}`);
});

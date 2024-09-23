const http = require("http");
const fs = require("fs");
const path = require("path");
const minimist = require("minimist");

// Use minimist to parse command line arguments for port
const args = minimist(process.argv.slice(2));
const port = args.port || 3000; // Default port is 3000 if not specified

// Helper function to serve static HTML files
const serveFile = (filePath, contentType, res) => {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/html" });
      res.end("<h1>Server Error</h1>", "utf-8");
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
};

// Create HTTP server
const server = http.createServer((req, res) => {
  if (req.url === "/registration") {
    // Serve registration.html
    serveFile(path.join(__dirname, "registration.html"), "text/html", res);
  } else if (req.url === "/projects") {
    // Serve project.html
    serveFile(path.join(__dirname, "project.html"), "text/html", res);
  } else if (req.url === "/" || req.url === "/home") {
    // Serve home.html
    serveFile(path.join(__dirname, "home.html"), "text/html", res);
  } else {
    // Default 404 route
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>Page Not Found</h1>");
  }
});

// Start the server on the specified port
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

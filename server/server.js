import { createServer } from 'node:http';
import { readFile } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { SERVER_PORT, ADDRESS, ALLOWED_ORIGIN } from '../common/constants.js';
import getRandomQuote from '../api/random.js';
import searchQuotes from '../api/search.js';

function serveStaticFile(res, filePath, contentType, responseCode = 200) {
  readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      console.error(`Error serving static file ${filePath}:`, err);
      res.end('500 - Internal Error');
    } else {
      res.writeHead(responseCode, { 'Content-Type': contentType });
      res.end(data);
    }
  });
}

const server = createServer((req, res) => {
  console.log('Received request:', req.method, req.url);

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if ((req.method === 'GET' && req.url === '/') || (req.method === 'GET' && req.url === '/index.html')) {
    serveStaticFile(res, pathToFileURL('./index.html'), 'text/html');
  } else if (req.method === 'GET' && req.url === '/client/client.js') {
    serveStaticFile(res, pathToFileURL('./client/client.js'), 'application/javascript');
  } else if (req.method === 'GET' && req.url === '/constants.js') {
    res.writeHead(200, { 'Content-Type': 'application/javascript' });
    const content = `
      export const SERVER_ENDPOINT = "${ADDRESS}:${SERVER_PORT}";
      `;
    res.end(content);
  } else if (req.method === 'GET' && req.url === '/style.css') {
    serveStaticFile(res, pathToFileURL('./style.css'), 'text/css');
  } else if (req.method === 'GET' && req.url === '/common/constants.js') {
    serveStaticFile(res, pathToFileURL('./common/constants.js'), 'application/javascript');
  } else if (req.method === 'GET' && req.url === '/search.html') {
    serveStaticFile(res, pathToFileURL('./search.html'), 'text/html');
  } else if (req.method === 'GET' && req.url === '/client/searchClient.js') {
    serveStaticFile(res, pathToFileURL('./client/searchClient.js'), 'application/javascript');
  } else if (req.method === 'GET' && req.url === '/api/random') {
    // Handle the random quote endpoint locally
    getRandomQuote(req, res);
  } else if (req.method === 'POST' && req.url === '/api/search') {
    // Handle the search quotes endpoint locally
    searchQuotes(req, res);
  } else if (req.method === 'GET' && req.url === '/404.css') {
    serveStaticFile(res, pathToFileURL('./404.css'), 'text/css');
    console.log('i am here');
  } else {
    serveStaticFile(res, pathToFileURL('./404.html'), 'text/html', 404);
    console.log('HELLO');
  }
});

// Start the server
server.listen(SERVER_PORT, () => {
  console.log(`Listening on ${ADDRESS}:${SERVER_PORT}`);
});

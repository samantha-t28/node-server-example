// Import the createServer function from the built-in http module in Node.js
import { createServer } from 'node:http';
import { getQuotes } from './getQuotes.js';
import { getRandomInt } from './utils.js';
import { log } from 'node:console';
import { SERVER_PORT } from '../common/constants.js';
import { searchQuotes } from './searchQuotes.js';
import { ADDRESS } from '../common/constants.js';
// import { CLIENT_PORT } from '../common/constants.js';
import { readFile } from "node:fs";
import { pathToFileURL } from "node:url";

function serveStaticFile(res, path, contentType, responseCode = 200) {
  readFile(path, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      console.error(err);
      res.end("500 - Internal Error");
    } else {
      res.writeHead(responseCode, { "Content-Type": contentType });
      res.end(data);
    }
  });
}

// function overrideConstantsFile(res, path, contentType, responseCode = 200) {
//   readFile(path, (err, data) => {
//     if (err) {
//       res.writeHead(500, { "Content-Type": "text/plain" });
//       console.error(err);
//       res.end("500 - Internal Error");
//     } else {
//       res.writeHead(responseCode, { "Content-Type": contentType });
//       const content = `
//       export const SERVER_ENDPOINT = "${ADDRESS}:${SERVER_PORT}";
//       `
//       res.end(content);
//     }
//   });
// }

const server = createServer((req, res) => {
  // header documentation: https://developer.mozilla.org/en-US/docs/Web/ HTTP/Headers
//   res.setHeader('Access-Control-Allow-Origin', `${ADDRESS}:${CLIENT_PORT}`);
  // List of MIME type: https://www.iana.org/assignments/media-types/media-types.xhtml#application
  // res.writeHead(200, { 'Content-Type': 'application/json' });
  // curious fact: we can add any kind of information on header
  res.setHeader('SAM', 'true');

  // res.writeHead(200, { 'Content-Type': 'text/plain' });
  if(req.method === 'GET' && req.url === '/random') {
    const quotes = getQuotes();
    const randomQuoteIndex = getRandomInt(0,quotes.length);

    console.log(randomQuoteIndex);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(quotes[randomQuoteIndex])); // This line closes the response
    // Added /search endpoint to target searchClient.js
  } else if(req.method === 'POST' && req.url === '/search') { // Handle POST requests to the searchClient.js endpoint

    let body = '';
  
    req.on('data', chunk => {
      // convert the chunk of data received from the client into string format
      body += chunk.toString();
      // handling the completion of data transmission
      req.on('end', () => {          
        try {
          const jsonData = JSON.parse(body)
          // Retrieve the quotes data by invoking the getQuotes function
          const quotes = getQuotes();
          // Search the quotes using the searchQuotes function
          const search = searchQuotes(jsonData, quotes);
          // Set the status based on whether a quote was found
          const status = search.message?404:200;

          res.writeHead(status, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(search));
        } catch (err) {
            res.writeHead(400, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({ message: 'Invalid JSON received', error:err.toString() }));
          }
        })
      })
    }  else if (req.method === 'GET' && req.url === '/' || req.method === 'GET' && req.url === '/index.html') {
      // console.log("Relative Path", "./client/index.html");
      // console.log("Absolute Path", pathToFileURL("./client/index.html"));
      serveStaticFile(res, pathToFileURL("./client/index.html"), "text/html");
    } else if (req.method === 'GET' && req.url === '/client.js') {
      serveStaticFile(res, pathToFileURL("./client/client.js"), "application/javascript");
    } else if (req.method === 'GET' && req.url === '/constants.js') {
      // overrideConstantsFile(res, pathToFileURL("./client/constants.js"), "application/javascript");
      res.writeHead(200, { "Content-Type": 'application/javascript' });
      const content = `
      export const SERVER_ENDPOINT = "${ADDRESS}:${SERVER_PORT}";
      `
      res.end(content);
    } else if (req.method === 'GET' && req.url === '/style.css') {
      serveStaticFile(res, pathToFileURL("./client/style.css"), "text/css");
    } else if (req.method === 'GET' && req.url === '/common/constants.js') {
      serveStaticFile(res, pathToFileURL("./common/constants.js"), "application/javascript");
    } else if (req.method === 'GET' && req.url === '/search.html') {
      serveStaticFile(res, pathToFileURL("./client/search.html"), "text/html");
    } else if (req.method === 'GET' && req.url === '/searchClient.js') {
      serveStaticFile(res, pathToFileURL("./client/searchClient.js"), "application/javascript");
    }  else {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Not Found');
    }
});

// starts a simple http server locally on port 3000
server.listen(SERVER_PORT, () => {
  console.log(`Listening on ${ADDRESS}:${SERVER_PORT}`);
});


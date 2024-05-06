// Import the createServer function from the built-in http module in Node.js
import { createServer } from 'node:http';

const server = createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://192.168.6.59:5507');
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World!\n'); // This line closes the response
});

// starts a simple http server locally on port 3000
server.listen(3000, '192.168.6.59', () => {
  console.log('Listening on 192.168.6.59:3000');
});

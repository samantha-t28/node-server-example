// Import the createServer function from the built-in http module in Node.js
import { createServer } from 'node:http';
import quotes from './quotes.json' assert {type:'json'}
import { getRandomInt } from './utils.js';

const server = createServer((req, res) => {

    // header documentation: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
    res.setHeader('Access-Control-Allow-Origin', 'http://192.168.6.59:5507');
    // curious fact: we can add any kind of information on header
    res.setHeader('SAM', 'true');
    // res.writeHead(200, { 'Content-Type': 'text/plain' });
    // List of MIME type: https://www.iana.org/assignments/media-types/media-types.xhtml#application
    res.writeHead(200, { 'Content-Type': 'application/json' });
    
    const randomQuoteIndex = getRandomInt(0,quotes.length);

    console.log(randomQuoteIndex);
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    res.end(JSON.stringify(quotes[randomQuoteIndex]['quote'])); // This line closes the response
});

// starts a simple http server locally on port 3000
server.listen(3000, '192.168.6.59', () => {
  console.log('Listening on 192.168.6.59:3000');
});

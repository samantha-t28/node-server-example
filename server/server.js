// Import the createServer function from the built-in http module in Node.js
import { createServer } from 'node:http';
import quotes from './quotes.json' assert {type:'json'}
import { getRandomInt } from './utils.js';
import { log } from 'node:console';
import { SERVER_PORT } from '../common/constants.js';
import { searchQuotes } from './searchQuotes.js';
import { ADDRESS } from '../common/constants.js';
import { CLIENT_PORT } from '../common/constants.js';

const server = createServer((req, res) => {
  // header documentation: https://developer.mozilla.org/en-US/docs/Web/ HTTP/Headers
  res.setHeader('Access-Control-Allow-Origin', `${ADDRESS}:${CLIENT_PORT}`);
  // List of MIME type: https://www.iana.org/assignments/media-types/media-types.xhtml#application
  // res.writeHead(200, { 'Content-Type': 'application/json' });
  // curious fact: we can add any kind of information on header
  res.setHeader('SAM', 'true');
    // res.writeHead(200, { 'Content-Type': 'text/plain' });

    // Handle POST requests to the searchClient.js endpoint
    if(req.method === 'POST' && req.url === '/'){
      
        let body = '';
  
        req.on('data', chunk => {
          // convert the chunk of data received from the client into string format
          body += chunk.toString();
          // handling the completion of data transmission
          req.on('end', () => {
            
            try {
              const jsonData = JSON.parse(body)
              const search = searchQuotes(jsonData);

              const status = search.message?404:200;
              res.writeHead(status, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify(search));
            } catch (err) {
              res.writeHead(400, {'Content-Type': 'application/json'});
              res.end(JSON.stringify({ message: 'Invalid JSON received', error:err.toString() }));
              
          }
          })
        })
      } 
    

    if(req.method === 'GET')
    {
    // console.log(req.url)
      
    const randomQuoteIndex = getRandomInt(0,quotes.length);

    console.log(randomQuoteIndex);
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    res.end(JSON.stringify(quotes[randomQuoteIndex])); // This line closes the response
    }
});

// starts a simple http server locally on port 3000
server.listen(SERVER_PORT, () => {
  console.log(`Listening on ${ADDRESS}:${SERVER_PORT}`);
});


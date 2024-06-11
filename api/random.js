import { getQuotes } from '../server/getQuotes.js';
import { getRandomInt } from '../server/utils.js';

// Separated random logic from server.js
// This enables Vercel to automatically recognize and deploy this files as serverless function
export default function getRandomQuote(req, res) {
  if (req.method === 'GET') {
    const quotes = getQuotes();
    const randomQuoteIndex = getRandomInt(0, quotes.length);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(quotes[randomQuoteIndex]));
  }
}

import { getQuotes } from '../server/getQuotes.js';
import { searchQuotes } from '../server/searchQuotes.js';

export default function searchQuote(req, res) {
  if (req.method === 'POST') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const jsonData = JSON.parse(body);
        const quotes = getQuotes();
        const search = searchQuotes(jsonData, quotes);
        const status = search.message ? 404 : 200;

        res.writeHead(status, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(search));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid JSON received', error: err.toString() }));
      }
    });
  }
}

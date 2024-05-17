// import quotes from './quotes.json' assert {type:'json'}
// import { getRandomInt } from './utils.js';



export const searchQuotes = (jsonData, quotes) => {
      
     // Parsing the string 'body' into a JSON object
    //  const jsonData = JSON.parse(body)
     // Filter quotes by author name (case-insensitive)
     const filteredQuotes = quotes.filter(q => q.author.toLowerCase().includes(jsonData.author.toLowerCase()));
     // Check to see if there are any quotes in the filteredQuotes array
     if(filteredQuotes.length > 0){
       // Get random quotes from filteredQuotes
      //  const randomIndex = getRandomInt(0, filteredQuotes.length);
       // Picks a random quote from the list of filtered quotes.
       const selectedQuote = filteredQuotes[0];
       // Send success response
    //    res.writeHead(200, { 'Content-Type': 'application/json' });
       //  Send the response back to the client
    //    res.end(JSON.stringify(selectedQuote));
        return selectedQuote;
       // Handle no matching author and display message
      } else {
    //    res.writeHead(404, { 'Content-Type': 'application/json' });
    //    res.end(JSON.stringify({ message: 'No quotes found for the specified author.' }));
        return {message: 'No quotes found for the specified author.'};
       }
}
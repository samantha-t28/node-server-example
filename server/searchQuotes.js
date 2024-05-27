export const searchQuotes = (jsonData, quotes) => {
   let filteredQuotes = quotes;

   // Filter quotes by author name (case-sensitive)
   if(jsonData.author){
      filteredQuotes = filteredQuotes.filter(q => q.author.toLowerCase().includes(jsonData.author.toLowerCase()));
   }

   // Filter quotes by topic (case-sensitive)
   // The topics property is an array within each quote object. The some() method helps to determine if any of the topics in the array meet the specific condition provided.
   if(jsonData.topic){
      filteredQuotes = filteredQuotes.filter(q => q.topics.some(topic => topic.toLowerCase().includes(jsonData.topic.toLowerCase())));
      
   }
   
   // Check to see if there are any quotes in the filteredQuotes array
   if(filteredQuotes.length > 0){

      const selectedQuote = filteredQuotes;
      return selectedQuote;
      // Handle no matching author and display message
      } else {

      return {message: 'No quotes found for the specified author.'};
   }
}

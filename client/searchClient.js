import { SERVER_ENDPOINT } from "./constants.js";

const button = document.getElementById('button');
const searchAuthor = document.getElementById('searchAuthor');
const searchTopic = document.getElementById('searchTopic');

button.disabled = true;

button.addEventListener('click', displayServer)

// Disable button if input field is empty, enable otherwise
const checkInput = () => {
    button.disabled = searchAuthor.value.trim() === '' && searchTopic.value.trim() === '' ? true : false;
}

searchAuthor.addEventListener('input', checkInput)
searchTopic.addEventListener('input', checkInput)

async function displayServer(){
    
    const quote = document.getElementById('quote');
    const author = document.getElementById('author');
    const profession = document.getElementById('profession');
    const topic = document.getElementById('topic');
    const serverQuote = await getServer(searchAuthor.value, searchTopic.value);
// Display error message if author is not found, otherwise display the quote and author
if (serverQuote.message) {
        quote.innerText = "The author you're trying to search does not exist";
        author.innerText = '';
        topic.innerText = '';
      } else {
        quote.innerText = serverQuote.quote;
        author.innerText = serverQuote.author;
        // topic.innerText = serverQuote.topics;
      }
    }

async function getServer(author, topic) {
    
    try {
        const response = await fetch(`${SERVER_ENDPOINT}/search`, {  
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({author, topic})});      
        const textResponse = await response.json();
        console.log(textResponse)
        return textResponse;
    } catch (error) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/Error
      return `An error happened when attempting to fetch ${SERVER_ENDPOINT}. Error message: ${error}`;
    }
}

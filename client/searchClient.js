import { SERVER_ENDPOINT } from "./constants.js";

const button = document.getElementById('button');
const searchInput = document.getElementById('search');

button.disabled = true;

button.addEventListener('click', displayServer)

// Disable button if input field is empty, enable otherwise
const checkInput = () => {
    button.disabled = searchInput.value.trim() === '' ? true : false;
}

searchInput.addEventListener('input', checkInput)

async function displayServer(){
    
    const quote = document.getElementById('quote');
    const author = document.getElementById('author');
    const profession = document.getElementById('profession');
    const serverQuote = await getServer(searchInput.value);
// Display error message if author is not found, otherwise display the quote and author
if (serverQuote.message) {
        quote.innerText = "The author you're trying to search does not exist";
        author.innerText = '';
      } else {
        quote.innerText = serverQuote.quote;
        author.innerText = serverQuote.author;
      }
    }

    // quote.innerText = serverQuote.quote;
    // author.innerText = serverQuote.author;
    // profession.innerText = serverQuote.profession;


async function getServer(author) {
    
    try {
        const response = await fetch(SERVER_ENDPOINT, {  method: 'POST',
        body: JSON.stringify({author})});      
        const textResponse = await response.json();
        console.log(textResponse)
        return textResponse;
    } catch (error) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/Error
      return `An error happened when attempting to fetch ${SERVER_ENDPOINT}. Error message: ${error}`;
    }
}

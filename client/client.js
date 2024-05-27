import { SERVER_ENDPOINT } from "./constants.js";

const button = document.getElementById('button');

button.addEventListener('click', onClickGenerateRandomQuoteButton)

async function onClickGenerateRandomQuoteButton() {
    console.log('button clicked')
    const quote = document.getElementById('quote');
    const author = document.getElementById('author');
    const profession = document.getElementById('profession');

    // loading state should be done before the await
    button.innerHTML = 'Loading...';
    button.disabled = true;
    const serverQuote = await getRandomQuoteFromServer();
    button.innerHTML = 'Generate Quote';
    button.disabled = false;

    quote.innerText = serverQuote.quote;
    author.innerText = serverQuote.author;
    profession.innerText = serverQuote.profession;

}

async function getRandomQuoteFromServer() {
    try {
        const response = await fetch(`${SERVER_ENDPOINT}/random`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
              }
        });      
        const textResponse = await response.json();
        return textResponse;
    } catch (error) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/Error
      return `An error happened when attempting to fetch ${SERVER_ENDPOINT}. Error message: ${error}`;
    }
}

import { SERVER_ENDPOINT } from "./constants.js";


const button = document.getElementById('button');

button.addEventListener('click', displayServer)

async function displayServer(){
    console.log('button clicked')
    const quote = document.getElementById('quote');
    const author = document.getElementById('author');
    const profession = document.getElementById('profession');
    const serverQuote = await getServer();
  //   const serverQuote = {
  //     "quote": "As you grow older, you will discover that you have two hands, one for helping yourself, the other for helping others.",
  //     "author": "Audrey Hepburn",
  //     "profession": "British actress",
  //     "topics": [
  //         "People",
  //         "Inspirational"
  //     ]
  // }

    // setTimeout(() => {
    //     console.log("Delayed for 5 seconds.");
    //   }, 5000);
    quote.innerText = serverQuote.quote;
    author.innerText = serverQuote.author;
    profession.innerText = serverQuote.profession;

}

async function getServer() {

    
    try {
        const response = await fetch(SERVER_ENDPOINT);      
        const textResponse = await response.json();
        return textResponse;
    } catch (error) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/Error
      return `An error happened when attempting to fetch ${SERVER_ENDPOINT}. Error message: ${error}`;
    }
}

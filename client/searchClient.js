import { SERVER_ENDPOINT } from '../common/constants.js';

const button = document.getElementById('button');
const searchAuthor = document.getElementById('searchAuthor');
const searchTopic = document.getElementById('searchTopic');

button.disabled = true;

button.addEventListener('click', displayServer);

// Disable button if input field is empty, enable otherwise
const checkInput = () => {
  button.disabled = searchAuthor.value.trim() === '' && searchTopic.value.trim() === '' ? true : false;
};

searchAuthor.addEventListener('input', checkInput);
searchTopic.addEventListener('input', checkInput);

async function displayServer() {
  const quote = document.getElementById('quote');
  const author = document.getElementById('author');
  const profession = document.getElementById('profession');
  const topic = document.getElementById('topic');
  const searchQuoteContainer = document.getElementById('searchQuoteContainer');

  // Resetting the searchQuoteContainer
  searchQuoteContainer.innerHTML = '';

  button.disabled = true;
  button.innerHTML = 'Loading...';
  const serverQuote = await getServer(searchAuthor.value, searchTopic.value);
  console.log('serverQuote:', serverQuote);
  button.innerHTML = 'Search';
  button.disabled = false;

  // Display error message if author is not found, otherwise display the quote and author
  if (serverQuote.message) {
    if (searchAuthor.value && !searchTopic.value) {
      quote.innerText = 'No quotes found for the specified author';
    } else if (searchTopic.value && !searchAuthor.value) {
      quote.innerText = 'No quotes found for the specified topic';
    } else {
      quote.innerText = 'No quotes found for the specified author and topic';
    }
  } else {
    serverQuote.forEach((quoteData) => {
      const quoteDiv = document.createElement('div');

      const quoteElement = document.createElement('p');
      const authorElement = document.createElement('p');
      const topicsElement = document.createElement('p');

      quoteElement.classList.add('quote');
      authorElement.classList.add('author');
      topicsElement.classList.add('topic');

      quoteElement.textContent = quoteData.quote;
      authorElement.innerHTML = `By: ${quoteData.author} (${quoteData.profession})`;
      const formattedTopics = quoteData.topics.join(', ').split(',');

      topicsElement.textContent = formattedTopics;

      quoteDiv.appendChild(quoteElement);
      quoteDiv.appendChild(authorElement);
      quoteDiv.appendChild(topicsElement);

      searchQuoteContainer.appendChild(quoteDiv);
    });
  }
}

async function getServer(author, topic) {
  try {
    const response = await fetch(`${SERVER_ENDPOINT}/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ author, topic }),
    });
    const textResponse = await response.json();
    console.log(textResponse);
    return textResponse;
  } catch (error) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/Error
    return `An error happened when attempting to fetch {SERVER_ENDPOINT}. Error message: ${error}`;
  }
}

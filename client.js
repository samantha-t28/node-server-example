const button = document.getElementById('button');

button.addEventListener('click', displayServer)

async function displayServer(){
    console.log('button clicked')
    const reponse = document.getElementById('server-response');
    const serverMessage = await getServer();
    setTimeout(() => {
        console.log("Delayed for 5 seconds.");
      }, 5000);
    reponse.innerText = serverMessage;

}

async function getServer() {
    const address = 'http://192.168.6.59:3000';
    
    try {
        const response = await fetch(address);      
        const textResponse = await response.text();
        return textResponse;
    } catch (error) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/Error
      return `An error happened when attempting to fetch ${address}. Error message: ${error}`;
    }
}

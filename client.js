async function displayServer(){
    const reponse = document.getElementById('server-response');
    const serverMessage = await getServer();
    setTimeout(() => {
        console.log("Delayed for 5 seconds.");
      }, "5000");
    reponse.innerText = serverMessage;

}

async function getServer() {
    const response = await fetch("http://192.168.6.59:3000");
    const textResponse = await response.text();
    console.log(textResponse);
    return textResponse;
}

displayServer();
getServer();
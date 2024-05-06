# Node Server Example

Documentation: 
* https://nodejs.org/en/learn/getting-started/introduction-to-nodejs
* https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

## What I've learned:

Node.js is primarily known for server-side applications, allowing developers to use JavaScript on the server side, which is beneficial for those who are already familiar with the language from front-end development. Additionally, its non-blocking and event-driven structure is a key feature of Node.js, making it efficient for handling multiple requests and tasks.

## How Do Server-Side Applications Work with Node.js?

The `http` module is a built-in library in Node.js that provides functionality for creating and managing HTTP servers and making HTTP requests. Since it's built-in, you can use it without any additional installation.

```javascript
// Import the createServer function from the built-in http module
import { createServer } from 'node:http';

const server = createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://192.168.6.59:5507');
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World!\n');
});
// starts a simple http server locally on port 3000
server.listen(3000, '192.168.6.59', () => {
  console.log('Listening on 192.168.6.59:3000');
});
```
* The createServer function from the http module creates an HTTP server and returns it as an object.
* The function takes in two parameters (request, response).
* Inside the object, it handles the server behavior, such as:

  > **Request**: When the server receives an incoming request, you can use this to handle the client side.
  > 
  > **Listening**: When the server starts listening to the connection `server.listen(port, hostname)`.
  > 
  > **Close**: `res.end()` method closes the server.

## What is Non-Blocking and Event-Driven?

Non-blocking means that the code does not block the execution of other tasks while waiting for the server to respond.

### Example:

**client.js**

```javascript
async function getServer() {
    const response = await fetch("http://192.168.6.59:3000");
    const textResponse = await response.text();
    console.log(textResponse);
    return textResponse;
}
```
* Non-blocking asynchronous using the `await` keyword. The `fetch` call within the `getServer()` function is an asynchronous operation that demonstrates it doesn't block other code from executing while waiting for the HTTP response.

```javascript
async function displayServer(){
    const reponse = document.getElementById('server-response');
    const serverMessage = await getServer();
    setTimeout(() => {
        console.log("Delayed for 5 seconds.");
      }, "5000");
    reponse.innerText = serverMessage;
}
```
* The setTimeout() function schedules an event to trigger after 5 seconds. This shows event-driven programming, where the function runs after the specified time. 

## Important Things to Consider When Setting Up Your Front-End Application to Your Server

Setting up Cross-Origin Resource Sharing (CORS) is important when creating Node.js server, especially if the server is intended to be accessed from web applications running on different domain or port.

## Why is CORS Important?

Cross-Origin Resource Sharing (CORS) helps maintain the security of web applications by controlling how resources can be shared across different origins. It ensures that a web page can only access resources from another domain if explicitly allowed, which helps prevent malicious interactions between unrelated websites.

When I was setting up the server, CORS error appeared in my browser. I am using VS Code, and the front-end application is running on port 5507, while my Node.js server is running on port 3000. This setup means I need to allow cross-origin requests from the front-end running on port 5507 to the server running on port 3000.

To solve this, there are several ways:
**1**. Use the `cors` middleware with Express
**2**. Manual set up

In this example, I will manually set up the server to specify the allowed origin and headers:

**server.js**

```javascript
const server = createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://192.168.6.59:5507');
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World!\n');
});
```
* By setting this header, you're telling the browser that it’s okay for web applications hosted at http://192.168.6.59:5507 to access resources from your server on port 3000.
* This is important when your client (frontend) and server (backend) are running on different ports or domains.

```javascript
    res.setHeader('Access-Control-Allow-Origin', '*');

```
While I was reading about Access-Control-Allow-Origin, I came across a solution where I could use * as a wildcard to allow any origin to access the server. The CORS error message went away; however, this approach is generally discouraged because it permits unrestricted access. It's better to specify the allowed origins to limit access to trusted sources.
# Node Server Example

Documentation:

- https://nodejs.org/en/learn/getting-started/introduction-to-nodejs
- https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
- https://jestjs.io/docs/getting-started
- https://prettier.io/docs/en/

# What I've learned:

Node.js is primarily known for server-side applications, allowing developers to use JavaScript on the server
side, which is beneficial for those who are already familiar with the language from front-end development.
Additionally, its non-blocking and event-driven structure is a key feature of Node.js, making it efficient for
handling multiple requests and tasks.

# How Do Server-Side Applications Work with Node.js?

The `http` module is a built-in library in Node.js that provides functionality for creating and managing HTTP
servers and making HTTP requests. Since it's built-in, you can use it without any additional installation.

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

- The createServer function from the http module creates an HTTP server and returns it as an object.
- The function takes in two parameters (request, response).
- Inside the object, it handles the server behavior, such as:

  > **Request**: When the server receives an incoming request, you can use this to handle the client side.
  >
  > **Listening**: When the server starts listening to the connection `server.listen(port, hostname)`.
  >
  > **Close**: `res.end()` method closes the server.

# What is Non-Blocking and Event-Driven?

Non-blocking means that the code does not block the execution of other tasks while waiting for the server to
respond.

### Example:

**client.js**

```javascript
async function getServer() {
  const response = await fetch('http://192.168.6.59:3000');
  const textResponse = await response.text();
  console.log(textResponse);
  return textResponse;
}
```

- Non-blocking asynchronous using the `await` keyword. The `fetch` call within the `getServer()` function is
  an asynchronous operation that demonstrates it doesn't block other code from executing while waiting for the
  HTTP response.

```javascript
async function displayServer() {
  const reponse = document.getElementById('server-response');
  const serverMessage = await getServer();
  setTimeout(() => {
    console.log('Delayed for 5 seconds.');
  }, '5000');
  reponse.innerText = serverMessage;
}
```

- The setTimeout() function schedules an event to trigger after 5 seconds. This shows event-driven
  programming, where the function runs after the specified time.

# Important Things to Consider When Setting Up Your Front-End Application to Your Server

Setting up Cross-Origin Resource Sharing (CORS) is important when creating Node.js server, especially if the
server is intended to be accessed from web applications running on different domain or port.

# Why is CORS Important?

Cross-Origin Resource Sharing (CORS) helps maintain the security of web applications by controlling how
resources can be shared across different origins. It ensures that a web page can only access resources from
another domain if explicitly allowed, which helps prevent malicious interactions between unrelated websites.

When I was setting up the server, CORS error appeared in my browser. I am using VS Code, and the front-end
application is running on port 5507, while my Node.js server is running on port 3000. This setup means I need
to allow cross-origin requests from the front-end running on port 5507 to the server running on port 3000.

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

- By setting this header, you're telling the browser that it’s okay for web applications hosted at
  http://192.168.6.59:5507 to access resources from your server on port 3000.
- This is important when your client (frontend) and server (backend) are running on different ports or
  domains.

```javascript
res.setHeader('Access-Control-Allow-Origin', '*');
```

While I was reading about Access-Control-Allow-Origin, I came across a solution where I could use \* as a
wildcard to allow any origin to access the server. The CORS error message went away; however, this approach is
generally discouraged because it permits unrestricted access. It's better to specify the allowed origins to
limit access to trusted sources.

# Troubleshooting Server Issues

While handling a CORS error in my browser, I encountered another error message in my terminal:

```text
Error: listen EADDRINUSE: address already in use 192.168.6.59:3000
    at Server.setupListenHandle [as _listen2] (node:net:1485:16)
    at listenInCluster (node:net:1533:12)
    at doListen (node:net:1682:7)
    at process.processTicksAndRejections (node:internal/process/task_queues:83:21)
Emitted 'error' event on Server instance at:
    at emitErrorNT (node:net:1512:8)
    at process.processTicksAndRejections (node:internal/process/task_queues:82:21) {
  code: 'EADDRINUSE',
  errno: -48,
  syscall: 'listen',
  address: '192.168.6.59',
  port: 3000
}
```

`Error: listen EADDRINUSE: address already in use`: EADDRINUSE means that another application is already using
the specified port. This happens when an old server is still running. Even if the CORS issue is fixed,
duplicate servers can prevent the application from working properly.

To check if any application is using port 3000, use the following command:

```text
lsof -i -P -n | grep LISTEN | grep 3000
```

- This command lists the ID of the program using the port. To terminate the process, use:

```text
kill <ID>
```

- Replace <ID> with the process ID you found using the previous command. This will allow you to restart your
  server properly.

# HTTP GET and POST Methods

## `GET Method`

The GET method is used to request data from a server. It's like asking a server, "Can you give me this
specific information?”

### Summary of GET Request Handling

**1. Client requests data:** "Hey server, give me some data" (GET request).

**2. Server picks a random item:** "Let me pick a random quote from my list."

**3. Server sends the data:** "Here's your random quote" (sends the quote back to the client).

```javascript
const server = createServer((req, res) => {
  if (req.method === 'GET') {
    // Pick a random quote from the list
    const randomQuoteIndex = getRandomInt(0, quotes.length);
    const randomQuote = quotes[randomQuoteIndex];

    // Send the random quote back to the client
    res.end(JSON.stringify(randomQuote));
  }
});

server.listen(SERVER_PORT, () => {
  console.log(`Listening on ${ADDRESS}:${SERVER_PORT}`);
});
```

## `Post Method`

The POST method is used to send data to the server for processing. The server collects the data, processes it,
and sends back a response based on the result.

## Summary of POST Request Handling

**1. Client sends data:** "Hey server, here's some data about an author. Can you find quotes by this author?"
(POST request with JSON body).

**2. Server receives data:** "Let me collect and parse this data." (Server collects data chunks, parses the
JSON).

**3. Server processes data:** "Let me search my list of quotes for this author." (Server calls the
searchQuotes function).

**4. Server sends response:** "Here's what I found" (or "No quotes found" if none were found) (Server sends
the response back to the client).

### Client Sends Data

**searchClient.js**

```javascript
async function getServer(author) {
  try {
    const response = await fetch(SERVER_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify({ author }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    return `An error happened when attempting to fetch ${SERVER_ENDPOINT}. Error message: ${error}`;
  }
}
```

- The client sends a POST request to the server with the author’s name included in the request body as JSON.

### Server Receives Request:

**server.js**

```javascript
if(req.method === 'POST' && req.url === '/') {
```

- The server listens for incoming requests and checks if the request method is POST and if the URL is /,
  ensuring that the server processes only requests targeting the root endpoint.

### Collecting Data Collection:

```javascript
let body = '';
```

- By assigning an empty string to the body variable, it acts as a container to accumulate the data chunks
  received from the client.

### Receiving Data:

```javascript
req.on('data', (chunk) => {
  body += chunk.toString();
});
```

- Convert each chunk of data into a string and append it to the body variable.

### Receiving and Processing JSON Data:

```javascript
req.on('end', () => {
	try {
  const jsonData = JSON.parse(body);
  // Process the jsonData
  }
});
```

- When all the data has been received, the body contains the complete data sent by the client as a single
  string. The server can now process the accumulated data, such as parsing it as JSON.

### Error Handling:

```javascript
catch (err) {
  res.writeHead(400, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Invalid JSON received', error: err.toString() }));
}
```

- If there is an error during the JSON parsing (e.g., if the client sends invalid JSON), the server catches
  the error and responds with a status code of 400 and an error message.

# JEST Testing Framework

### Install:

```bash
npm install --save-dev jest
```

After installation, I anticipated setting up the test file would be straightforward. However, I encountered an
issue where the import statement with assertion syntax
`import quotes from './quotes.json' assert {type:'json'}` caused Jest to fail parsing in the searchQuotes.js
file.

### Original Code in searchQuote.js

```javascript
import quotes from './quotes.json' assert { type: 'json' };
const searchQuotes = (author) => {};
```

When working with modules in Node.js, the `assert` syntax ensures the imported JSON file is treated correctly
and not mistaken for a regular JavaScript module/file.

## Troubleshoot

I created a separate file and moved the `assert` import statement for the JSON file there.

### getQuotes.js

```javascript
import quotes from './quotes.json' assert { type: 'json' };

export const getQuotes = () => {
  return quotes;
};
```

This approach simplifies the testing because the JSON file is treated as a data file and not directly imported
as a module. It adheres to the principle of single responsibility, focusing each file on a specific function
or purpose.

# How to Resolve Import Statement Issues in Jest

When you encounter issues using ES6 import statements in Jest, here are two effective methods to resolve them:

## 1. Use Node's Experimental VM Modules

Add the following to the scripts section of your package.json to enable experimental support for ECMAScript
modules:

### package.json

```javascript
"scripts": {
    "test": "NODE_OPTIONS=--experimental-vm-modules jest"
}
```

- By default, Jest does not fully support ECMAScript modules, which can lead to issues when using `import` and
  `export` syntax.

- This setting configures Node.js to allow Jest to support ECMAScript modules in an experimental environment.

## 2. Use Babel to Transpile Node Modules

First, ensure Babel is installed. Then configure jest.config.js and babel.config.cjs to allow Babel to process
your JavaScript files with Jest.

### jest.config.js

```javascript
export default {
  testEnvironment: 'node', // default option
};
```

- In this config file tells Jest to run the test in Node.js environment.

### babel.config.cjs

```javascript
module.exports = {
  // presets: [
  //   '@babel/preset-env',
  // ],
};
```

- Even if the `babel.config.cjs` file doesn’t specify presets or plugins, the existence of @babel/preset-env
  in the dependencies means Jest might be using the defaults provided by `babel-jest`.

# Prettier: What Is It and Why Is It Important?

Prettier is a code formatter tool that helps ensure your code is consistent and well-formatted. If you
accidentally leave out a semicolon in your JavaScript code, Prettier will automatically add it, making your
code well-structured and less prone to typos.

Having well-formatted code is important because consistency makes it easier to read and maintain. Prettier can
be installed on your system and configured for your preferences. Additionally, you can set up a
project-specific configuration file. This is especially useful when working in a team where each member may
have different formatting preferences. By using a shared configuration file for the project, you ensure that
everyone follows the same formatting rules, promoting consistency throughout the project.

# Setting Up a Configuration File

- Create a `.prettierrc` file.
- Add configuration settings options that you would like to have in your file.

Here's a breakdown and an explanation:

`arrowParens: "always"`

- Include parentheses around a single arrow function parameter.
- `"always"`: ensures parentheses are always included. For example: `(x)=>x`.

`bracketSpacing: "true"`

- Add spaces inside the curly braces of object literals.
- `true` means spaces will included. For example: `{ foo:bar }.

`embeddedLanguageFormatting: "auto"`

- Automatically formats code inside backticks or JSX tags.

- `auto`: ensures that the code inside these expressions is neatly formatted according to its rules. For
  example: Indentations, spacing, and line breaks inside template literals. Also proper formatting of embedded
  JavaScript or HTML code within JSX

`htmlWhitespaceSensitivity: "css`

- Dictates how whitespace in HTML is handled.
- `"css"`: follows the default value of CSS display property rules.

`insertPragma: false`

- This option will formats the file and then adds a `@format` comment at the top. Indicates the file have been
  formatted by Prettier.
- Developers who use Prettier with --insert-pragma set to true will format their files and add the @format
  marker, indicating those files are "formatted by Prettier."
- `false`: means Prettier will NOT add the `@format` marker to the top of the files after formatting.

`jsxBracketSameLine: false`

- Controls whether the > of a multi-line JSX element should be placed at the end of the last line instead of
  being alone on the next line.
- `false`: when set the false (which is the default), the closing bracket will be places at the end of the
  last line.

```javascript
<div>
  some content
</ >;
```

`jsxSingleQuote: false`

- Use single quotes instead of double quotes.
- `false`: means double quotes will be used.

`printWidth: 110`

- specifies the maximum line length that the printer will wrap on.
- `110`: means any line of code longer than 110 characters will be wrapped to the next line.

`proseWrap: "always"`

- Controls how line wrapping is handled in Markdown files.
- `always`: ensures that all lines of text in the Markdown files do not exceed the specified print width (110
  characters)

`quoteProps: "as-needed"`

- Will only add quotes around object properties according to JavaScript syntax rules.

### Example:

```javascript
const obj = {
  name: 'John',
  age: 30,
  'home address': '123 Main St',
  123: 'number as key',
  for: 'reserved word',
};
```

With quoteProps: "as-needed", Prettier will format it like this:

```javascript
const obj = {
  name: 'John',
  age: 30,
  'home address': '123 Main St',
  123: 'number as key',
  for: 'reserved word',
};
```

`requirePragma: false`

- When requirePragma is set to false, Prettier will format all files automatically, without needing any
  special comments.

`semi: true`

- Add a semicolon at the end of every statement.

`singleQuote: true`

- Use single quotes instead of double quotes.

`tabWidth: 2`

- The number of spaces per indentation level.

`trallingComma: "es5"`

- Controls whether trailing commas are added to the end of lists and objects.
- Setting to allow ES5 syntax

### Example:

Before formatting:

```javascript
const obj = {
  name: 'John',
  age: 30,
};
```

After formatting:

```javascript
const obj = {
  name: 'John',
  age: 30,
};
```

`useTabs: false`

- Indent lines with tabs instead of spaces.
- `false`: means spaces will be used for indentation.

`vueIndentScriptAndStyle: false`

- Controls whether scripts and styles in Vue files are indented.
- `false`: will not add indentation to the contents of script and style tags

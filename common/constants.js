function getAddress() {
  let ADDRESS = '';
  // check if we are node.js, on node.js there is a global process variable:
  if (typeof process !== 'undefined') {
    if (process.env.ADDRESS) {
      ADDRESS = process.env.ADDRESS;
    } else {
      ADDRESS = 'http://localhost';
    }
  } else {
    // If process is "undefined", is means we are not running the code on node.js, it means we are on the browser.
    ADDRESS = 'http://localhost';
  }

  return ADDRESS;
}

export const ADDRESS = getAddress();
// export const ADDRESS = typeof process !== 'undefined' && process.env.ADDRESS ? process.env.ADDRESS : 'http://localhost';
export const SERVER_PORT = typeof process !== 'undefined' && process.env.PORT ? process.env.PORT : 3000;
// export const CLIENT_PORT = 5507;

export const SERVER_ENDPOINT = `${ADDRESS}:${SERVER_PORT}`;

export const ALLOWED_ORIGIN = process.env.NODE_ENV === 'production' ? process.env.ALLOWED_ORIGIN : '*';

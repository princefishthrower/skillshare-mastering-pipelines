const handler = require('serve-handler');
const http = require('http');
const ngrok = require('ngrok');

// Part 1 - serve static content at port 5000
const server = http.createServer((request, response) => {
  return handler(request, response);
})
 
server.listen(5000, () => {
  console.log('Running at http://localhost:5000');
});

// Part 2 - use ngrok to expose port 5000 to internet
async function start() {
    const url = await ngrok.connect(5000);
    console.log("Ngrok tunnel to port 5000 exposed at: " + url);
}

start();
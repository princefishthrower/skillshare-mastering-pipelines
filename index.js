const handler = require("serve-handler");
const http = require("http");
const ngrok = require("ngrok");
const fetch = require("node-fetch");

function sendSlackMessage(message) {
  fetch(
    "https://hooks.slack.com/services/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",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: message
      }),
    }
  );
}

// Part 1 - serve static content at port 5000
const server = http.createServer((request, response) => {
  return handler(request, response);
});

server.listen(5000, () => {
  console.log("Running at http://localhost:5000");
  sendSlackMessage("Running at http://localhost:5000");
});

// Part 2 - use ngrok to expose port 5000 to internet
async function start() {
  const url = await ngrok.connect(5000);
  console.log("Ngrok tunnel to port 5000 exposed at: " + url);
  sendSlackMessage("Ngrok tunnel to port 5000 exposed at: " + url);
}

start();

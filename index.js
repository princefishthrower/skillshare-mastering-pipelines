const env = require('./src/env/.env.json');
const handler = require("serve-handler");
const http = require("http");
const ngrok = require("ngrok");
const fetch = require("node-fetch");

function sendSlackMessage(message) {
  fetch(
    process.env[env.SLACK_WEBHOOK_ENVIRONMENT_KEY],
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
  return handler(request, response, {
      public: "build"
  });
});

server.listen(env.port, () => {
  console.log("Running at http://localhost:" + env.port);
  sendSlackMessage("Running at http://localhost:" + env.port);
});

// Part 2 - use ngrok to expose port env.port to internet
async function start() {
  const url = await ngrok.connect(env.port);
  console.log("Ngrok tunnel to port " + env.port + " (Site name: + " + env.siteName + ") exposed at: " + url);
  sendSlackMessage("Ngrok tunnel to port " + env.port + " (Site name: + " + env.siteName + ") exposed at: " + url);
}

start();

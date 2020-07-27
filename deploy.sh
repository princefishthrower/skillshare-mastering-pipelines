export SLACK_WEBHOOK_URL=$1 &&
curl -X POST -H 'Content-type: application/json' --data '{"text":"Starting CI..."}' $SLACK_WEBHOOK_URL &&
cd /var/www/skillshare-scp-test && 
npm install --save serve-handler ngrok forever node-fetch && 
SLACK_WEBHOOK_URL=$1 forever restart index.js &&
curl -X POST -H 'Content-type: application/json' --data '{"text":"CI complete!"}' $SLACK_WEBHOOK_URL

curl -X POST -H 'Content-type: application/json' --data '{"text":"Starting CI..."}' https://hooks.slack.com/services/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 &&
cd /var/www/skillshare-scp-test && 
npm install --save serve-handler ngrok forever node-fetch && 
forever start index.js &&
curl -X POST -H 'Content-type: application/json' --data '{"text":"CI complete!"}' https://hooks.slack.com/services/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

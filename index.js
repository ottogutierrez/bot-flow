// You can find your project ID in your Dialogflow agent settings
//const projectId = 'AIzaSyAzwWcy-cl-wEC7mjS0eDqEb85UaUK-wDE'; //https://dialogflow.com/docs/agents#settings
const sessionId = 'quickstart-session-id';
const query = 'hello';
const languageCode = 'en-US';

// Grab the service account credentials path from an environment variable
//const keyPath = process.env.DF_SERVICE_ACCOUNT_PATH;
const keyPath = './agentotto-999ff-0ebe33b87b0e.json'
if(!keyPath) {
  console.log('You need to specify a path to a service account keypair in environment variable DF_SERVICE_ACCOUNT_PATH. See README.md for details.');
  process.exit(1);
}

// Grab the Dialogflow project ID from an environment variable
//const projectId = process.env.DF_PROJECT_ID;
const projectId = 'agentotto-999ff'
if(!projectId) {
  console.log('You need to specify a project ID in the environment variable DF_PROJECT_ID. See README.md for details.');
  process.exit(1);
}


// Instantiate a DialogFlow client.
// const dialogflow = require('dialogflow');
// const sessionClient = new dialogflow.SessionsClient();

// Load and instantiate the Dialogflow client library
const { SessionsClient } = require('dialogflow');
const dialogflowClient = new SessionsClient({
  keyFilename: keyPath
})


// Define session path
const sessionPath = dialogflowClient.sessionPath(projectId, sessionId);

// The text query request.
const request = {
  session: sessionPath,
  queryInput: {
    text: {
      text: query,
      languageCode: languageCode,
    },
  },
};

// Send request and log result
dialogflowClient
  .detectIntent(request)
  .then(responses => {
    console.log('Detected intent');
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    if (result.intent) {
      console.log(`  Intent: ${result.intent.displayName}`);
    } else {
      console.log(`  No intent matched.`);
    }
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
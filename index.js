// index.js
// where your node app starts

require('dotenv').config();
const express = require('express');
const app = express();

// enable CORS for FCC testing
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // legacy browsers may choke on 204

// serve static files
app.use(express.static('public'));

// serve index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// API endpoint for greeting
app.get('/api/hello', (req, res) => {
  res.json({ greeting: 'hello API' });
});

// API endpoint for header parser
app.get('/api/whoami', (req, res) => {
  // Extract necessary information from request headers
  const ipaddress = req.headers['x-forwarded-for']?.split(',')[0] || req.ip; // client's IP
  const language = req.headers['accept-language']; // client's language
  const software = req.headers['user-agent']; // client's user-agent

  // Respond with extracted data
  res.json({
    ipaddress,
    language,
    software,
  });
});

// start listening for requests
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});

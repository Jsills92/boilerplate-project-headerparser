// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/whoami", (req, res) => {
  
  // Get the user's IP address (from the 'x-forwarded-for' header or the default 'req.ip' if behind a proxy)
  let ipaddress = req.headers['x-forwarded-for'] || req.ip;
  // Get the user's preferred language (Accept-Language header)
  let language = req.headers['accept-language'].split(',')[0]; // Just the first language in the list
  // Get the user's software (User-Agent header)
  let software = req.headers['user-agent'];

  // Respond with JSON object including ipaddress, language, and software
  res.json({
    ipaddress: ipaddress,
    language: language,
    software: software
  });
});





// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// The needed routes
app.get(['/api/:dateString', '/api'], (req, res) => {
  // Reformat our param
  // req.params.dateString = req.params?.dateString?.includes('-') ?
  // req.params?.dateString : Number(req.params?.dateString);

  // // create the date object.
  // const date = new Date(req.params.dateString);
  // res.json({ unix: date.getTime(), utc: date.toUTCString() });

  let date;
  // Empty date
  if (undefined === req.params?.dateString) {
    date = new Date();
    // return response..
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
  } else {
    // If a set a number was entered..
    if (!isNaN(req.params?.dateString)) {
      date = new Date(Number(req.params?.dateString));
      // return response..
      res.json({ unix: date.getTime(), utc: date.toUTCString() });
    } else {
      const timestamp = Date.parse(req.params?.dateString);
      if (isNaN(timestamp) == false) {
        // create the date object.
        date = new Date(timestamp);
        // return response..
        res.json({ unix: date.getTime(), utc: date.toUTCString() });
      } else {
        res.json({ error: "Invalid Date" });
      }
    }
  }
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
//  const invalidate = (date)=> date.toUTCString() === 'Invalid date'



// your first API endpoint... 
app.get("/api/:date", function (req, res) {
  let dateString = req.params.date;
  
  // Check if dateString is empty
  if (!dateString) {
    // Create a new Date object representing the current time
    let currentDate = new Date();
    
    res.json({ 
      unix: currentDate.getTime(),
      utc: currentDate.toUTCString() 
    });
    return;
  }
  
  let date = new Date(dateString);
  
  // Check if the date is invalid
  if (isNaN(date.getTime())) {
    // Try parsing as Unix timestamp
    date = new Date(parseInt(dateString));
    
    // Check again if the date is invalid
    if (isNaN(date.getTime())) {
      res.json({ error: "Invalid date" });
      return;
    }
  }

  res.json({ 
    unix: date.getTime(),
    utc: date.toUTCString() 
  });
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

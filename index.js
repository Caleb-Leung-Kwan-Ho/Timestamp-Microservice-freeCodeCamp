// index.js
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

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/:date?", function(req, res,next) {
  const data = req.params.date;
  if (!data){
    const utcFormat = new Date().toUTCString()
    const unixFormat = Date.parse(utcFormat)
    res.json({unix:unixFormat, utc: utcFormat});
    next();
  }
  const unixRegex = /^[0-9]+$/;
  const unix = unixRegex.test(data);
  if (unix){
    const dateInt = parseInt(data);
    const dateString = new Date(dateInt);
    const utcFormat = new Date(dateString).toUTCString();
    res.json({unix:dateInt, utc:utcFormat});
  } else{
    const dateString = Date.parse(data);
    if (dateString){
      const utcFormat = new Date(dateString).toUTCString();   
      res.json({unix: dateString, utc:utcFormat})
    }else{
      res.json({ error: "Invalid Date" });
    }
  }
  next();

});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

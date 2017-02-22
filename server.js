// https://momentjs.com/docs/
// https://camper-api-project-codefay.c9users.io/date/1450137600
// https://camper-api-project-codefay.c9users.io/date/December%2015,%202015

var express = require('express');
var app = express();
var moment = require('moment'); // moment library for parsing dates
var path = require('path');

app.get('/', function(req,res) {
   // Create a landing page here!
  res.sendFile(path.join(__dirname+'/index.html'));
  
})


// how do we make a home page? 
app.get('/date/:dateInput', function(req, res){
    // Pass a string as a paramter
    var input = req.params.dateInput;
    var unix; var natural;
    // check to see whether that string contains either a unix timestamp or a natural language date (example: January 1, 2016).
    if (moment.unix(parseInt(input)).isValid()) { // if input is in unix format... then create natural
      unix = parseInt(input); // unix = input
      natural = moment.unix(parseInt(input)).format("MMMM DD, YYYY"); // convert input to unix
    } else if (moment(input, "MMMM DD, YYYY").isValid()) { // check if format is in natural format
      unix = moment(input, "MMMM DD, YYYY").unix(); 
      natural = input;
    } else {
      unix = null;
      natural = null;
    }
    var ans = {
      unix: unix, 
      natural: natural
    };
  res.send(ans);
});

app.listen(8080);
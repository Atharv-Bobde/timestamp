// server.js
// where your node app starts
require('dotenv').config()
// init project
var express = require('express');
var app = express();
const path=require('path')

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const ServerlessHttp = require('serverless-http');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

//router
const router=express.Router();

// http://expressjs.com/en/starter/basic-routing.html
router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname ,'../views/index.html'));
});


// your first API endpoint... 
router.get("/api/:date", function (req, res) {
  let l=new Date(req.params.date);
  let regx=/\D/;
  if(!regx.test(req.params.date))
    l=new Date(parseInt(req.params.date));
  if(l=="Invalid Date")
    res.json({'error':"Invalid Date"});
  else
    res.json({'unix':Date.parse(l),'utc':l.toUTCString()});
});
router.get("/api", function (req, res) {
  const curr_time=new Date().toUTCString();
  res.json({'unix':Date.parse(curr_time),'utc':curr_time});
});



app.use('/.netlify/functions/server',router);

module.exports.handler=ServerlessHttp(app);
/**
 * The Server Can be configured and created here...
 * 
 * You can find the JSON Data file here in the Data module. Feel free to impliment a framework if needed.
 */

/*
-- This is the product data, you can view it in the file itself for more details 
{
    "_id": "019",
    "isActive": "false",
    "price": "23.00",
    "picture": "/img/products/N16501_430.png",
    "name": "Damage Reverse Thickening Conditioner",
    "about": "Dolor voluptate velit consequat duis. Aute ad officia fugiat esse anim exercitation voluptate excepteur pariatur sit culpa duis qui esse. Labore amet ad eu veniam nostrud minim labore aliquip est sint voluptate nostrud reprehenderit. Ipsum nostrud culpa consequat reprehenderit.",
    "tags": [
        "ojon",
        "conditioner"
    ]
}
*/
const data      = require('./data');
const hostname  = 'localhost';
const port      = 3035;

// Add express.
var express = require('express');
// Add cors control.
var cors = require('cors');



/** 
 * Start the Node Server Here...
 * 
 * The http.createServer() method creates a new server that listens at the specified port.  
 * The requestListener function (function (req, res)) is executed each time the server gets a request. 
 * The Request object 'req' represents the request to the server.
 * The ServerResponse object 'res' represents the writable stream back to the client.
 */
// http.createServer(function (req, res) {
//     // .. Here you can create your data response in a JSON format
// //     res.end("Response goes in here..."); // Write out the default response
//      //end the response
// }).listen( port );


const app = express();
app.use(cors());
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.json());

app.get('/', function(req, res) {
  res.json({msg: 'This is CORS-enabled for all origins!'});
});

// end-point used to do the reactive search
app.post('/search', function(req, res) {
  // if the request body is not nul
  if(req.body.text){
    const answ = getSearched(req.body.text);
    res.json({data:answ});
  }
  
});



// search by converting the query in a regular expresion and try to match
// in the data array using filter and regExp test.
function getSearched(text){
  const regExp = new RegExp(text, "i");
  filtered = data.filter( obj => regExp.test(obj.name));
  return filtered;
}


app.listen(port, () => {
  console.log(`[Server running on ${hostname}:${port}]`);
});




var express = require('express');
var app = express();
var bodyParser = require('body-parser');

const cors = require('cors');
const jsonParser = express.json();

app.options('*', cors());
app.use(cors()); 
app.use(bodyParser.json())

require('./app/router/router.js')(app);
 
//require('./app/route/project.route.js')(app);
 
// Create a Server
var server = app.listen(8080, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port)
})

  
//app.post("/signup", jsonParser, function (request, response) {
//    console.log(request.body);
//    if(!request.body) return response.sendStatus(400);
//    console.log(request.body);
//    response.json(`${request.body.userName} - ${request.body.userAge}`);
//});
  
//app.get("/", function(request, response){
      
//    response.sendFile(__dirname + "/index.html");
//});
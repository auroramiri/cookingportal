var express = require('express');
var app = express();
var bodyParser = require('body-parser');

const cors = require('cors');

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
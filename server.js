var express = require('express');
var os = require("os");
const PORT = 8080;
const app = express();


var healthy=true;


app.get('/', function (req, res) {
  res.send('Welcome App [version: 10 - ' + os.hostname() + ']\n');
});



app.get('/healthz', function (req, res) {
  console.log('health check')
  if(healthy)
   res.send('OK');
  else
   res.status(404).send('NOT OK');
});


app.get('/kill', function (req, res) {
   healthy=false;
   res.send('Killed ' + os.hostname());
});



app.listen(PORT);
console.log('Running on http://localhost:' + PORT);


process.on('SIGINT', function () {
    console.log('Cleanup.....');
    process.exit();
});

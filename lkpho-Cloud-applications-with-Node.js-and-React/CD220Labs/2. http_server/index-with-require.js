const http = require('http');
const today = require('./today');

const requestListener = function (req, res) {
  res.writeHead(200);
  let date = today.getDate();
  let greeting = "It is still not morning";
  if (date.getHours()>6 && date.getHours()<12) {
    greeting = "Good morning!"
  } else if (date.getHours()>=12 && date.getHours()<18) {
    greeting = "Good afternoon!"
  } else if (date.getHours()>=18 && date.getHours()<21) {
    greeting = "Good evening!"
  } else if (date.getHours()>=21 && date.getHours()<24) {
    greeting = "Good night!"
  }
  res.end(`Hello, ${greeting}`);
}

const port = 8080;
const server = http.createServer(requestListener);
console.log('server listening on port: ' + port);
server.listen(port);
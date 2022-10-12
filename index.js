const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path');
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
  });
app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
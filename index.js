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

const users = [];

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    socket.broadcast.emit('user-left', users[socket.id])
  });
  socket.on('new-user', (name)=>{
    users[socket.id] = name;
    socket.broadcast.emit('user-joined', name)
  })
  socket.on('chat message', (msg, user) => {
    socket.broadcast.emit('msg', msg, user);
    console.log('message: ' + msg);
  });
  
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
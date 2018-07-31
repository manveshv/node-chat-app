const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', {
    from: 'Myself',
    text: 'Text Message'
  });

  socket.on('createMessage', (newMsg) => {
    console.log('createMessage', newMsg);
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  })
})

server.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});

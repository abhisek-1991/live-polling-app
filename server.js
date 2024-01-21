// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3001;

app.use(express.static('build'));

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  // Handle poll events
  socket.on('vote', (data) => {
    io.emit('vote', data);
  });
});

let voteCounts = {
    optionA: 0,
    optionB: 0
  };
  
  io.on('connection', (socket) => {
    console.log('A user connected');
  
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  
    // Handle poll events
    socket.on('vote', (data) => {
      if (data.option === 'optionA') {
        voteCounts.optionA += 1;
      } else if (data.option === 'optionB') {
        voteCounts.optionB += 1;
      }
      io.emit('vote', voteCounts);
    });
  });

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

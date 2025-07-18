const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

let documentContent = "";

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.emit('load-document', documentContent);

  socket.on('send-changes', (data) => {
    documentContent = data;
    socket.broadcast.emit('receive-changes', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(3001, () => {
  console.log("Server running on port 3001");
});

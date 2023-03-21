const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer,{
  cors: {
    origin: '*',
    methods: ["GET", "POST"]
  }

});
const cors = require('cors');
const express = require('express');

app.use(cors({
  origin: 'http://localhost:5173'
}));
io.on('connection', (socket) => {
  socket.on('chat_message',(msg)=>{
    io.emit('chat_message',msg);
    console.log(`message received: ${msg}`)
  })
  socket.on('disconnect', (e) => {
    console.log(`user disconnected : ${e}`);
  });
  socket.on('connect', () => {
    console.log('user connected');
  });
});

httpServer.listen(8080, () => {
  console.log('listening on *:8080');
});
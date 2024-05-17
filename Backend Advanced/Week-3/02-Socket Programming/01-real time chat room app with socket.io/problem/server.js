// No need to change the pre-written code
// Implement the features in io.on() section
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { MessageModel } from './message.schema.js';
import moment from 'moment';

export const app = express();
app.use(cors());

export const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('Connection made.');

  // Write your code here
  // listen for chat messages from client
  socket.on('chatMessage', async (data) => {
    console.log(`Message recieved from ${data.username}: ${data.message}`);
    // broadcast the message to all clients in the same room
    const timestamp = new Date();
    const currentDate = moment();
    const formattedDate = currentDate.format('DD MMM YYYY');
    const formattedTime = currentDate.format('hh:mm:ss A');
    const newMessage = new MessageModel(data);
    newMessage.timestamp = timestamp;
    await newMessage.save();

    io.to(data.roomId).emit('message', {
      name: data.username,
      message: data.message,
      timestamp: {
        formattedDate,
        formattedTime,
      },
    });
  });

  // join a room
  socket.on('joinRoom', (data) => {
    const { roomId, username } = data;
    socket.join(roomId);
    console.log(`${username} joined room ${roomId}`);
    socket.emit('welcome', `Welcome ${username} to the room`);
    socket.broadcast
      .to(roomId)
      .emit('roomAlert', `${username} joined the room`);
  });

  // Leave a room
  socket.on('leaveRoom', (data) => {
    const { roomId, username } = data;
    socket.leave(roomId);
    console.log(`${username} left room ${roomId}`);
    // Notify other users in the room about the leaving user
    io.to(roomId).emit('message', `${username} left the room`);
  });

  socket.on('disconnect', () => {
    console.log('Connection disconnected.');
  });
});

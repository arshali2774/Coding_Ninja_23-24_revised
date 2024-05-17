// Complete the server.js file to make user's add, delete and update the todos.
import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';
import Task from './task.schema.js';

const app = express();
app.use(cors());
export const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', async (socket) => {
  console.log('Connection Online');
  const tasks = await Task.find({});
  socket.emit('allTasks', tasks);
  socket.on('addTask', async (task) => {
    const newTask = new Task({ text: task, createdAt: Date.now() });
    await newTask.save();
    const id = newTask._id;
    io.emit('addTask', { task, id });
  });
  socket.on('deleteTask', async (taskId) => {
    await Task.findByIdAndDelete(taskId);
    io.emit('taskDeleted');
  });
  socket.on('disconnect', () => {
    console.log('Connection disconnected');
  });
});

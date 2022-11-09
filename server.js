import express from 'express';
import path, { join } from 'path';
import {fileURLToPath} from 'url';
import http from 'http'
import { Server } from 'socket.io';
import { formatMessage } from './utils/messages.js';

const app = express();
const httpserver = http.createServer(app)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const io = new Server(httpserver);

app.use(express.static(join(__dirname, 'public')))
const botName = "chatApp bot"

io.on('connection', (socket) => {
  console.log("New websocket connection");

  //welcome current user
  socket.emit('message', formatMessage(botName ,"Welcome to the chat app!") )  //message to current user

  //broadcast message on connect
  socket.broadcast.emit('message', formatMessage(botName , "User has joined the chat"))  //message to everone except current user

  //message on disconnect
  socket.on('disconnect', () => {
    io.emit('message', formatMessage(botName , "User has left the chat")) //message to everyone
  })

  //receive and transmit userMessage
  socket.on('chatMessage', msg => {
    io.emit('message', formatMessage("USER" ,  msg))
  })
})



const PORT = 3000 || process.env.PORT;

httpserver.listen(PORT, () => console.log(`Server runnning on sport port ${PORT}`));
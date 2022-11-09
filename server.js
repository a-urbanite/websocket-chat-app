import express from "express";
import path, { join } from "path";
import { fileURLToPath } from "url";
import http from "http";
import { Server } from "socket.io";
import { formatMessage } from "./utils/messages.js";
import { createUser, getCurrentUser, getRoomUsers, userLeave } from "./utils/user.js";

const app = express();
const httpserver = http.createServer(app);
const io = new Server(httpserver);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(join(__dirname, "client")));

const botName = "chatApp bot";

io.on("connection", (socket) => {

  socket.on("joinRoom", ({ username, room }) => {

    //creates user
    const user = createUser(socket.id, username, room);

    //add user to room
    socket
      .join(user.room)

    //message to current user
    socket
      .emit("message", formatMessage(botName, "Welcome to the chat app!")); 

    //broadcast message to everyone else in the room
    socket.broadcast
      .to(user.room)
      .emit("message", formatMessage(botName, `${user.userName} has joined the chat`));

    // sends updates roomUserlist and roomName to frontend
    io
      .to(user.room)
      .emit('roomUsers', {room: user.room, users:getRoomUsers(user.room)})
  });

  //receive and transmit userMessage
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);
    io
      .to(user.room)
      .emit("message", formatMessage(user.userName, msg));
  });

  //message on disconnect
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);
    if (user) {
      io
        .to(user.room)
        .emit("message", formatMessage(botName, `${user.userName} has left the chat`)) //message to everyone
        
      io 
        .emit('roomUsers', {room: user.room, users: getRoomUsers(user.room)});
    }
  });
});

const PORT = 3000 || process.env.PORT;

httpserver.listen(PORT, () => console.log(`Server runnning on sport port ${PORT}`));

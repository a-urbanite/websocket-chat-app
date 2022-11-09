import { outputMessage, outputRoomName, outputUsers } from "./domManipulation.js";

//intialize socket and send info to backend
const socket = io();
const {username, room} = Qs.parse(location.search, {ignoreQueryPrefix: true})
socket.emit('joinRoom', {username, room})

//receive message from the server
socket.on('message', (msg) => {
  outputMessage(msg)
  document.querySelector('.chat-messages').scrollTop = chatMessages.scrollHeight;
})

//get room and users
socket.on('roomUsers', ({room, users}) => {
  outputRoomName(room);
  outputUsers(users);
})

//send message to server
document.getElementById('chat-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const textField = e.target.elements.msg;
  socket.emit('chatMessage', textField.value)
  textField.value = '';
  textField.focus();
});
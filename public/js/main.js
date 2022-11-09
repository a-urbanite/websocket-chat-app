const formElem = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

const socket = io();

//receive message from the server
socket.on('message', (msg) => {
  console.log(msg)
  outputMessage(msg)
  chatMessages.scrollTop = chatMessages.scrollHeight;
})


//send message to server
formElem.addEventListener('submit', (e) => {
  e.preventDefault();
  const textField = e.target.elements.msg;
  socket.emit('chatMessage', textField.value)
  textField.value = '';
  textField.focus();
})

//output message to DOM
const outputMessage = (msg) => {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `						
    <p class="meta">${msg.userName}<span>   ${msg.time}</span></p>
    <p class="text">
      ${msg.text}
    </p>`
  document.querySelector('.chat-messages').appendChild(div)
}
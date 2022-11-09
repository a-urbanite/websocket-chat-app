export const outputMessage = (msg) => {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `						
    <p class="meta">${msg.userName}<span>   ${msg.time}</span></p>
    <p class="text">
      ${msg.text}
    </p>`
  document.querySelector('.chat-messages').appendChild(div)
}

export const outputRoomName = (room) => {
  const roomElement = document.getElementById('room-name')
  roomElement.innerText = room;
}

export const outputUsers = (users) => {
  const usersElement = document.getElementById('users');
  const userList = `${users.map((user) => `<li>${user.userName}</li>`).join('')}`
  console.log(userList)
  usersElement.innerHTML = userList
}
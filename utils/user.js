export const users = [];

export const createUser = (id, userName, room) => {
  const user = {id, userName, room}
  users.push(user)
  return user
}

export const getCurrentUser = (id) => {
  return users.find((user) => user.id === id)
}

export const userLeave = (id) => {
  const userIndex = users.findIndex((user) => user.id === id)

  if (userIndex !== -1) {
    return users.splice(userIndex, 1)[0];
  }
}

export const getRoomUsers = (room) => {
  return users.filter((user) => user.room === room)
}
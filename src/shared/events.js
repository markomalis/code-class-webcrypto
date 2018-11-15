export const CHAT_MESSAGE = 'CHAT_MESSAGE'
export const CLOSE_SOCKET = 'CLOSE_SOCKET'
export const REGISTER_CLIENT = 'REGISTER_CLIENT'
export const REGISTERED_CLIENT = 'REGISTERED_CLIENT'
export const UPDATE_CLIENTS = 'UPDATE_CLIENTS'
export const USERNAME_TAKEN = 'USERNAME_TAKEN'

export function chatMessage(message) {
  return JSON.stringify({
    event: CHAT_MESSAGE,
    message
  })
}

export function closeSocket() {
  return JSON.stringify({ event: CLOSE_SOCKET })
}

export function registerClient(client) {
  return JSON.stringify({
    event: REGISTER_CLIENT,
    client
  })
}

export function registeredClient(client) {
  return JSON.stringify({
    event: REGISTERED_CLIENT,
    client
  })
}

export function updateClients(clients) {
  return JSON.stringify({
    event: UPDATE_CLIENTS,
    clients
  })
}

export function usernameTaken(user) {
  return JSON.stringify({
    event: USERNAME_TAKEN,
    user
  })
}
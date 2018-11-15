import WebSocket from 'ws'

import * as wsEvents from '../shared/events'

export default function({ socket, server, message }) {
  const { event, ...data } = JSON.parse(message)

  switch(event) {
    case wsEvents.CHAT_MESSAGE:
      sendChatMessage({ socket, server, message: data.message })
      break

    case wsEvents.REGISTER_CLIENT:
      registerClient({ socket, server, client: data.client })
      updateClients({ server })
      break

    case wsEvents.CLOSE_SOCKET:
      removeClient({ socket, server })
      updateClients({ server })

    default:
      break
  }
}

function registerClient({ socket, server, client }) {
  const clients = server.__wsClients || {}

  if(clients[client.username]) {
    socket.send(wsEvents.usernameTaken({ username: client.username }))
  } else {
    server.__wsClients = { ...clients, [client.username]: { socket, client } }
    socket.send(wsEvents.registeredClient({ ...client }))
  }
}

function removeClient({ socket, server }) {
  const clients = server.__wsClients || {}

  const clientToRemove = Object.keys(clients)
    .find(clientKey => clients[clientKey].socket === socket)

  if(clientToRemove) {
    clients[clientToRemove].socket.terminate()
    delete clients[clientToRemove]
  }
}

function sendChatMessage({ socket, server, message }) {
  const clients = server.__wsClients || {}
  const client = clients[message.receiver]

  console.log('MESSAGE', message)

  if(client) {
    client.socket.send(wsEvents.chatMessage(message))
  }
}

function updateClients({ server }) {
  const clients = server.__wsClients || {}
  const clientKeys = Object.keys(clients)
  const clientsList = clientKeys.map(key => clients[key].client)

  clientKeys.forEach(key => {
    const client = clients[key]

    if(client.socket.readyState === WebSocket.OPEN) {
      client.socket.send(wsEvents.updateClients(clientsList))
    }
  })
}
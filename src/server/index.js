import WebSocket from 'ws'

import wsEventHandler from './ws-eventhandler'
import * as wsEvents from '../shared/events'

const server = new WebSocket.Server({ port: Number(process.env.WS_PORT) });

server.on('connection', function connection(socket) {
  socket.on('message', function incoming(message) {
    wsEventHandler({
      server,
      socket,
      message
    })
  })

  socket.on('close', () => {
    wsEventHandler({
      server,
      socket,
      message: wsEvents.closeSocket()
    })
  })
})
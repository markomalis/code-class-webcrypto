import * as wsEvents from '../../shared/events'

const WS_URL = `ws://${process.env.WS_HOST}:${process.env.WS_PORT}`

export default function() {
  const ws = new WebSocket(WS_URL)

  ws.onopen = () => {
    console.log('Opened websocket')
  }

  ws.onclose = () => {
    console.log('Close websocket')
  }

  ws.onmessage = ({ data }) => {
    const { event, ...payload } = JSON.parse(data)
    ws.dispatchEvent(new CustomEvent(event, { detail: payload }))
  }

  ws.onerror = (error) => {
    console.log(`WebSocket error: ${error}`)
  }

  ws.registerUser = (user) => {
    ws.send(wsEvents.registerClient(user))
  }

  ws.sendChatMessage = (message) => {
    ws.send(wsEvents.chatMessage(message))
  }

  return Object.freeze({
    socket: ws
  })
}
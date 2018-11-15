<template>
  <main class="main-content">
    <header
      class="app-header"
      @click="reloadApp"
    >
      WebCryptoChat
    </header>
    <div
      v-if="userRegistered"
      class="chat-pane"
    >
      <connected-peers
        :peers="peers"
        :selectedPeer="selectedPeerIndex"
        class="connected-peers"
        @selectPeer="selectPeer"
      />
      <message-viewer
        :messages="messages"
        class="message-viewer"
        @sendMessage="sendMessage"
        @selectMessage="selectMessage"
      />
    </div>
    <div
      v-else
      class="registration-pane"
    >
      <user-registration
        :registration-error="registrationError"
        @userRegistration="registrateUser"
      />
    </div>
  </main>
</template>

<script>
import chatConnection from './lib/chat-connection'
import createUser from './lib/create-user'
import decryptMessage from './lib/decrypt-message'
import encryptMessage from './lib/encrypt-message'
import * as wsEvents from '../shared/events'

import { ConnectedPeers, MessageViewer, UserRegistration } from './components'

export default {
  components: {
    ConnectedPeers,
    MessageViewer,
    UserRegistration
  },
  data() {
    return {
      connection: undefined,
      messages: [],
      peers: [],
      registrationError: undefined,
      selectedPeer: undefined,
      user: undefined,
      username: undefined,
      userRegistered: false,
    }
  },
  mounted() {
    this.connection = chatConnection()
    const { socket } = this.connection

    socket.addEventListener(wsEvents.USERNAME_TAKEN, (data) => {
      this.registrationError = `Username ${data.detail.user.username} is already taken`
    })

    socket.addEventListener(wsEvents.REGISTERED_CLIENT, (data) => {
      this.username = data.detail.client.username
      this.userRegistered = true
    })

    socket.addEventListener(wsEvents.UPDATE_CLIENTS, (data) => {
      this.peers = data.detail.clients || []
    })

    socket.addEventListener(wsEvents.CHAT_MESSAGE, (data) => {
      decryptMessage(data.detail.message, this.user.cryptoKeys.privateKey)
        .then(message => {
          this.messages = [ ...this.messages, { ...data.detail.message, content: message } ]
        })
    })
  },
  computed: {
    selectedPeerIndex() {
      const selectedPeerIndex = this.peers.indexOf(this.selectedPeer)
      return selectedPeerIndex === -1
        ? undefined
        : selectedPeerIndex
    }
  },
  methods: {
    registrateUser(user) {
      const { socket } = this.connection

      createUser(user)
        .then(user => {
          this.user = user
          socket.registerUser({
            username: user.username,
            publicKeyString: user.publicKeyString
          })
        })
    },
    reloadApp() {
      window.location.reload(false)
    },
    selectMessage({ sender }) {
      this.selectedPeer = sender
    },
    selectPeer(peer) {
      this.selectedPeer = peer
    },
    sendMessage(message) {
      const { connection, username, peers, selectedPeer, messages } = this
      if(typeof selectedPeer !== 'undefined') {
        encryptMessage(message, selectedPeer.publicKeyString)
          .then(encryptedMessage => {

            const receiver = selectedPeer.username
            const chat = {
              content: encryptedMessage.message,
              iv: encryptedMessage.iv,
              sender: username,
              receiver
            }

            console.log('SEND_MESSAGE', chat)

            if(username !== receiver) {
              connection.socket.sendChatMessage(chat)
            }

            this.messages = [ ...messages, { ...chat, content: message, own: true } ]
          })
      }
    }
  },
}
</script>

<style>
  body {
    margin: 0;
    width: 100%;
    height: 100%;
    font-family: sans-serif;
  }

  .main-content {
    min-height: 100vh;
    width: 100vw;
    overflow: hidden;
    position: relative;
  }

  .app-header {
    cursor: pointer;
    position: relative;
    z-index: 3;
    width: 100%;
    height: 40px;
    background-color: #FFFF99;
    color: #555;
    font-size: 23px;
    font-family: monospace;
    font-weight: bold;
    line-height: 40px;
    text-align: center;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  }

  .chat-pane {
    display: flex;
    position: absolute;
    width: 100%;
    height: calc(100% - 40px);
  }

  .connected-peers,
  .message-viewer {
    height: 100%;
  }

  .connected-peers {
    width: 35%;
  }

  .message-viewer {
    width: 65%;
  }
</style>

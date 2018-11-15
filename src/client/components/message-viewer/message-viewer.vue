<template>
  <div
    :class="{ 'message-viewer--visible': pageLoaded }"
    class="message-viewer"
  >
    <ul class="message-viewer__messages">
      <li
      v-for="(message, index) in messages"
      :key="`${message.content}-${index}`"
      :class="{ 'message-viewer__message--own': message.own }"
      class="message-viewer__message"
      @click="$emit('selectMessage', message)"
    >
      <div
        class="message-viewer__message-sender"
      >
        {{ message.own ? `Sent to: ${message.receiver}` : `${message.sender} :` }}
      </div>
      <div class="message-viewer__message-content">
        {{ message.content }}
      </div>
    </li>
    </ul>
    <form
      class="message-viewer__send"
      @submit.prevent="sendMessage"
    >
      <input
        v-model="messageContent"
        class="message-viewer__send-message"
        placeholder="Type a message..."
        type="text"
      >
      <button class="message-viewer__send-button">Send</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    messages: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      messageContent: '',
      pageLoaded: false
    }
  },
  mounted() {
    this.pageLoaded = true
  },
  methods: {
    sendMessage() {
      if(this.messageContent.length) {
        this.$emit('sendMessage', this.messageContent)
        this.messageContent = ''
      }
    }
  }
}
</script>

<style>
  .message-viewer {
    padding: 1rem 1rem 2rem;
    margin: 0;
    box-sizing: border-box;
    background: #FCFCFB;
    transform: translateX(100%);
    opacity: .1;
    transition: all .3s linear;
  }

  .message-viewer--visible {
    transform: translateX(0);
    opacity: 1;
  }

  .message-viewer__messages {
    list-style: none;
    margin: 0;
    padding: 0;
    height: calc(100% - 3rem);
    overflow-y: auto;
  }

  .message-viewer__message {
    padding: .3rem;
    font-size: 20px;
    line-height: 20px;
    background-color: #e9f3ea;
    margin-bottom: 1rem;
    border-radius: 6px;
    color: #555;
    float: right;
    width: 60%;
  }

  .message-viewer__message--own {
    float: left;
    background-color: #FFFF99;
  }

  .message-viewer__message-sender {
    font-size: 14px;
    line-height: 14px;
    margin-bottom: .2rem;
  }

  .message-viewer__message-content {
    font-weight: bold;
  }

  .message-viewer__send {
    bottom: 0;
    height: 5rem;
    background-color: white;
    margin: 0 -1rem;
    display: flex;
    padding: 0 1rem;
    position: relative;
    border-top: 1px solid #0000003d;
  }

  .message-viewer__send-message {
    width: 85%;
    border: 0;
    font-size: 20px;
  }

  .message-viewer__send-button {
    width: 15%;
    border: 0;
    font-size: 20px;
  }
</style>

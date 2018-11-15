<template>
  <ul
    :class="{ 'connected-peers--visible': pageLoaded }"
    class="connected-peers"
  >
    <li
      v-for="(peer, index) in peers"
      :key="peer.username"
      class="connected-peers__peer"
      @click="selectPeer(index)"
    >
      <button
        :class="{ 'connected-peers__peer-button--selected': index === selectedPeerIndex }"
        class="connected-peers__peer-button"
      >
        {{ peer.username }}
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    peers: {
      type: Array,
      default: () => []
    },
    selectedPeer: {
      type: Number
    }
  },
  data() {
    return {
      pageLoaded: false,
      selectedPeerIndex: -1
    }
  },
  mounted() {
    this.pageLoaded = true
  },
  watch: {
    selectedPeer(newPeer) {
      this.selectedPeerIndex === newPeer
    }
  },
  methods: {
    selectPeer(peerIndex) {
      const newIndex = this.selectedPeerIndex === peerIndex
        ? undefined
        : peerIndex

      this.selectedPeerIndex = newIndex

      if(typeof newIndex !== 'undefined') {
        this.$emit('selectPeer', this.peers[newIndex])
      } else {
        this.$emit('selectPeer', undefined)
      }
    }
  }
}
</script>

<style>
  .connected-peers {
    z-index: 2;
    list-style: none;
    padding: 2rem 1rem;
    margin: 0;
    box-sizing: border-box;
    overflow-y: auto;
    position: relative;
    transform: translateX(-100%);
    transition: transform .3s ease-out;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  }

  .connected-peers--visible {
    transform: translateX(0);
  }

  .connected-peers__peer {
    margin-bottom: .5rem;
  }

  .connected-peers__peer-button {
    padding: .5rem 1rem;
    width: 100%;
    text-align: left;
    background: transparent;
    border: solid #FA9A9A 2px;
    font-size: 16px;
    line-height: 16px;
    border-radius: 3px;
    color: #555555;
  }

  .connected-peers__peer-button:focus {
    outline: none;
  }

  .connected-peers__peer-button--selected {
    background-color: #FA9A9A;
    border: solid white 2px;
    border-radius: 3px;
  }
</style>

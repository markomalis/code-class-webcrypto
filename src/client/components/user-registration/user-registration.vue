<template>
  <form
    class="user-registration"
    @submit.prevent="submitUser"
  >
    <input
      v-model="username"
      class="user-registration__input"
      type="text"
      name="username"
      placeholder="Choose a username"
    >
    <div>{{ registrationError }}</div>
    <button
      class="user-registration__start-button"
      type="submit"
    >
      Start chat
    </button>
  </form>
</template>

<script>
export default {
  props: {
    registrationError: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      username: ''
    }
  },
  methods: {
    submitUser() {
      if(this.username && this.username.length) {
        this.$emit('userRegistration', { username: this.username })
      }
    }
  }
}
</script>

<style>
  .user-registration {
    width: 250px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 3rem;
  }

  .user-registration__input {
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding: .5rem;
    font-size: 16px;
    margin-bottom: 1rem;
    box-sizing: border-box;
    border: 0;
  }

  .user-registration__start-button {
    height: 30px;
    line-height: 16px;
    padding: .5rem;
    font-size: 16px;
    width: 100%;
    box-sizing: border-box;
    border: 0;
    border-radius: 3px;
    background-color: #FA9A9A;
    color: #555555;
  }
</style>

<template>
  <v-col class="text-field" cols="12">
    <v-text-field
      v-model="text"
      label="Type your message"
      placeholder="Type here"
      outlined
      @keydown.enter="send"
    ></v-text-field>
  </v-col>
</template>

<script>
export default {
  data() {
    return {
      text: '',
    }
  },
  methods: {
    send() {
      this.$socket.emit(
        'createMessage',
        {
          text: this.text,
          id: this.$store.state.user.id,
        },
        (data) => {
          if (typeof data === 'string') {
            console.error(data)
          } else {
            this.text = ''
          }
        }
      )
    },
  },
}
</script>

<style scoped>
.text-field {
  padding-bottom: 2rem;
}
</style>

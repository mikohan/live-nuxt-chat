<template>
  <div class="c-wrap">
    <div ref="block" class="c-chat">
      <Message
        v-for="(m, i) in messages"
        :key="i"
        :name="m.name"
        :text="m.text"
        :owner="m.id === user.id"
      />
    </div>
    <div class="c-form">
      <ChatForm />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Message from '@/components/Message'
import ChatForm from '@/components/ChatForm'

export default {
  components: {
    Message,
    ChatForm
  },
  middleware: ['chat'],
  computed: {
    ...mapState(['user', 'messages'])
  },
  watch: {
    messages() {
      setTimeout(() => {
        this.$refs.block.scrollTop = this.$refs.block.scrollHeight
      }, 0)
    }
  },
  head() {
    return {
      title: `Room # ${this.user.room}`
    }
  }
}
</script>

<style lang="scss" scoped>
.c-wrap {
  height: 100%;
  position: relative;
  overflow: hidden;
}
.c-form {
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  padding: 1rem;
  height: 100px;
  background: #212121;
}
.c-chat {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 80px;
  padding: 1rem;
  overflow-y: auto;
}
</style>

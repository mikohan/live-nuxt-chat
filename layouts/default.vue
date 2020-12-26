<template>
  <!-- App.vue -->
  <v-app app>
    <v-navigation-drawer v-model="drawer" app mobile-break-point="650px">
      <v-list subheader>
        <v-subheader>People inside Room</v-subheader>

        <v-list-item v-for="u in users" :key="u.id" @click.prevent>
          <!-- <v-list-item-avatar>
            <v-img :src="item.avatar"></v-img>
          </v-list-item-avatar> -->

          <v-list-item-content>
            <v-list-item-title v-text="u.name"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-icon>
            <v-icon :color="u.id === user.id ? 'deep-purple accent-4' : 'grey'"
              >mdi-message-outline</v-icon
            >
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-btn icon @click="exit">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>Welcome to our Chat {{ user.room }}</v-toolbar-title>
    </v-app-bar>
    <!-- Sizes your content based upon application components -->
    <v-content>
      <div style="height: 100%">
        <nuxt />
      </div>
    </v-content>
  </v-app>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data: () => ({
    drawer: true
  }),
  computed: {
    ...mapState(['user', 'users'])
  },
  methods: {
    ...mapMutations(['clearUser']),
    exit() {
      this.$socket.emit('userLeft', this.user.id, () => {
        this.$router.push('/?message=leftChat')
        this.clearUser()
      })
    }
  }
}
</script>

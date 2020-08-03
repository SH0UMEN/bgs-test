<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          @click="item.click"
          router
          exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"/>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      fixed
      app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-row class="justify-center">
          <v-col cols="3">
            <v-card width="100%">
              <v-img :src="user.photo"></v-img>
              <v-card-title>{{ user.name }}</v-card-title>
              <v-card-text>{{ user.email }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>
  export default {
    name: "User",
    middleware: 'isNotAuth',
    data() {
      return {
        drawer: false,
        items: [
          {
            icon: 'mdi-exit-to-app',
            title: 'Выход',
            click: () => {
              this.$store.dispatch("logout").then(() => {
                this.$router.push("/");
              })
            }
          }
        ],
      }
    },
    asyncData(context) {
      return context.store.dispatch("fetchUser").then((user) => {
        return { user: user }
      })
    }
  }
</script>

<style scoped>

</style>

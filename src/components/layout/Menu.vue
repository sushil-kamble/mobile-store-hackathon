<template>
  <div class="text-center">
    <v-menu top :close-on-click="closeOnClick">
      <template v-slot:activator="{ on, attrs }">
        <v-btn tile text v-bind="attrs" v-on="on" class="white--text">
          <v-icon left> mdi-account </v-icon>
          {{ user.displayName }}
        </v-btn>
      </template>

      <v-list>
        <v-list-item :to="{ name: 'Profile' }">
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item>

        <v-list-item link class="error--text">
          <v-list-item-title @click="logout">Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { auth } from "@/firebase/init"

export default {
  name: "Menu",
  props: ["user"],
  data: () => ({
    closeOnClick: true
  }),
  methods: {
    logout() {
      auth.signOut().then(() => {
        this.$router.replace({ name: "Home" })
        this.$store.commit("emptyCart")
      })
    }
  }
}
</script>

<style scoped></style>

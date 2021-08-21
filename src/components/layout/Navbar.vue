<template>
  <v-app-bar color="secondary" dense dark app height="60">
    <v-toolbar-title>
      <v-btn plain tile text :to="{ name: 'Home' }">Mobile Gallery</v-btn>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <div v-if="user" class="d-flex align-center">
      <router-link :to="{ name: 'Cart' }">
        <v-badge
          :content="totalQuantity"
          :value="totalQuantity"
          color="green"
          overlap
        >
          <v-icon> mdi-cart </v-icon>
        </v-badge>
      </router-link>

      <Menu :user="user" class="ml-6" />
    </div>
    <div v-else>
      <v-btn small :to="{ name: 'Auth' }">Login</v-btn>
    </div>
  </v-app-bar>
</template>

<script>
import { mapGetters } from "vuex"
import Menu from "@/components/layout/Menu"
export default {
  name: "Navbar",
  components: { Menu },
  data() {
    return {
      messages: 0,
      show: true
    }
  },
  computed: {
    ...mapGetters({
      user: "user",
      cart: "cart"
    }),
    totalQuantity() {
      return this.cart.length > 0
        ? this.cart
            .map((item) => item.count)
            .reduce((prev, next) => prev + next)
        : 0
    }
  }
}
</script>

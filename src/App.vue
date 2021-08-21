<template>
  <v-app>
    <Navbar />
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container>
        <!-- If using vue-router -->
        <router-view></router-view>
        <Snackbars />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/layout/Navbar"
import Snackbars from "@/components/layout/Snackbars"
export default {
  name: "App",
  components: {
    Snackbars,
    Navbar
  }
}
</script>

<style scoped>
#app {
  background-color: lightgray;
}
</style>

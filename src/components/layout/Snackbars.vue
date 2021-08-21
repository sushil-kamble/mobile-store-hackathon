<template>
  <div class="text-center ma-2">
    <v-snackbar v-model="snackbar">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "Snackbars",
  data() {
    return {
      snackbar: false,
      text: ""
    }
  },
  computed: {
    ...mapGetters({
      cart: "cart"
    })
  },
  watch: {
    cart() {
      this.text = "Action Completed"
      this.handlerMethod()
    }
  },
  methods: {
    handlerMethod() {
      this.snackbar = true
      setTimeout(function () {
        this.snackbar = false
      }, 2000)
    }
  }
}
</script>

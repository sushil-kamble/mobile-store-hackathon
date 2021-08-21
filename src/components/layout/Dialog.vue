<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          :color="color"
          dark
          v-bind="attrs"
          v-on="on"
          :small="small === 'true'"
        >
          <v-icon left v-if="title === 'Add to Cart'"> mdi-cart </v-icon>
          <v-icon left v-if="title === 'Checkout'"> mdi-cash </v-icon>
          {{ title }}
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          {{ title }}
        </v-card-title>

        <v-card-text class="text-h6">
          {{ details }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="primary" text @click="doAction"> Yes </v-btn>
          <v-btn color="error" text @click="dialog = false"> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "Dialog",
  props: ["title", "color", "details", "small"],
  data() {
    return {
      dialog: false,
      snackbar: false
    }
  },
  methods: {
    doAction() {
      if (this.title === "Add to Cart") this.$emit("add-to-cart")
      else if (this.title === "Checkout") this.$emit("complete-purchase")
      else if (this.title === "Return 1") this.$emit("return-one")
      else if (this.title === "Return All") this.$emit("return-all")
      this.dialog = false
    }
  }
}
</script>

<style scoped></style>

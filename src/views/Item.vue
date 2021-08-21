<template>
  <div>
    <v-row v-if="filterPhone">
      <v-col cols="12" sm="4">
        <v-card>
          <v-img
            class="white--text align-end"
            height="400"
            :src="`/phones/${filterPhone.img}`"
            gradient="45deg, rgba(41,41,41,0.95) 0%, rgba(61,61,61,0.1) 100%"
            contain
          >
            <v-card-title>{{ filterPhone.name }}</v-card-title>
          </v-img>
        </v-card>
      </v-col>
      <v-col cols="12" sm="8">
        <v-card class="pa-2">
          <v-card-title>{{ filterPhone.name }}</v-card-title>
          <v-card-subtitle>{{ filterPhone.description }}</v-card-subtitle>
          <div class="px-4">
            <h1>₹ {{ filterPhone.price }}</h1>
            <h3 class="mt-2 my-1 grey--text text--darken-1">Specifications</h3>
            <v-divider></v-divider>
            <ul class="mt-2">
              <li><span>Processor: </span>{{ filterPhone.processor }}</li>
              <li><span>Main Camera: </span>{{ filterPhone.mainCam }}</li>
              <li><span>Front Camera: </span>{{ filterPhone.frontCam }}</li>
              <li><span>Size: </span>{{ filterPhone.size }}</li>
              <li><span>Battery: </span>{{ filterPhone.battery }}</li>
              <li><span>Network: </span>{{ filterPhone.network }}</li>
              <li><span>OS: </span>{{ filterPhone.os }}</li>
            </ul>
          </div>
          <v-card-actions class="mt-2">
            <div class="error--text" v-show="filterPhone.stock === 0">
              <h4>Out of Stock</h4>
              <div
                v-show="
                  filterPhone.when !== 'none' && filterPhone.who !== 'none'
                "
              >
                <h5>
                  Time it was booked out:
                  {{ filterPhone.when }}
                </h5>
                <h5>By User with user Id: {{ filterPhone.who }}</h5>
              </div>
            </div>
            <v-spacer></v-spacer>
            <Dialog
              title="Add to Cart"
              color="success"
              :details="`Do you want to add ${filterPhone.name} to your cart?`"
              @add-to-cart="addToCart"
              v-if="user && filterPhone.stock !== 0"
            />
            <v-btn v-else-if="filterPhone.stock === 0" disabled>
              Out of Stock
            </v-btn>
            <v-btn v-else :to="{ name: 'Auth' }" color="secondary">
              Login, To Buy
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import Dialog from "@/components/layout/Dialog"

export default {
  name: "Item",
  components: { Dialog },
  data() {
    return {
      snackbar: false
    }
  },
  computed: {
    ...mapGetters({
      user: "user",
      phones: "phones",
      cart: "cart"
    }),
    filterPhone() {
      if (this.phones) {
        const p = parseInt(this.$route.params.id)
        const filter = this.phones.filter((phone) => phone.id === p)
        return filter.length > 0 ? filter[0] : []
      }
      return []
    }
  },
  methods: {
    addToCart() {
      this.$store.commit("addItem", this.filterPhone.id)
    }
  }
}
</script>

<style scoped></style>

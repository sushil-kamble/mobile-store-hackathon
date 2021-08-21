<template>
  <div>
    <v-row v-if="filterPhones" no-gutters>
      <v-col
        cols="12"
        v-for="phone in filterPhones"
        :key="phone.id"
        class="mb-2"
      >
        <v-card class="pa-3">
          <div class="d-flex justify-space-between align-center">
            <div>
              <h3>
                <router-link
                  :to="{ name: 'Item', params: { id: phone.id } }"
                  class="text-decoration-none text--primary"
                >
                  {{ phone.name }}
                </router-link>
                <span
                  class="error--text"
                  v-if="getQuantityById(phone.id) > phone.stock"
                  >(Out of stock)
                </span>
              </h3>
              <div class="text--secondary mt-1 font-weight-bold">
                <v-chip
                  label
                  class="mr-4"
                  :color="
                    getQuantityById(phone.id) <= phone.stock
                      ? 'success'
                      : 'error'
                  "
                >
                  Quantity : {{ getQuantityById(phone.id) }}
                </v-chip>
                <v-btn x-small fab color="primary">
                  <v-icon dark @click="increaseCount(phone.id)">
                    mdi-plus
                  </v-icon>
                </v-btn>
                <v-btn
                  x-small
                  fab
                  color="secondary"
                  class="ml-2"
                  @click="decreaseCount(phone.id)"
                >
                  <v-icon dark> mdi-minus </v-icon>
                </v-btn>
                <v-btn
                  x-small
                  fab
                  color="error"
                  class="ml-2"
                  @click="removeItem(phone.id)"
                >
                  <v-icon dark> mdi-delete </v-icon>
                </v-btn>
              </div>
            </div>
            <div class="text-right">
              <h3>₹ {{ phone.price }}</h3>
              <h3 class="text--secondary">
                ₹ {{ phone.price * getQuantityById(phone.id) }}
              </h3>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col v-if="cart.length > 0">
        <v-card class="pa-3 d-flex justify-space-between align-center">
          <h2>₹ {{ getTotal }}</h2>
          <Dialog
            title="Checkout"
            color="success"
            :details="`Total purchase is worth ₹ ${getTotal}, Click on Yes to complete the purchase`"
            @complete-purchase="completePurchase"
            v-if="validateCart"
          />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { db } from "@/firebase/init"
import Dialog from "@/components/layout/Dialog"

export default {
  name: "Cart",
  components: { Dialog },
  computed: {
    ...mapGetters({
      user: "user",
      cart: "cart",
      phones: "phones",
      purchase: "purchase"
    }),
    filterPhones() {
      if (this.phones && this.cart) {
        const ids = this.cart.map((item) => item.id)
        return this.phones.filter((phone) => ids.includes(phone.id))
      }
      return []
    },
    getTotal() {
      if (this.phones && this.cart) {
        let sum = 0
        this.cart.forEach((element) => {
          const price = this.phones.find(
            (phone) => phone.id === element.id
          ).price
          sum += price * element.count
        })
        return sum
      }
      return 0
    },
    toObjectCart() {
      let result = {}
      if (this.cart) {
        for (const item of this.cart) {
          result[item.id] = item.count
        }
      }
      return result
    },
    validateCart() {
      return this.cart && this.filterPhones
        ? this.cart.every((item) => item.count <= this.getStockById(item.id))
        : false
    }
  },

  methods: {
    increaseCount(id) {
      const count = this.getQuantityById(id)
      this.$store.commit("incrementItem", { id, count })
    },
    decreaseCount(id) {
      const count = this.getQuantityById(id)
      if (count > 1) {
        this.$store.commit("decrementItem", { id, count })
      }
    },
    removeItem(id) {
      this.$store.commit("removeItem", { id })
    },
    getQuantityById(id) {
      return this.cart.find((x) => x.id === id).count
    },
    getStockById(id) {
      return this.filterPhones.find((phone) => phone.id === id)["stock"]
    },
    completePurchase() {
      if (this.cart.length > 0 && this.validateCart) {
        const updates = {}
        for (const item in this.toObjectCart) {
          updates[`/phones/${item}/stock`] =
            this.getStockById(parseInt(item)) - this.toObjectCart[item]
        }
        updates["/users/" + this.user.id + "/purchase"] = this.toObject(
          this.purchase
        )
        db.ref()
          .update(updates)
          .then(() => {
            this.$store.commit("emptyCart")
          })
      }
    },
    toObject(oldObj = {}) {
      let result = Object.assign({}, this.toObjectCart)
      for (const property in oldObj) {
        if (property in result) {
          result[property] += oldObj[property]
        } else {
          result[property] = oldObj[property]
        }
      }
      return result
    }
  }
}
</script>

<template>
  <div class="pa-2">
    <h1 class="my-1">My Purchase</h1>
    <v-row v-if="filterPhones.length > 0" no-gutters>
      <v-col v-for="item in filterPhones" :key="item.id" cols="12" class="mb-2">
        <v-card class="pa-3 d-flex justify-space-between align-center">
          <div>
            <h4>
              <router-link
                :to="{ name: 'Item', params: { id: item.id } }"
                class="text-decoration-none text--primary"
                >{{ item.name }}
              </router-link>
            </h4>
            <h5 class="text--secondary">
              Quantity: {{ getQuantityById(item.id) }}
            </h5>
          </div>
          <div class="d-flex">
            <Dialog
              title="Return 1"
              class="mr-3"
              small="true"
              color="primary"
              :details="`Are you sure you want to, Return 1 ${item.name}.`"
              @return-one="returnOne(item.id)"
            />
            <Dialog
              title="Return All"
              small="true"
              color="error"
              :details="`Are you sure you want to, Return all
              (${getQuantityById(item.id)}) items of ${item.name}.`"
              @return-all="returnAll(item.id)"
            />
          </div>
        </v-card>
      </v-col>
    </v-row>
    <div v-else><h2>No Purchases</h2></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import Dialog from "@/components/layout/Dialog"
import { db } from "@/firebase/init"
export default {
  name: "Profile",
  components: { Dialog },
  computed: {
    ...mapGetters({
      user: "user",
      purchase: "purchase",
      phones: "phones"
    }),
    filterPhones() {
      if (this.phones && this.purchase) {
        const keys = Object.keys(this.purchase)
        return this.phones.filter((phone) => keys.includes(phone.id.toString()))
      }
      return []
    }
  },
  methods: {
    getQuantityById(id) {
      return this.purchase[id]
    },
    getStockById(id) {
      return this.filterPhones.find((phone) => phone.id === id)["stock"]
    },
    returnOne(id) {
      const quantity = this.getQuantityById(id)
      const stock = this.getStockById(id)
      if (quantity > 1) {
        const updates = {}
        updates["/users/" + this.user.id + "/purchase/" + id] = quantity - 1
        updates["/phones/" + id + "/stock"] = stock + 1
        db.ref().update(updates)
      }
    },
    returnAll(id) {
      const quantity = this.getQuantityById(id)
      const stock = this.getStockById(id)
      if (quantity > 0) {
        const updates = {}
        updates["/users/" + this.user.id + "/purchase/" + id] = null
        updates["/phones/" + id + "/stock"] = stock + quantity
        db.ref().update(updates)
      }
    }
  }
}
</script>

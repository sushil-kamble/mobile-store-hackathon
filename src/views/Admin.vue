<template>
  <div class="pa-2">
    <h1 class="my-1">Admin Panel</h1>
    <v-row>
      <v-col cols="6">
        <v-card class="pa-2">
          <v-card-title>Users</v-card-title>
          <v-row v-if="allUser.length > 0" no-gutters>
            <v-col
              v-for="item in allUser"
              :key="item.id"
              cols="12"
              class="mb-2"
            >
              <div class="px-4">
                <router-link
                  :to="{
                    name: 'User',
                    params: {
                      id: item.id,
                      data: item.purchase,
                      name: item.name
                    }
                  }"
                  class="text-decoration-none text--primary"
                  >{{ item.name }}
                </router-link>
              </div>
            </v-col>
          </v-row>
          <div v-else class="pa-3"><h4>No User</h4></div>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card class="pa-3">
          <v-card-title>Phones</v-card-title>
          <v-row v-if="phones" no-gutters>
            <v-col
              v-for="phone in phones"
              :key="phone.id"
              cols="12"
              class="mb-1"
            >
              <v-card class="pa-2 d-flex justify-space-between align-center">
                <h4>
                  <router-link
                    :to="{ name: 'Item', params: { id: phone.id } }"
                    class="text-decoration-none text--primary"
                  >
                    {{ phone.name }}
                  </router-link>
                </h4>
                <div class="d-flex text-right align-center">
                  <v-btn icon fab small @click="increaseStock(phone.id)">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    fab
                    small
                    class="mx-2"
                    @click="decreaseStock(phone.id)"
                  >
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                  <v-chip class="pa-2 primary white--text">
                    {{ phone.stock }}
                  </v-chip>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { auth, db } from "@/firebase/init"
import { mapGetters } from "vuex"

export default {
  name: "Admin",
  data() {
    return {
      allUser: []
    }
  },
  beforeRouteEnter(to, from, next) {
    const uid = auth.currentUser?.uid
    if (uid === "BUXVrQPSbGP9GQIKChMrfXUOK2k1") {
      next()
    } else {
      next({ name: "Home" })
    }
  },
  mounted() {
    const users = []
    db.ref("/users")
      .once("value")
      .then((snap) => {
        snap.forEach((data) => {
          users.push(data.val())
        })
      })
    this.allUser = users
  },
  computed: {
    ...mapGetters({
      phones: "phones"
    })
  },
  methods: {
    getStockById(id) {
      return this.phones.find((phone) => phone.id === id)["stock"]
    },
    increaseStock(id) {
      const stock = this.getStockById(id)
      const updates = {}
      updates["/phones/" + id + "/stock"] = stock + 1
      if (stock === 0) {
        updates[`/phones/${id}/who`] = "none"
        updates[`/phones/${id}/when`] = "none"
      }
      db.ref()
        .update(updates)
        .then(() => {
          //
        })
    },
    decreaseStock(id) {
      const stock = this.getStockById(id)
      if (stock > 0) {
        const updates = {}
        updates["/phones/" + id + "/stock"] = stock - 1
        if (stock === 1) {
          updates[`/phones/${id}/who`] = auth.currentUser.uid
          updates[`/phones/${id}/when`] = Date().toLocaleString()
        }
        db.ref()
          .update(updates)
          .then(() => {
            //
          })
      }
    }
  }
}
</script>

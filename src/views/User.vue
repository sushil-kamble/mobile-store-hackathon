<template>
  <div>
    <h1 class="pb-2">{{ $route.params.name }}</h1>
    <v-row v-if="filterPhones.length > 0" no-gutters>
      <v-col
        v-for="phone in filterPhones"
        :key="phone.id"
        cols="12"
        class="mb-1"
      >
        <v-card class="pa-3 d-flex justify-space-between align-center">
          <h4>
            {{ phone.name }}
          </h4>
          <h4>{{ $route.params.data[phone.id] }}</h4>
        </v-card>
      </v-col>
    </v-row>
    <div v-else class="pa-2">
      <h3>No orders yet</h3>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { auth } from "@/firebase/init"

export default {
  name: "User",
  beforeRouteEnter(to, from, next) {
    const uid = auth.currentUser?.uid
    if (uid === "BUXVrQPSbGP9GQIKChMrfXUOK2k1") {
      next()
    } else {
      next({ name: "Home" })
    }
  },
  computed: {
    ...mapGetters({
      phones: "phones"
    }),
    filterPhones() {
      if (this.phones && this.$route.params.data) {
        const keys = Object.keys(this.$route.params.data)
        return this.phones.filter((phone) => keys.includes(phone.id.toString()))
      }
      return []
    }
  }
}
</script>

<style scoped></style>

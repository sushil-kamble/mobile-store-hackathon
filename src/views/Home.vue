<template>
  <div class="home">
    <v-card :to="{ name: 'Item', params: { id: 1 } }" class="grow">
      <v-img
        class="white--text align-end"
        height="200"
        src="phones/iphonex.png"
        gradient="45deg, rgba(41,41,41,0.95) 0%, rgba(61,61,61,0.1) 100%"
      >
        <v-card-title class="text-h2">iPhone X</v-card-title>
      </v-img>
    </v-card>
    <div class="mt-5">
      <v-row v-if="filterPhones">
        <v-col v-for="phone in filterPhones" :key="phone.id" cols="12" sm="4">
          <v-card
            height="300"
            :to="{ name: 'Item', params: { id: phone.id } }"
            class="grow"
          >
            <v-img
              class="white--text align-end"
              :src="`/phones/${phone.img}`"
              gradient="45deg, rgba(41,41,41,0.95) 0%, rgba(61,61,61,0.1) 100%"
              height="300"
              contain
            >
              <div class="pa-2 d-flex justify-space-between align-center">
                <h2>{{ phone.name }}</h2>
                <div>
                  <v-chip
                    class="ma-2"
                    :color="checkAvailability(phone.stock)[1]"
                  >
                    {{ checkAvailability(phone.stock)[0] }}
                  </v-chip>
                </div>
              </div>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "Home",
  computed: {
    ...mapGetters({
      user: "user",
      phones: "phones"
    }),
    filterPhones() {
      return this.phones ? this.phones.filter((phone) => phone.id !== 1) : []
    }
  },
  methods: {
    checkAvailability(stock) {
      if (stock > 2) return ["Available", "success"]
      else if (stock === 2) return ["2 Left", "warning"]
      else if (stock === 1) return ["1 Left", "warning"]
      else return ["Out of Stock", "error"]
    }
  }
}
</script>
<style scoped>
.grow {
  transition: all 0.2s ease-in-out;
}
.grow:hover {
  transform: scale(1.03);
}
</style>

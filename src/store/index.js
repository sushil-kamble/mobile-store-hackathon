import { vuexfireMutations, firebaseAction } from "vuexfire"
import { db } from "@/firebase/init"
import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    user: null,
    phones: [],
    cart: [],
    purchase: null
  },
  getters: {
    user(state) {
      return state.user
    },
    phones(state) {
      return state.phones
    },
    cart(state) {
      return state.cart
    },
    purchase(state) {
      return state.purchase
    }
  },
  mutations: {
    SET_USER(state, data) {
      state.user = data
    },
    addItem(state, key) {
      const get = state.cart.filter((item) => item.id === key)
      if (get.length > 0) {
        const count = get[0].count
        state.cart.find((v) => v.id === get[0].id).count = count + 1
      } else {
        state.cart.push({ id: key, count: 1 })
      }
    },
    incrementItem(state, { id, count }) {
      state.cart.find((v) => v.id === id).count = count + 1
    },
    decrementItem(state, { id, count }) {
      state.cart.find((v) => v.id === id).count = count - 1
    },
    removeItem(state, { id }) {
      state.cart = state.cart.filter((item) => item.id !== id)
    },
    emptyCart(state) {
      state.cart = []
    },
    ...vuexfireMutations
  },
  actions: {
    fetchUser({ commit, dispatch }, user) {
      if (user) {
        commit("SET_USER", {
          id: user.uid,
          displayName: user.displayName,
          email: user.email
        })
      } else {
        commit("SET_USER", null)
      }
      return Promise.all([
        dispatch("bindPhoneRef"),
        dispatch("bindPurchaseRef")
      ])
    },
    bindPhoneRef: firebaseAction(({ bindFirebaseRef }) => {
      return bindFirebaseRef("phones", db.ref("/phones"))
    }),
    bindPurchaseRef: firebaseAction(({ bindFirebaseRef, state }) => {
      if (state.user) {
        return bindFirebaseRef(
          "purchase",
          db.ref("/users/" + state.user.id + "/purchase/")
        )
      }
      return null
    })
  }
})

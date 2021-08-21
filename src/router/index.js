import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import { auth } from "@/firebase/init.js"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/auth",
    name: "Auth",
    component: () => import(/* webpackChunkName: "auth" */ "../views/Auth.vue")
  },
  // PROTECTED PATH
  // For Protected Path include meta property as shown below.
  {
    path: "/profile",
    name: "Profile",
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Profile.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/item/:id",
    name: "Item",
    component: () => import(/* webpackChunkName: "item" */ "../views/Item.vue")
  },
  {
    path: "/user/:id",
    name: "User",
    component: () => import(/* webpackChunkName: "user" */ "../views/User.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import(/* webpackChunkName: "cart" */ "../views/Cart.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/admin",
    name: "Admin",
    component: () =>
      import(/* webpackChunkName: "admin" */ "../views/Admin.vue"),
    meta: {
      requiresAuth: true
    }
  }
  // PROTECTED PATH
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth)

  if (requiresAuth && !auth.currentUser) {
    next({ name: "Auth" })
  } else {
    next()
  }
})

export default router

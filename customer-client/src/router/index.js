import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Product from "../views/Product.vue";
import MyCart from "../views/MyCart.vue";
import Transactions from "../views/Transactions.vue";
import Register from "../views/Register.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/product",
    name: "Product",
    component: Product,
  },
  {
    path: "/myCart",
    name: "MyCart",
    component: MyCart,
  },
  {
    path: "/transactions",
    name: "Transactions",
    component: Transactions,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (
    (to.name === "Transactions" || to.name === "MyCart") &&
    !localStorage.access_token
  )
    next("/login");
  else if (
    (to.name === "Login" || to.name === "Register") &&
    localStorage.access_token
  )
    next("/");
  else next();
});

export default router;

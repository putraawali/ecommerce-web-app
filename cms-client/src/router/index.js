import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import AddProduct from "../views/AddProduct.vue";
import Product from "../views/Product.vue";
import EditProduct from "../views/EditProduct.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/add-product",
    name: "AddProduct",
    component: AddProduct,
  },
  {
    path: "/product",
    name: "Product",
    component: Product,
  },
  {
    path: "/edit/:id",
    name: "EditProduct",
    component: EditProduct,
  },
];
const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name != "Login" && !localStorage.access_token) {
    next({ name: "Login" });
  } else if (to.name === "Login" && localStorage.access_token) {
    next({ name: "Home" });
  } else {
    next();
  }
});

export default router;

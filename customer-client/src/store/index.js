import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import Swal from "sweetalert2";
const server = "https://ecommerce-server-putra.herokuapp.com/";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    categories: [
      {
        name: "Guitar",
        image:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcf.shopee.co.id%2Ffile%2F3df16c46b6f108e45b8c5e1d2c05a1c0&f=1&nofb=1",
      },
      {
        name: "Bass",
        image:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthumbs.dreamstime.com%2Fz%2Fvector-series-electric-bass-9850320.jpg&f=1&nofb=1",
      },
      {
        name: "Drums",
        image:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthumbs.dreamstime.com%2Fz%2Fbass-drum-vector-illustration-38165999.jpg&f=1&nofb=1",
      },
      {
        name: "Recording",
        image:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthumbs.dreamstime.com%2Fz%2Fisolated-record-note-rock-used-part-musical-white-92858575.jpg&f=1&nofb=1",
      },
      {
        name: "Keyboard",
        image:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthumbs.dreamstime.com%2Fz%2Fman-playing-piano-african-american-musician-background-concert-hall-vector-flat-design-illustration-vertical-layout-67021719.jpg&f=1&nofb=1",
      },
      {
        name: "Accessories",
        image:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.cdn1.stockunlimited.net%2Fpreview1300%2Fvintage-microphone_1979771.jpg&f=1&nofb=1",
      },
    ],
    fetchCard: [],
    isLogin: false,
    getCart: [],
    getTransactions: [],
  },
  mutations: {
    fetchCard(state, payload) {
      state.fetchCard = payload;
    },
    isLogin(state, status) {
      state.isLogin = status;
    },
    getCart(state, cart) {
      state.getCart = cart;
    },
    getTransactions(state, data) {
      state.getTransactions = data;
    },
    checkLogin(state, status) {
      state.isLogin = status;
    },
  },
  actions: {
    register(context, data) {
      fetch(server + "register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) return response.json();
          else throw response;
        })
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Register success",
            timer: 3000,
          });
          router.push("/login");
        })
        .catch((err) => {
          err.json().then((body) => {
            if (typeof body.message === "object") {
              body.message = body.message.join(",  ");
            }
            Swal.fire({
              icon: "error",
              title: "Register failed",
              text: body.message,
            });
          });
        });
    },
    checkLogin(context) {
      if (localStorage.access_token) {
        context.commit("checkLogin", true);
      } else {
        context.commit("checkLogin", false);
      }
    },
    fetchCard(context, category) {
      fetch(server + `products/${category}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          context.commit("fetchCard", data);
        })
        .catch((err) => console.log(err));
    },
    login(context, data) {
      fetch(server + "login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.access_token) {
            context.commit("isLogin", true);
            localStorage.setItem("access_token", data.access_token);
            Swal.fire({
              icon: "success",
              title: `Login success \n Halo ${data.username}`,
              timer: 1500,
            });
            router.push("/");
          } else {
            throw data;
          }
        })
        .catch((err) => {
          if (typeof err.message === "object") {
            err.message = err.message.join(",  ");
          }
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.message,
            timer: 2000,
          });
        });
    },
    addToCart(context, cartData) {
      fetch(server + "carts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
        body: JSON.stringify(cartData),
      })
        .then((response) => {
          if (!response.ok) throw response;
          else return response.json();
        })
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Product added to cart",
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: "Go to My Cart",
          }).then((response) => {
            if (response.isConfirmed) router.push("/myCart");
          });
        })
        .catch((err) => {
          err.json().then((body) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: body.message,
            });
          });
        });
    },
    getCart(context) {
      fetch(server + "carts", {
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
      })
        .then((response) => {
          if (response.ok) return response.json();
          else throw response;
        })
        .then((data) => context.commit("getCart", data))
        .catch((err) => {
          err.json().then((body) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: body.message,
            });
          });
        });
    },
    deleteCart(context, id) {
      fetch(server + `carts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
      })
        .then((response) => {
          if (response.ok) return response.json();
          else throw response;
        })
        .then((success) => {
          Swal.fire({
            icon: "success",
            title: success.message,
          });
          context.dispatch("getCart");
        })
        .catch((err) => {
          err.json().then((body) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: body.message,
            });
          });
        });
    },
    editQuantity(context, { qty, id }) {
      fetch(server + `carts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
        body: JSON.stringify(qty),
      })
        .then((response) => {
          if (response.ok) return response.json();
          else throw response;
        })
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Cart edited!",
          });
          context.dispatch("getCart");
        })
        .catch((err) => {
          err.json().then((body) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: body.message,
            });
          });
        });
    },
    checkout(context, data) {
      fetch(server + "transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) return response.json();
          else throw response;
        })
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Transaction success",
          });
          context.dispatch("getCart");
          router.push("/transactions");
        })
        .catch((err) => {
          err.json().then((body) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: body.message,
            });
          });
        });
    },
    getTransactions(context) {
      fetch(server + "transactions", {
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
      })
        .then((response) => {
          if (response.ok) return response.json();
          else throw response;
        })
        .then((data) => {
          context.commit("getTransactions", data);
        })
        .catch((err) => {
          err.json().then((body) =>
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: body.message,
            })
          );
        });
    },
  },
  modules: {},
});

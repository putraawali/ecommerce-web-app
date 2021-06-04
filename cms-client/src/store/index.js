import Vue from "vue";
import Vuex from "vuex";
import Swal from "sweetalert2";
import router from "../router";
Vue.use(Vuex);
const server = "https://ecommerce-server-putra.herokuapp.com/";
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
    getById: {},
  },
  mutations: {
    fetchCard(state, payload) {
      state.fetchCard = payload;
    },
    getDataById(state, data) {
      state.getById = data;
    },
  },
  actions: {
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
    fetchCard(context, category) {
      fetch(server + `products/${category}`, {
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          context.commit("fetchCard", data);
        })
        .catch((err) => console.log(err));
    },
    postProduct(context, product) {
      fetch(server + "products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
        body: JSON.stringify(product),
      })
        .then((response) => {
          if (!response.ok) {
            throw response;
          } else {
            return response.json();
          }
        })
        .then((data) => {
          Swal.fire({
            title: "Success!",
            text: "Product added successfully!",
            imageUrl: data.image_url,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Posted image",
            timer: 2500,
          });
          router.push("/");
        })
        .catch((err) => {
          err.json().then((body) => {
            if (typeof body.message === "object") {
              body.message = body.message.join(", ");
            }
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: body.message,
              timer: 3000,
            });
          });
        });
    },
    changeStatus(context, payload) {
      fetch(server + `products/${payload.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
        body: JSON.stringify(payload),
      })
        .then((response) => {
          if (!response.ok) {
            throw response;
          } else {
            return response.json();
          }
        })
        .then((data) => {
          Swal.fire({
            icon: "success",
            title: "Your change has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          context.dispatch("fetchCard", data.category);
        })
        .catch((err) => {
          err.json().then((body) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: body.message,
              timer: 3000,
            });
          });
        });
    },
    deleteProduct(context, data) {
      fetch(server + `products/${data.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw response;
          } else {
            return response.json();
          }
        })
        .then((response) => {
          Swal.fire({
            icon: "success",
            title: response.message,
            showConfirmButton: false,
            timer: 1500,
          });
          context.dispatch("fetchCard", data.category);
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
    showEdit(context, id) {
      fetch(server + `products/get/${id}`, {
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw response;
          } else {
            return response.json();
          }
        })
        .then((data) => {
          context.commit("getDataById", data);
          router.push(`/edit/${data.id}`).catch(() => {});
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
    editProduct(context, payload) {
      fetch(server + `products/${payload.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
        body: JSON.stringify(payload),
      })
        .then((response) => {
          if (!response.ok) {
            throw response;
          } else {
            return response.json();
          }
        })
        .then((data) => {
          router.push(`/product?category=${data.category}`);
          Swal.fire("Saved!", "", "success");
        })
        .catch((err) => {
          err.json().then((body) => console.log(body));
        });
    },
  },
  modules: {},
});

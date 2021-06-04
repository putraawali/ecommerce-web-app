<template>
  <nav
    class="navbar is-danger px-4"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <img
          src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Ficons.iconarchive.com%2Ficons%2Ficonarchive%2Fred-orb-alphabet%2F256%2FLetter-T-icon.png&f=1&nofb=1"
          alt="logo"
        />
      </router-link>

      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <router-link class="navbar-item" to="/"> Home </router-link>
        <router-link class="navbar-item" to="/myCart">My Cart</router-link>
        <router-link class="navbar-item" to="/transactions"
          >Transactions</router-link
        >
      </div>
      <div class="navbar-end">
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link"> Account </a>

          <div class="navbar-dropdown">
            <a
              @click.prevent="changePage('/login')"
              v-show="!checkLogin"
              class="navbar-item"
            >
              Login
            </a>
            <a
              @click.prevent="changePage('/register')"
              v-show="!checkLogin"
              class="navbar-item"
            >
              Register
            </a>
            <a @click.prevent="logout" v-show="checkLogin" class="navbar-item">
              Logout
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import Swal from "sweetalert2";
export default {
  Name: "Navbar",
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({ name: "Home" }).catch(() => {});
      Swal.fire({
        icon: "success",
        title: "Logged out",
        timer: 3000,
      });
      this.$store.dispatch("checkLogin");
    },
    changePage(path) {
      this.$router.push(path);
    },
  },
  computed: {
    checkLogin() {
      return this.$store.state.isLogin;
    },
  },
  created() {
    this.$store.dispatch("checkLogin");
  },
};
</script>

<style></style>

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

        <router-link class="navbar-item" to="/add-product">
          Add Product
        </router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-light" @click.prevent="logout"> Log out </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  Name: "Navbar",
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style></style>

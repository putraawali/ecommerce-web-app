<template>
  <section style="margin: 80px 400px">
    <div class="container">
      <nav class="level">
        <div class="level-item has-text-centered" style="margin-bottom: 50px">
          <div>
            <p class="title">Tikipidii Register Form</p>
          </div>
        </div>
      </nav>
      <form
        class="box"
        style="background-color: #800000"
        @submit.prevent="register"
      >
        <nav class="level">
          <div class="level-item has-text-centered">
            <div>
              <p class="title" style="color: #e5e4e2">Register</p>
            </div>
          </div>
        </nav>
        <div class="field">
          <label class="label" style="color: #e5e4e2">Email</label>
          <div class="control has-icons-left has-icons-right">
            <input
              class="input"
              type="email"
              placeholder="Input Email"
              v-model="email"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
          </div>
        </div>
        <div class="field">
          <label class="label" style="color: #e5e4e2">Username</label>
          <div class="control has-icons-left has-icons-right">
            <input
              class="input"
              type="text"
              placeholder="Input Username"
              v-model="username"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
          </div>
        </div>
        <div class="field">
          <label class="label" style="color: #e5e4e2">Password</label>
          <div class="control has-icons-left has-icons-right">
            <input
              class="input"
              type="password"
              placeholder="Input Password"
              v-model="password"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-unlock"></i>
            </span>
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button class="button is-link">Register</button>
          </div>
          <div class="control">
            <button
              @click.prevent="changePage('/')"
              class="button is-link is-light"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      username: "",
      email: "",
      password: "",
    };
  },
  methods: {
    register() {
      let data = {
        username: this.username,
        email: this.email,
        password: this.password,
      };
      this.$store.dispatch("register", data);
    },
    changePage(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style></style>

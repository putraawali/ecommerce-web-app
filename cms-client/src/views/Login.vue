<template>
  <section style="margin: 80px 400px">
    <div class="container">
      <nav class="level">
        <div class="level-item has-text-centered" style="margin-bottom: 50px">
          <div>
            <p class="title">Tikipidii CMS Client</p>
          </div>
        </div>
      </nav>
      <form
        class="box"
        style="background-color: #800000"
        @submit.prevent="login"
      >
        <nav class="level">
          <div class="level-item has-text-centered">
            <div>
              <p class="title" style="color: #e5e4e2">Login</p>
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
            <button class="button is-link">Submit</button>
          </div>
          <div class="control">
            <button class="button is-link is-light">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      let data = { email: this.email, password: this.password };
      this.$store.dispatch("login", data);
    },
  },
};
</script>

<style></style>

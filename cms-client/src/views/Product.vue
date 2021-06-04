<template>
  <section>
    <Navbar></Navbar>
    <h1><center>Your Products Page</center></h1>
    <div class="mt-6 ml-5">
      <div class="ui grid">
        <Card v-for="card in fetchCard" :key="card.id" :card="card"></Card>
      </div>
    </div>
  </section>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Card from "../components/Card.vue";
export default {
  name: "Product",
  components: {
    Navbar,
    Card,
  },
  computed: {
    fetchCard() {
      return this.$store.state.fetchCard;
    },
  },
  created() {
    this.$store.dispatch("fetchCard", this.$route.query.category);
  },
};
</script>

<style></style>

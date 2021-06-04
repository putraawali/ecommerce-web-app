<template>
  <section>
    <h1 class="ui header mt-5">
      <center>{{ this.$route.query.category }} Product List</center>
    </h1>
    <div class="mt-6 ml-5">
      <div class="ui grid">
        <Card v-for="card in fetchCard" :key="card.id" :card="card"></Card>
      </div>
    </div>
  </section>
</template>

<script>
import Card from "../components/Card.vue";
export default {
  name: "Product",
  components: {
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

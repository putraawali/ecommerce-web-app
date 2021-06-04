<template>
  <div class="ui container mt-6">
    <div class="ui three stackable cards">
      <Categories
        v-for="(category, i) in getCategories"
        :key="i"
        :category="category"
      ></Categories>
    </div>
  </div>
</template>

<script>
import Categories from "./Categories.vue";
export default {
  name: "Category",
  components: {
    Categories,
  },
  computed: {
    getCategories() {
      return this.$store.state.categories;
    },
  },
};
</script>

<style></style>

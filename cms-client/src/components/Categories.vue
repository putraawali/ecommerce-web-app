<template>
  <div class="card" @click.prevent="changePage">
    <div class="card-image">
      <figure class="image is-square">
        <a>
          <img :src="category.image" alt="Placeholder image" />
        </a>
      </figure>
    </div>
    <div class="content">
      <div class="header button">{{ category.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Categories",
  props: ["category"],
  methods: {
    changePage() {
      this.$router.push(`/product?category=${this.category.name}`);
    },
  },
};
</script>

<style></style>

<template>
  <section>
    <Navbar></Navbar>
    <h1><center>Product Category</center></h1>
    <ColumnCategory></ColumnCategory>
  </section>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import ColumnCategory from "../components/ColumnCategory.vue";
export default {
  name: "Home",
  components: {
    Navbar,
    ColumnCategory,
  },
};
</script>

<style></style>

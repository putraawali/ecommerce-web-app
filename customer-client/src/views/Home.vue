<template>
  <section>
    <div class="container">
      <b-carousel>
        <b-carousel-item v-for="(image, i) in images" :key="i">
          <section class="hero">
            <div class="hero-body has-text-centered">
              <img :src="image" />
            </div>
          </section>
        </b-carousel-item>
      </b-carousel>
    </div>
    <ColumnCategory></ColumnCategory>
  </section>
</template>

<script>
import ColumnCategory from "../components/ColumnCategory.vue";
export default {
  name: "Home",
  data() {
    return {
      images: [
        "https://static.gibson.com/gibson-web/home/2021.03/60th-61SG_Web_1110x660.jpg",
        "https://static.gibson.com/gibson-web/home/2021.01/SlashCollection_Homepage.jpg",
        "https://d1z0fpeh8gue3b.cloudfront.net/wysiwyg/Volca_Nubass_Korg_Banner.jpg",
      ],
    };
  },
  components: {
    ColumnCategory,
  },
  created() {
    this.$store.dispatch("fetchCard", this.$store.state.categories);
  },
};
</script>

<style scoped></style>

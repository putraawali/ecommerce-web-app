<template>
  <section>
    <Navbar></Navbar>
    <div class="ui container px-6">
      <h1 class="mt-5"><center>Add product</center></h1>
      <form @submit.prevent="postProduct">
        <div class="field">
          <label class="label">Product Name</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="Product Name"
              v-model="name"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Image Url</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="e.g www.yourimageurl.com"
              v-model="image_url"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Price</label>
          <div class="control">
            <input
              class="input"
              type="number"
              placeholder="e.g 1000000"
              v-model="price"
            />
          </div>
          <p class="help is-success title">Just input number</p>
        </div>
        <div class="field">
          <label class="label">Stock</label>
          <div class="control">
            <input
              class="input"
              type="number"
              placeholder="e.g 10"
              v-model="stock"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Category</label>
          <div class="control">
            <div class="select">
              <select v-model="category">
                <option selected value="">Select category</option>
                <option
                  v-for="(category, i) in getCategories"
                  :key="i"
                  :value="`${category.name}`"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>
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
import Swal from "sweetalert2";
import Navbar from "../components/Navbar.vue";
export default {
  name: "AddProduct",
  data() {
    return {
      name: "",
      image_url: "",
      price: "",
      stock: "",
      category: "",
    };
  },
  components: {
    Navbar,
  },
  methods: {
    postProduct() {
      let product = {
        name: this.name,
        image_url: this.image_url,
        price: +this.price,
        stock: +this.stock,
        category: this.category,
      };
      Swal.fire({
        icon: "question",
        title: "Do you want to add this product?",
        showCancelButton: true,
        confirmButtonText: `Save`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch("postProduct", product);
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    },
  },
  computed: {
    getCategories() {
      return this.$store.state.categories;
    },
  },
};
</script>

<style></style>

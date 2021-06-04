<template>
  <section>
    <Navbar></Navbar>
    <div class="ui container px-6">
      <h1 class="mt-5"><center>Edit product</center></h1>
      <form @submit.prevent="editProduct(getData.id)">
        <div class="field">
          <label class="label">Product Name</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="Product Name"
              v-model="getData.name"
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
              v-model="getData.image_url"
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
              v-model="getData.price"
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
              v-model="getData.stock"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Category</label>
          <div class="control">
            <div class="select">
              <select v-model="getData.category">
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
import Navbar from "../components/Navbar.vue";
import Swal from "sweetalert2";
export default {
  name: "EditProduct",
  components: {
    Navbar,
  },
  methods: {
    editProduct(id) {
      Swal.fire({
        title: "Do you want to delete this product?",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          let data = {
            id: id,
            name: this.getData.name,
            image_url: this.getData.image_url,
            price: this.getData.price,
            stock: this.getData.stock,
            category: this.getData.category,
          };
          this.$store.dispatch("editProduct", data);
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    },
  },
  computed: {
    getData() {
      return this.$store.state.getById;
    },
    getCategories() {
      return this.$store.state.categories;
    },
  },
  created() {
    this.$store.dispatch("showEdit", this.$route.params.id);
  },
};
</script>

<style></style>

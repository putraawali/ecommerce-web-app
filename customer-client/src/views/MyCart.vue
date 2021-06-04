<template>
  <section>
    <div class="ui container">
      <center><h1 class="ui header mt-5 mb-6">My cart</h1></center>
      <div class="ui centered grid">
        <table class="ui very basic collapsing celled table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Category</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <TableCart
            v-for="cart in this.$store.state.getCart"
            :key="cart.id"
            :cart="cart"
          >
          </TableCart>
        </table>
      </div>
    </div>
    <center>
      <section class="section mt-6">
        <h1 class="title">Hurry up!</h1>
        <h2 class="subtitle is-family-code mt-6" style="margin-bottom: -55px">
          Don't forget to <strong>checkout</strong> your cart before the product
          sold
        </h2>
      </section>
    </center>
  </section>
</template>

<script>
import TableCart from "../components/TableCart.vue";
export default {
  name: "MyCart",
  components: {
    TableCart,
  },
  methods: {
    joinRupiah(number) {
      let result = "";
      let numberStr = number.toString();
      let count = 0;
      for (let i = numberStr.length - 1; i >= 0; i--) {
        if (count === 3) {
          result = "." + result;
          count = 0;
        }
        result = numberStr[i] + result;
        count++;
      }
      return result;
    },
  },
  created() {
    this.$store.dispatch("getCart");
  },
};
</script>

<style></style>

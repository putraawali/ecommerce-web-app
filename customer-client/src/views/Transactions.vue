<template>
  <div>
    <section>
      <div class="ui container">
        <center><h1 class="ui header mt-5 mb-6">My Transactions</h1></center>
        <div class="ui centered grid">
          <table class="ui very basic collapsing celled table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Category</th>
                <th>Product Name</th>
                <th>Total Payment</th>
                <th>Quantity</th>
                <th>Date</th>
              </tr>
            </thead>
            <TableTransaction
              v-for="transaction in getTransactions"
              :key="transaction.id"
              :transaction="transaction"
            ></TableTransaction>
          </table>
        </div>
      </div>
      <center>
        <section class="section mt-6">
          <h1 class="title">Thank you</h1>
          <h2 class="subtitle is-family-code mt-6" style="margin-bottom: -55px">
            Thanks you for trusting us as your favourite shopping platform
          </h2>
        </section>
      </center>
    </section>
  </div>
</template>

<script>
import TableTransaction from "../components/TableTransaction.vue";
import { mapState } from "vuex";
export default {
  name: "Transactions",
  components: {
    TableTransaction,
  },
  computed: mapState(["getTransactions"]),
  created() {
    this.$store.dispatch("getTransactions");
  },
};
</script>

<style></style>

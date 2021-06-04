<template>
  <section>
    <div class="ui horizontal card my-5 mx-1">
      <div class="image is-3by2">
        <img width="100" height="100" :src="card.image_url" />
      </div>
      <div class="content">
        <span class="right floated">
          {{ getStatus() }}
        </span>
        <div class="title">{{ card.name }}</div>
        <div class="header">Rp {{ joinRupiah(card.price) }}</div>
        <div class="meta">
          <span class="category">{{ card.category }}</span>
        </div>
        <div class="description">
          <p>{{ card.name }} kualitas bintang lima harga kaki seribu</p>
          <p class="headers">Stock: {{ card.stock }}</p>
        </div>
      </div>
      <div class="extra content">
        <span class="floated">
          <div class="ui buttons">
            <button class="ui blue button" @click.prevent="addToCart(card.id)">
              <i class="fas fa-shopping-cart pr-2"></i>
              Add to Cart
            </button>
            <div class="or"></div>
            <button class="ui green button" @click.prevent="checkout(card.id)">
              <i class="fas fa-shopping-bag pr-2"></i>
              Buy now
            </button>
          </div>
        </span>
      </div>
    </div>
  </section>
</template>

<script>
import Swal from "sweetalert2";
export default {
  name: "Card",
  props: ["card"],
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
    getStatus() {
      if (this.card.status && this.card.stock !== 0) {
        return "Ready Stock";
      } else {
        return "Out of stock";
      }
    },
    addToCart(id) {
      Swal.fire({
        title: "Input quantity",
        input: "number",
        inputValue: 1,
        inputPlaceholder: "e.g 5",
        showCancelButton: true,
        showConfirmButton: true,
      })
        .then((data) => {
          let cartData = {
            ProductId: id,
            quantity: +data.value,
          };
          if (data.isConfirmed) this.$store.dispatch("addToCart", cartData);
        })
        .catch((err) => console.log(err));
    },
    checkout(id) {
      let qty = 0;
      Swal.fire({
        title: "Input quantity",
        input: "number",
        inputValue: 1,
        inputPlaceholder: "e.g 5",
        showCancelButton: true,
        showConfirmButton: true,
      })
        .then((data) => {
          if (data.value >= 1) {
            qty = +data.value;
            return Swal.mixin({
              showConfirmButton: true,
              confirmButtonColor: "green",
              showCancelButton: true,
              progressSteps: ["1", "2"],
            }).queue([
              {
                title: "Choose payment method",
                input: "select",
                confirmButtonText: "Next",
                inputOptions: {
                  Status: {
                    OV: "OVO",
                    A1: "ATM Bersama",
                    M1: "Mandiri Virtual Account",
                  },
                },
              },
              {
                title: "Total amount",
                confirmButtonText: "Pay & Done",
                text: `Your total bill is Rp ${this.joinRupiah(
                  this.card.price * data.value
                )}`,
                input: "number",
              },
            ]);
          } else if (data.value < 1) {
            throw { name: "Qty" };
          }
        })
        .then((result) => {
          let totalPrice = this.card.price * qty;
          if (result.value && Number(result.value[1]) !== totalPrice) {
            throw { name: "Payment" };
          } else if (!result.dismiss) {
            let data = {
              ProductId: id,
              quantity: qty,
              price: totalPrice,
              method: result.value[0],
            };
            this.$store.dispatch("checkout", data);
          }
        })
        .catch((err) => {
          let errMessage = "";
          if (err.name === "Qty") {
            errMessage = "Minimum quantity is 1";
          } else if (err.name === "Payment") {
            errMessage = "Money that you will pay doesn't match the total bill";
          }
          Swal.fire({
            icon: "error",
            title: errMessage,
            timer: 2000,
          });
        });
    },
  },
};
</script>

<style></style>

<template>
  <tbody>
    <tr>
      <td>
        <h1 class="ui image header">
          <img
            :src="cart.Product.image_url"
            alt="product image"
            class="ui massive rounded image"
          />
        </h1>
      </td>
      <td>
        <div class="content">
          <center>{{ cart.Product.category }}</center>
        </div>
      </td>
      <td>
        <div class="content">
          <center>{{ cart.Product.name }}</center>
        </div>
      </td>
      <td>Rp. {{ joinRupiah(cart.Product.price) }}</td>
      <td>
        <center>
          {{ cart.quantity }}
          <span class="has-icons-right ml-4">
            <span class="icon">
              <a @click.prevent="editQuantity(cart.id)">
                <i class="fas fa-edit"></i>
              </a>
            </span>
          </span>
        </center>
      </td>
      <td>
        <div class="ui buttons">
          <button
            class="ui green button"
            @click.prevent="checkout(cart.Product.id)"
          >
            <i class="fas fa-shopping-bag pr-2"></i>
            Checkout
          </button>
          <div class="or"></div>
          <button class="ui red button" @click.prevent="deleteCart(cart.id)">
            <i class="fas fa-trash pr-2"></i>
            Delete
          </button>
        </div>
      </td>
    </tr>
  </tbody>
</template>

<script>
import Swal from "sweetalert2";
export default {
  name: "TableCart",
  props: ["cart"],
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
    deleteCart(id) {
      Swal.fire({
        title: `Do you want to delete ${this.cart.Product.name} from cart?`,
        showDenyButton: true,
        confirmButtonText: `Delete`,
        denyButtonText: `Cancel`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch("deleteCart", id);
        }
      });
    },
    checkout(id) {
      Swal.mixin({
        showConfirmButton: true,

        confirmButtonColor: "green",
        showCancelButton: true,
        progressSteps: ["1", "2"],
      })
        .queue([
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
              this.cart.Product.price * this.cart.quantity
            )}`,
            input: "number",
          },
        ])
        .then((result) => {
          let totalPrice = this.cart.Product.price * this.cart.quantity;
          if (result.value && Number(result.value[1]) !== totalPrice) {
            throw 400;
          } else if (!result.dismiss) {
            let data = {
              ProductId: id,
              quantity: this.cart.quantity,
              price: totalPrice,
              method: result.value[0],
            };
            this.$store.dispatch("checkout", data);
          }
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "Money that you will pay doesn't match the total bill",
            timer: 2000,
          });
        });
    },
    editQuantity(id) {
      Swal.fire({
        title: `Change ${this.cart.Product.name} quantity`,
        input: "number",
        inputValue: this.cart.quantity,
        showCancelButton: true,
        confirmButtonText: "Save",
      })
        .then((response) => {
          if (response.isConfirmed && response.value) {
            let qty = { quantity: response.value };
            this.$store.dispatch("editQuantity", { qty, id });
          } else if (response.isConfirmed && !response.value) {
            throw Error;
          }
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "Quantity is Required",
            timer: 2000,
          });
        });
    },
  },
};
</script>

<style></style>

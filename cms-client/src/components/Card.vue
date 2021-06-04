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
            <button class="ui blue button" @click.prevent="showEdit(card.id)">
              Edit
            </button>
            <div class="or"></div>
            <button
              class="ui positive button"
              @click.prevent="changeStatus(card.id)"
            >
              Change Status
            </button>
            <div class="or"></div>
            <button
              class="ui negative button"
              @click.prevent="deleteProduct(card.id)"
            >
              Delete
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
    changeStatus(id) {
      Swal.fire({
        title: `Change ${this.card.name} status`,
        input: "select",
        inputOptions: {
          Status: {
            true: "Ready Stock",
            false: "Out of Stock",
          },
        },
        inputPlaceholder: "Select Status",
        showCancelButton: true,
        confirmButtonText: "Change Status",
      })
        .then((response) => {
          if (response.isConfirmed && response.value) {
            let status = response.value;
            this.$store.dispatch("changeStatus", { status, id });
          } else if (response.isConfirmed && !response.value) {
            throw Error;
          }
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "Status is Required",
            timer: 2000,
          });
        });
    },
    deleteProduct(id) {
      Swal.fire({
        title: "Do you want to delete this product?",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          let data = {
            id: id,
            category: this.card.category,
          };
          this.$store.dispatch("deleteProduct", data);
          Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    },
    showEdit(id) {
      this.$store.dispatch("showEdit", id);
    },
  },
};
</script>

<style></style>

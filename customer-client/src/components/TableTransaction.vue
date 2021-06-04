<template>
  <tbody>
    <tr>
      <td>
        <h1 class="ui image header">
          <img
            :src="transaction.Product.image_url"
            alt="product image"
            class="ui massive rounded image"
          />
        </h1>
      </td>
      <td>
        <div class="content">
          <center>{{ transaction.Product.category }}</center>
        </div>
      </td>
      <td>
        <div class="content">
          <center>{{ transaction.Product.name }}</center>
        </div>
      </td>
      <td>Rp. {{ joinRupiah(transaction.price) }}</td>
      <td>{{ transaction.quantity }}</td>
      <td>{{ generateDate(transaction.date) }}</td>
    </tr>
  </tbody>
</template>

<script>
export default {
  name: "TableTransaction",
  props: ["transaction"],
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
    generateDate(date) {
      let year = date.slice(0, 4);
      let month = date.slice(5, 7);
      let monthName = "";
      let day = date.slice(8);
      if (month === "01") monthName = "January";
      if (month === "02") monthName = "February";
      if (month === "03") monthName = "March";
      if (month === "04") monthName = "April";
      if (month === "05") monthName = "May";
      if (month === "06") monthName = "June";
      if (month === "07") monthName = "July";
      if (month === "08") monthName = "August";
      if (month === "09") monthName = "September";
      if (month === "10") monthName = "Octoboer";
      if (month === "11") monthName = "November";
      if (month === "12") monthName = "December";
      return `${day} ${monthName} ${year}`;
    },
  },
};
</script>

<style></style>

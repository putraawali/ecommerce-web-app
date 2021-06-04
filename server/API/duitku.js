var md5 = require("md5");
const fetch = require("node-fetch");
let merchantCode = process.env.merchantCode;
let merchantKey = process.env.merchantKey;
let orderId = Math.round(Math.random() * 100000).toString();

async function payment(total, method) {
  let combination = merchantCode + orderId + total + merchantKey;
  let signature = md5(combination);
  let data = {
    merchantCode: merchantCode,
    paymentAmount: total,
    paymentMethod: method,
    merchantOrderId: orderId,
    signature: signature,
    expiryPeriod: 10,
  };

  try {
    let response = await fetch(
      "https://passport.duitku.com/webapi/api/merchant/v2/inquiry",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    let result = await response.json();
    if (result.statusCode === "00") {
      return result.statusCode;
    } else {
      throw result;
    }
  } catch (error) {
    return error;
  }
}

module.exports = payment;

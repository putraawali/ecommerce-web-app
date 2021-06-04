if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const PORT = process.env.PORT;
const cors = require("cors");
const router = require("./routes");
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(router);
app.use(function errorHandler(error, req, res, next) {
  res.status(error.status).json({
    message: error.message,
  });
});
app.listen(PORT, function() {
  console.log(`LISTENING ON PORT ${PORT}`);
});
module.exports = app;

const router = require("express").Router();
const productRouter = require("../routes/product");
const userRouter = require("./user");
const cartRouter = require("./cart");
const transactionRouter = require("./transction");

router.use(userRouter);
router.use("/products", productRouter);
router.use("/carts", cartRouter);
router.use("/transactions", transactionRouter);

module.exports = router;

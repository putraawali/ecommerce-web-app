const transactionRouter = require("express").Router();
const TransactionCtrl = require("../controllers/transaction.js");
const authenticate = require("../middlewares/authentication.js");
const { authorizeCustomer } = require("../middlewares/authorization.js");
transactionRouter.use(authenticate);
transactionRouter.get("/", authorizeCustomer, TransactionCtrl.getAll);
transactionRouter.post("/", authorizeCustomer, TransactionCtrl.post);

module.exports = transactionRouter;

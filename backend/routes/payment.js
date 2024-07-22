const express = require("express");
const { isAuthenticationUser } = require("../middlewares/authenticate");
const { processPayment, sendStripeApi } = require("../controllers/paymentController");
const router = express.Router();

router.route('/payment/process').post( isAuthenticationUser, processPayment)
router.route("/stripeapi").get(isAuthenticationUser, sendStripeApi);

module.exports = router
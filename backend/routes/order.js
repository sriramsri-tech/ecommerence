const express = require("express");
const router = express.Router();
const {
  newOrder,
  getSingleOrder,
  myOrders,
  orders,
  getOrders,
  UpdateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const {
  isAuthenticationUser,
  authorizeRoles,
} = require("../middlewares/authenticate");

router.route("/order/new").post(isAuthenticationUser, newOrder);
router.route("/order/:id").get(isAuthenticationUser, getSingleOrder);
router.route("/myorders").get(isAuthenticationUser, myOrders);

//Admin routes
router
  .route("/admin/orders")
  .get(isAuthenticationUser, authorizeRoles("admin"), orders);
router
  .route("/admin/order/:id")
  .put(isAuthenticationUser, authorizeRoles("admin"), UpdateOrder);

router
  .route("/admin/orders/:id")
  .delete(isAuthenticationUser, authorizeRoles("admin"), deleteOrder);
module.exports = router;

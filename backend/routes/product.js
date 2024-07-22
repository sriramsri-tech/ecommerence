const express = require("express");
const {
  getProducts,
  newProduct,
  getSingleProducts,
  updateProduct,
  deleteProduct,
  createReview,
  getReviews,
  deleteReviews,
  getAdminProducts,
} = require("../controllers/productController");
const router = express.Router();
const {
  isAuthenticationUser,
  authorizeRoles,
} = require("../middlewares/authenticate");
const multer = require("multer");
const path = require("path");
//const app = express();

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "..", "uploads/product"));
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});


router.route("/products").get(getProducts);

router.route("/product/:id").get(getSingleProducts);
//router.route("/product/:id").delete(deleteProduct);


router
  .route("/review")
  .put(isAuthenticationUser, createReview)
  

router
  .route("/admin/product/new")
  .post(isAuthenticationUser, authorizeRoles("admin"),upload.array('images'), newProduct);
  router
    .route("/admin/products")
    .get(isAuthenticationUser, authorizeRoles("admin"), getAdminProducts);

    router
      .route("/admin/products/:id")
      .delete(isAuthenticationUser, authorizeRoles("admin"), deleteProduct);

         router
           .route("/admin/products/:id")
           .put(
             isAuthenticationUser,
             authorizeRoles("admin"),
             upload.array("images"),
             updateProduct
           );
           router
             .route("/admin/reviews")
             .get(isAuthenticationUser, authorizeRoles("admin"), getReviews);
          router
            .route("/admin/reviews")
            .delete(
              isAuthenticationUser,
              authorizeRoles("admin"),
              deleteReviews
            );


module.exports = router;

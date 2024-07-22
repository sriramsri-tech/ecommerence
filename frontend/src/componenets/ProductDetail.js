import { Fragment, useEffect, useState } from "react";
import { getProduct } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addCartItems } from "../actions/cartAction";
import { Button, Modal } from "react-bootstrap";
import { createReview } from "../actions/orderActions";
import { toast } from "react-toastify";
import { clearProduct, clearReviewSubmitted } from "../slices/ProductSlice";
import ProductReview from "./ProductReview";

export default function ProductDetail() {
  const {
    loading,
    product = {},
    isReviewSubmitted,
    error,
  } = useSelector((state) => state.productState);
  const { user } = useSelector((state) => state.authState);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { id } = useParams();

  const increaseQty = () => {
    const count = document.querySelector(".count");
    if (product.stock === 0 || count.valueAsNumber >= product.stock) return;
    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  };

  const decreaseQty = () => {
    const count = document.querySelector(".count");
    if (count.valueAsNumber === 1) return;
    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  const reviewHandler = () => {
    const formData = new FormData();
    formData.append("rating", rating);
    formData.append("comment", comment);
    formData.append("productId", id);
    dispatch(createReview(formData));
  };

  useEffect(() => {
    if (isReviewSubmitted) {
      handleClose();
      toast("Success", {
        type: "success",
        position: "bottom-center",
        onOpen: () => dispatch(clearReviewSubmitted()),
      });
      //return;
    }

    if (error) {
      toast.error(error, {
        position: "bottom-center",
      });
      return;
    }
    if (!product._id || isReviewSubmitted) {
      dispatch(getProduct(id));
    }
    return () => {
      dispatch(clearProduct());
    };
  }, [dispatch, id, isReviewSubmitted, error]);

  return (
    <Fragment>
      {loading ? (
        "loading"
      ) : (
        <div className="product-info">
          <div>
            <img src={product.image} alt={product.name} />
          </div>
          <h3>Name: {product.name}</h3>
          <h4>Id: {product._id}</h4>
          <div>
            <button onClick={decreaseQty}>-</button>
            <input className="count" type="number" value={quantity} readOnly />
            <button onClick={increaseQty}>+</button>
            <button
              className="addc"
              disabled={product.stock === 0 ? true : false}
              onClick={() => dispatch(addCartItems(product._id, quantity))}
            >
              Add to Cart
            </button>
          </div>

          <h3>Number of Reviews: {product.numOfReviews}</h3>
          <h4 className="price">Price: {product.price}</h4>
          <h4
            className={`stock ${
              product.stock > 0 ? "in-stock" : "out-of-stock"
            }`}
          >
            Stock: {product.stock > 0 ? "In Stock" : "Out Of Stock"}
          </h4>
          <h3>{product.description}</h3>
          <h4>Seller :{product.seller}</h4>
          <button>Add Products</button>
          {user ? (
            <button onClick={handleShow}>Submit Your Review</button>
          ) : (
            <div className="alert alert-danger mt-5">Login to Post Reveiw</div>
          )}

          <div>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ul style={{ listStyleType: "none", padding: 0 }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <li
                      key={star}
                      value={star}
                      onClick={() => setRating(star)}
                      className={`star ${star <= rating ? "orange" : ""}`}
                      onMouseOver={(e) => e.target.classList.add("yellow")}
                      onMouseOut={(e) => e.target.classList.remove("yellow")}
                    >
                      ★ {star}
                    </li>
                  ))}
                </ul>

                <textarea
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
                <button disabled={loading} onClick={reviewHandler}>
                  Submit
                </button>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      )}
      {product.reviews && product.reviews.length > 0 ? (
        <ProductReview reviews={product.reviews} />
      ) : null}
    </Fragment>
  );
}

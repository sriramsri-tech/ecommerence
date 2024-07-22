import React, { Fragment, useEffect, useState } from "react";
import "./ReviewList.css";

import { MDBDataTable } from "mdbreact";
import { useDispatch, useSelector } from "react-redux";

import { deleteReview, getReviews } from "../../actions/productActions";
import { clearReviewDeleted } from "../../slices/ProductSlice";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";

export default function ReviewList() {
  const {
    reviews = [],
    loading = true,
    error,
    isReviewDeleted,
  } = useSelector((state) => state.productState);
  const dispatch = useDispatch();
  const [productId, setProductId] = useState("");

  const setReviews = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Rating",
          field: "rating",
          sort: "asc",
        },
        {
          label: "User",
          field: "user",
          sort: "asc",
        },
        {
          label: "Comment",
          field: "comment",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };
    reviews.forEach((review) => {
      data.rows.push({
        id: review._id,
        rating: review.rating,
        user: review.user.name,
        comment: review.comment,

        actions: (
          <button onClick={(e) => deleteHandler(e, review._id)}>Delete</button>
        ),
      });
    });
    return data;
  };

  const deleteHandler = (e, id) => {
    e.target.disabled = true;
    dispatch(deleteReview(productId, id));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getReviews(productId));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-center",
      });
      return;
    }

    if (isReviewDeleted) {
      toast("Review deleted successfully", {
        type: "success",
        position: "bottom-center",
        onOpen: () => dispatch(clearReviewDeleted()),
      });
      dispatch(getReviews(productId));

      return;
    }
  }, [dispatch, error, isReviewDeleted]);

  return (
    <div className="d-flex">
      <div className="col-md-9 ml-sm-auto col-lg-10 px-4">
        <h2 className="my-4">Review List</h2>
        <Sidebar />
        <div className="review">
          <div>
            <div>
              <form onSubmit={submitHandler}>
                <div>
                  <label>Product Id</label>
                  <input
                    type="text"
                    onChange={(e) => setProductId(e.target.value)}
                    value={productId}
                    className="form-control"
                  />
                </div>
              </form>
              <button type="submit" disabled={loading}>
                Search Reviews
              </button>
            </div>
          </div>
          <Fragment>
            {loading ? (
              "Loading..."
            ) : (
              <MDBDataTable
                data={setReviews()}
                bordered
                striped
                hover
                className="product-list-table"
              />
            )}
          </Fragment>
        </div>
      </div>
    </div>
  );
}

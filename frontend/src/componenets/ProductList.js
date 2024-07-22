import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct, getAdminProducts } from "../actions/productActions";
import Sidebar from "./admin/Sidebar";
import { MDBDataTable } from "mdbreact";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "bootstrap";
import { clearProductFail } from "../slices/ProductSlice";

export default function ProductList() {
  const {
    products = [],
    loading = true,

    error,
  } = useSelector((state) => state.data);
  const { isProductDeleted, error: productError } = useSelector(
    (state) => state.productState
  );
  const dispatch = useDispatch();

  const setProducts = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Stock",
          field: "stock",
          sort: "asc",
        },
        {
          label: "Price",
          field: "price",
          sort: "asc",
        },
        {
          label: "Action",
          field: "action",
          sort: "asc",
        },
      ],
      rows: [],
    };

    products.forEach((product) => {
      data.rows.push({
        id: product._id,
        name: product.name,
        stock: product.stock,
        price: `$${product.price}`,
        action: (
          <Fragment>
            <Link
              to={`admin/product/${product._id}`}
              className="btn btn-primary btn-sm mr-2"
            >
              <button onClick={(e) => deleteHandler(e, product._id)}>
                Delete
              </button>
              <i className="fas fa-edit"></i>
            </Link>
            <Link to={`/admin/products/${product._id}`}>
              <button className="btn btn-danger btn-sm">
                Edit
             
              </button>
            </Link>
          </Fragment>
        ),
      });
    });
    return data;
  };

  const deleteHandler = (e, id) => {
    e.target.disabled = true;
    dispatch(deleteProduct(id));
  };
  useEffect(() => {
    if (error || productError) {
      toast.error(error || productError, {
        position: "bottom-center",
      });
      return;
    }

    if (isProductDeleted) {
      toast("Product deleted successfully", {
        type: "success",
        position: "bottom-center",
        onOpen: () => dispatch(clearProductFail()),
      });

      return;
    }

    dispatch(getAdminProducts);
  }, [dispatch, error, isProductDeleted, productError]);

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="col-md-9 ml-sm-auto col-lg-10 px-4">
        <h2 className="my-4">Product List</h2>
        <Fragment>
          {loading ? (
            "Loading..."
          ) : (
            <MDBDataTable
              data={setProducts()}
              bordered
              striped
              hover
              className="product-list-table"
            />
          )}
        </Fragment>
      </div>
    </div>
  );
}

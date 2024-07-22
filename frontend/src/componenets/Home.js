import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "./MetaData";
import { getProducts } from "../actions/productActions";
import Product from "./Product";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";

export default function Home() {
  const dispatch = useDispatch();
  const { data, loading, error, productsCount, resPerPage } = useSelector(
    (state) => state.data
  ); // Assuming data reducer is under 'data' key
  const [currentPage, setCurrentPage] = useState(1);

  const setCurrentPageNo = (pageNo) => {
    setCurrentPage(pageNo);
  };

  useEffect(() => {
    if (error) {
      return toast.error(error, {
        position: "bottom-center", // Use string literal directly
      });
    }

    dispatch(getProducts(null,currentPage)); // Invoke getProducts action creator
  }, [dispatch, error, currentPage]);

  return (
    <Fragment>
      <div>
        <div>
          <h3>Latest Products</h3>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <section>
              <div className="product-container">
                {data &&
                  data.map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
              </div>
              {productsCount > 0 && productsCount > resPerPage ? (
                <div>
                  <Pagination
                    activePage={currentPage}
                    onChange={setCurrentPageNo}
                    totalItemsCount={productsCount}// 1 st page
                    itemsCountPerPage={resPerPage}// 2 nd page
                    nextPageText={"Next"}
                    firstPageText={"First"}
                    lastPageText={"Last"}
                    itemClass={"page-item"}
                    linkClass={"page-link"}
                  />
                </div>
              ) : null}
            </section>
          )}
        </div>
      </div>
    </Fragment>
  );
}

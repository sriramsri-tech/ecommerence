import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "./MetaData";
import { getProducts } from "../actions/productActions";
import Product from "./Product";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";
import { useParams } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap_white.css";

export default function ProductSearch() {
  const dispatch = useDispatch();
  const { data, loading, error, productsCount, resPerPage } = useSelector(
    (state) => state.data
  ); // Assuming data reducer is under 'data' key
  const [currentPage, setCurrentPage] = useState(1);
  const { keyword } = useParams();

  const setCurrentPageNo = (pageNo) => {
    setCurrentPage(pageNo);
  };

  useEffect(() => {
    if (error) {
      return toast.error(error, {
        position: "bottom-center", // Use string literal directly
      });
    }

    dispatch(getProducts(keyword, currentPage)); // Invoke getProducts action creator
  }, [dispatch, error, currentPage, keyword]);

  return ( 
    <Fragment>
      <div>
        <div>
          <h3>Search Products</h3>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <section>
              <div className="searchhhh">
                <div>
                  <div>
                    <Slider
                      range={true}
                      marks={{
                        1: "$1",
                        1000: "$1000",
                      }}
                      min={1}
                      max={1000}
                      defaultValue={[1, 1000]}
                      handleRender={
                      renderProps => {
                        return (
                          <Tooltip
                            overlay={`$${renderProps.props["aria-valuenow"]}`}
                          >
                            <div>{renderProps.props.children}</div>
                          </Tooltip>
                        );
                      }}
                    />
                  </div>
                  <div>
                    {data &&
                      data.map((product) => (
                        <Product key={product._id} product={product} />
                      ))}
                  </div>
                </div>
              </div>
              {productsCount > 0 && productsCount > resPerPage ? (
                <div>
                  <Pagination
                    activePage={currentPage}
                    onChange={setCurrentPageNo}
                    totalItemsCount={productsCount}
                    itemsCountPerPage={resPerPage}
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

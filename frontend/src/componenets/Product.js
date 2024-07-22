import { Link } from "react-router-dom";
import "./Product.css"; // Import the CSS file

export default function Product({ product }) {
  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.images[0].image}
          alt={product.name}
          className="product-image"
        />
      </Link>
      <div className="product-details">
        <Link to={`/product/${product._id}`}>
          <h3 className="product-name">{product.name}</h3>
        </Link>
        <h4 className="product-reviews">
          <b style={{ color: "red" }}>Num of Reviews:</b> {product.numOfReviews}
        </h4>
        <p className="product-description">
          <b style={{ color: "red" }}> Description: </b> {product.description}
        </p>
        <h4 className="product-category">{product.category}</h4>
        <Link to={`/product/${product._id}`}>
          <button className="view-details-button">View Details</button>
        </Link>
      </div>
    </div>
  );
}

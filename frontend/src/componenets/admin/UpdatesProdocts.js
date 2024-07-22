import React, { useEffect, useState } from "react";
import "./NewProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, updateProduct } from "../../actions/productActions";
import { toast } from "react-toastify";
import { clearProductUpdated } from "../../slices/ProductSlice";

export default function UpdatesProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(1);
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);
  const [imagesCleared, setImagesCleared] = useState(false);

  const [imagesPreview, setImagesPreview] = useState([]); // Initialize as an array
  const { id: productId } = useParams();

  const { loading, isProductUpdated, error, product } = useSelector(
    (state) => state.productState
  );
  //const navigate = useNavigate();
  const dispatch = useDispatch();

  const categories = [
    "Electronics",
    "MobilePhone",
    "Laptop",
    "Food",
    "Books",
    "Clothes",
    "Beauty",
    "Sports",
    "Outdoor",
    "Home",
  ];

  const onImagesChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, file]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("description", description);
    formData.append("seller", seller);
    formData.append("category", category);
    images.forEach((image) => {
      formData.append("images", image);
    });
    formData.append("imagesCleared", imagesCleared);

    dispatch(updateProduct(productId, formData));
  };

  const clearImagesHandler = () => {
    setImages([]);
    setImagesPreview([]);
    setImagesCleared(true);
  };
  useEffect(() => {
    if (isProductUpdated) {
      toast("Profile updated successfully", {
        type: "success",
        position: "bottom-center",
        onOpen: () => dispatch(clearProductUpdated()),
      });
      return;
    }
    if (error) {
      toast.error(error, {
        position: "bottom-center",
      });
      return;
    }
    dispatch(getProduct(productId));
  }, [isProductUpdated, error, dispatch]);

  useEffect(() => {
    if (product && product._id) {
      setName(product.name);
      setPrice(product.price);
      setStock(product.stock);
      setDescription(product.description);
      setSeller(product.seller);
      setCategory(product.category);

      let images = [];

      product.images.forEach((image) => {
        images.push(image.image);
      });
      setImagesPreview(images);
    }
  }, [product]);
  return (
    <div className="newproduct">
      <form className="newp" onSubmit={submitHandler}>
        <div className="new">
          <div className="correct">
            <label className="lab">Name</label>
            <input
              className="inp"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="correct">
            <label className="lab">Price</label>
            <input
              className="inp"
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="correct">
            <label className="inp">Description</label>
            <input
              className="lab"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="correct">
            <label className="lab">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="correct">
            <label>Stock</label>
            <input
              type="text"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
          <div className="correct">
            <label>Seller Name</label>
            <input
              type="text"
              value={seller}
              onChange={(e) => setSeller(e.target.value)}
            />
          </div>
          <div className="correct">
            <label>Images</label>
            <input type="file" multiple onChange={onImagesChange} />
          </div>
          <div className="correct">
            <label>Choose for</label>
            {imagesPreview.length > 0 && (
              <span
                onClick={clearImagesHandler}
                style={{ cursor: "pointer" }}
              ></span>
            )}
            {imagesPreview.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="Image Preview"
                width="55"
                height="52"
              />
            ))}
          </div>
        </div>
        <div className="correct">
          <button className="btt" type="submit" disabled={loading}>
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

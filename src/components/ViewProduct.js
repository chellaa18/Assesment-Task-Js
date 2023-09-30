import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { json } from "./json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewProduct = () => {
  // const params = useParams();
  // let ids = parseInt(params.id);

  // const [viewProduct, setViewProducts] = useState([]);

  // useEffect(() => {
  //   fetch(`https://dummyjson.com/products/${ids}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setViewProducts(data);
  //     });
  // }, [ids]);

  // console.log(viewProduct.title);
  // console.log(Object.values(viewProduct));
  // const res = Object.values(viewProduct);
  // console.log(res);
  // {viewProduct ?  Object.values(`title:${viewProduct.title},branf:${viewProduct.brand} `): <h2>no<h2/>}

  const [productCount, setProductCount] = useState(1);
  const naviagte = useNavigate();
  const products = json.products;
  const params = useParams();
  const navigate = useNavigate();

  //finding the params ID in json object
  const product = products.find(
    (product) => product.id.toString() === params.id
  );

  const notify = () => toast.success("Product Added to Cart!");

  const addToDash = (id) => {
    const userDetails = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!userDetails) {
      toast.warning("You need to Login!");
      return false;
    }

    const userID = userDetails.id;

    const selectedProduct = products.find((product) => product.id === id);

    if (userID && selectedProduct) {
      const userSavedProducts = JSON.parse(localStorage.getItem(userID)) || [];

      userSavedProducts.push(selectedProduct);

      localStorage.setItem(userID, JSON.stringify(userSavedProducts));
      notify();
    }
  };

  const decrementProductCount = () => {
    if (productCount > 1) {
      setProductCount(productCount - 1);
    }
  };

  return (
    <div className="container vh-100">
      <div className="toast-container">
        <ToastContainer limit={5} />
      </div>
      <div className="row d-flex justify-content-center">
        <h2 className="text-white">ViewProduct {params.id}</h2>
        <div className="card ms-2 mt-2 col-lg-3 m-1" key={product.id}>
          <img
            src={product.images[0]}
            className="card-img-top"
            alt="products"
          ></img>
          <div className="card-body p-4">
            <h5 className="card-title">{product.title}</h5>
            <p className="card-text">Price: ${product.price}</p>
            <p>Only {product.stock} left..</p>
          </div>
          <div className="d-flex mb-3">
            <button onClick={() => setProductCount(productCount + 1)}>+</button>
            <input
              readOnly
              value={productCount}
              className="form-control form-control-sm text-center"
            />
            <button onClick={decrementProductCount}>-</button>
          </div>
          <button
            className="view-button mb-4"
            onClick={() => naviagte("/products")}
          >
            Go back
          </button>
          <button
            className="pro-button mb-4"
            onClick={() => addToDash(product.id)}
          >
            Add to Cart
          </button>
          {/* <button className="view-button my-4" onClick={()=>navigate('/dashboard')}>Goto Dashboard</button> */}
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;

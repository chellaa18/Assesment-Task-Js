import React, { useState } from "react";
import { json } from "./json";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Products = () => {

  const [showItem, setShowItem] = useState(4);

  const products = json.products;

  // console.log(products);
  const navigate = useNavigate();

  const showMore = () => {
    setShowItem(showItem + 8);
  };

  const notify = () => toast.success("Product Added to Cart!");

  const addToDash = (id) => {
    
    const userDetails = JSON.parse(localStorage.getItem("loggedInUser"));
    if(!userDetails){
      toast.warning("You need to Login!")
      return false;
    }
    const userEmail = userDetails.email;
    console.log(userEmail);

    const selectedProduct = products.find((product) => product.id === id);

    if (userEmail && selectedProduct) {
      const userSavedProducts = JSON.parse(localStorage.getItem(userEmail)) || [];

      userSavedProducts.push(selectedProduct);

      localStorage.setItem(userEmail, JSON.stringify(userSavedProducts));
      notify();
    }
  };
  const userDetails = JSON.parse(localStorage.getItem("loggedInUser"));

  return (
    <>
      <div className="container mt-4">
        <div className="toast-container">
          <ToastContainer limit={5} />
        </div>
        {userDetails ? (
          <button
            onClick={() => navigate("/dashboard")}
            className="view-button mb-4"
          >
            Go to dashboard
          </button>
        ) : (
          <button className="view-button mb-4" onClick={() => navigate("/")}>
            Go Home
          </button>
        )}

        <h4 style={{ color: "#d51c9a" }}>Products</h4>
        <div className="row d-flex">
          {products.length > 0 ? (
            products.slice(0, showItem).map((product, i) => {
              return (
                <div
                  className="card ms-2 mt-2 col-lg-2 m-1"
                  key={product.id}
                  style={{ width: "13rem" }}
                >
                  <img
                    src={product.images[0]}
                    className="card-img-top"
                    alt="products"
                  ></img>
                  <div className="card-body p-4">
                    <h5 className="card-title">{product.title}</h5>
                    {/* <p className="card-text">Price: ${product.price}</p> */}
                    {/* <p>Only {product.stock} left..</p> */}
                  </div>
                  <button
                    className="view-button mb-4"
                    onClick={() => navigate(`/viewproduct/${product.id}`)}
                  >
                    View Product
                  </button>
                  <button
                    className="pro-button mb-4"
                    onClick={() => addToDash(product.id)}
                  >
                    Add to Cart
                  </button>
                </div>
              );
            })
          ) : (
            <h2>No data</h2>
          )}

          {showItem < products.length ? (
            <button className="view-button my-4" onClick={showMore}>
              Show More...
            </button>
          ) : (
            <button
              className="view-button my-4"
              onClick={() => setShowItem(10)}
            >
              Show Less..
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import profileLogo from "../../assets/images/profile.jpg";
import Swal from "sweetalert2";


const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedProducts, setSelectedProducts] = useState([]);

  const userDetails = JSON.parse(localStorage.getItem("loggedInUser")) || [];
  // console.log(userDetails);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("loggedInUser")) || [];

    const userEmail = userDetails.email;

    const userProducts = JSON.parse(localStorage.getItem(userEmail)) || [];
    setSelectedProducts(userProducts);
  }, []);

 
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
   
    if(!loggedInUser){
      navigate('/Login')
      return 
    }
    else if (loggedInUser.isUserLoggedIn === false) {
      navigate("/otp");
    }
  }, []);

  const logOut = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  const deleteProduct = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");

        const updatedProducts = selectedProducts.filter(
          (product) => product.id !== id
        );
        console.log(updatedProducts);
        setSelectedProducts(updatedProducts);

        const userDetails =
          JSON.parse(localStorage.getItem("loggedInUser")) || [];
        const userEmail = userDetails.email;

        localStorage.setItem(userEmail, JSON.stringify(updatedProducts)); // Update local storage
      }
    });
  };

  return (
    <div className="container">
      <h1 className="text-white">Dashboard</h1>

      <div className="row d-flex justify-content-center">
        <div className="card ms-2 mt-2 col-lg-4 m-1" key={userDetails.id}>
          <h4 className="card-title text-center mt-4">
            {userDetails.userName}'s Profile
          </h4>
          <img src={profileLogo} className="card-img-top" alt=""></img>
          <div className="card-body p-4">
            <h4 className="card-title">UserID: {userDetails.id}</h4>
            <p>UserName: {userDetails.userName}</p>
            <p>email: {userDetails.email}</p>
            <p>DOB: {userDetails.dob}</p>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        {" "}
        <div className="d-flex">
          <button
            className="view-button mb-4 me-2"
            onClick={() => navigate("/products")}
          >
            Add Products
          </button>
          <button
            className="view-button mb-4 me-2"
            onClick={() => navigate("/allselected")}
          >
           View All Products in Cart
          </button>
          <button className="pro-button mb-4" onClick={() => logOut()}>
            Log Out
          </button>
        </div>
        <h3 style={{ color: "#d51c9a" }}>Cart details</h3>
        <div>
          {selectedProducts.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Product Title</th>
                  <th>Product Price</th>
                  <th>Actions/Delete</th>
                  <th>Actions/Edit</th>
                </tr>
              </thead>
              <tbody>
                
                {selectedProducts.slice(0,4).map((product, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{product.title}</td>
                    <td>${product.price}</td>
                    <td>
                      <button
                        className="pro-button ms-3"
                        onClick={() => deleteProduct(product.id)}
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <button
                        className="pro-button ms-3"
                        onClick={() => navigate(`/editproduct/${product.id}`)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No selected products available.</p>
          )}
        </div>
      </div>


  
    </div>
  );
};

export default Dashboard;

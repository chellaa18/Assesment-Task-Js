import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import profileLogo from "../../assets/images/profile.jpg";
import Swal from "sweetalert2";


const AllSelected = () => {
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
      <div>
      <button
            onClick={() => navigate("/dashboard")}
            className="view-button mb-4"
          >
            Go to dashboard
          </button>
      </div>
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
          
          {selectedProducts.map((product, index) => (
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
    )}</div>
  )
}

export default AllSelected
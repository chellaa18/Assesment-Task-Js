import React from "react";
import { useState, useEffect } from "react";


const Categories = () => {
  const [cat, setCat] = useState([]);
  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        setCat(data);
      });
  }, []);
  
  return (
    <>
      <div className="container">
        <div>
          <h4 style={{ color: "#d51c9a" }}>Categories</h4>
        </div>
        <div className="row vh-100 d-flex">
          {cat.map((item) => {
            return (
              <div className="card col-lg-2 m-2 d-flex justify-content-center align-items-center">
                <p>{item}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Categories;

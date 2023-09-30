import React, { createContext, useContext, useEffect, useState } from "react";
import "./App.css";
import Categories from "./components/categories/Categories";
import Login from "./components/login/Login";
import Nav from "./components/nav/Nav";
import Footer from "./components/footer/Footer";
import Products from "./components/Products";
import { Routes, Route } from "react-router-dom";
import Registration from "./components/Registration";
import Home from "./components/home/Home";
import ViewProduct from "./components/ViewProduct";
import { Navigate } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";

import EditProduct from "./components/editProducts/EditProduct";
import PageNotFound from "./components/pageNotFound/PageNotFound";
import Otp from "./components/otp/Otp";
import Table from "./components/dataTable/Table";
import AllSelected from "./components/overSelectedProducts/AllSelected";

function PrivateRoute({ component }) {
  const isAuthenticated = localStorage.getItem("loggedInUser");

  if (isAuthenticated) {
    return component;
  } else {
    return <Navigate to="/login" />;
  }
}

function App() {


  return (
    <div className="App">
      <Nav />
      {/* <Home/> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/viewproduct/:id" element={<ViewProduct />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute component={<Dashboard />} />}
        />

        <Route path="/editproduct/:id" element={<EditProduct />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/datatable" element={<Table />} />
        <Route path="/allselected" element={<AllSelected />} />
      </Routes>
      {/* <h2 className="text-success">{data && data.title}</h2> */}

      <div></div>
      <Footer />
    </div>
  );
}

export default App;

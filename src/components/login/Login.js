import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const schema = yup
  .object({
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),

    email: yup.string().required("Email is required").email("Email is invalid"),
  })
  .required();
  
const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const notify = () => toast.success("Successfully Login!");
  const onSubmit = (data) => {
    const storedData = JSON.parse(localStorage.getItem("usersData")) || [];
    const user = storedData.find(
      (user) => user.email === data.email && user.password === data.password
    );

    if (user) {
      const isUserLoggedIn = false;
      const newUser = {...user, isUserLoggedIn: isUserLoggedIn}
      localStorage.setItem("loggedInUser", JSON.stringify(newUser));
      navigate("/otp");
      notify();
    } else {
      toast.error("Invalid email or password");
    }
    resetField("password");

    resetField("email");
  };

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if(!loggedInUser){
      return
    }
    else if (loggedInUser.isUserLoggedIn === false) {
      navigate("/otp");
    }else if(loggedInUser.isUserLoggedIn === true){
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="App p-5">
      <div className="container p-5">
        <div className="row d-flex justify-content-center align-items-center vh-100">
          <div className="col-lg-5">
            <div className="toast-container">
              <ToastContainer limit={2} />
            </div>
            <form
              className="p-5 rounded h-100 mb-5"
              onSubmit={handleSubmit(onSubmit)}
              style={{ backgroundColor: "rgba(255, 0, 174, 0.12" }}
            >
              <h3 style={{ color: "#d51c9a" }}>Login Form</h3>

              <div className="form-group">
                <label className="text-white">Email: </label>
                <br />
                <input
                  autoFocus
                  className="form-control"
                  {...register("email")}
                  name="email"
                  type="email"
                />
                <p className="text-danger">{errors.email?.message}</p>
              </div>

              <div className="form-group">
                <label className="text-white">Password: </label>
                <br />

                <input
                  className="form-control"
                  {...register("password")}
                  name="password"
                  type="password"
                />
                <p className="text-danger">{errors.password?.message}</p>
              </div>
              <input type="submit" className="nav-button p-2" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

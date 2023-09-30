import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const schema = yup
  .object({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    userName: yup.string().required("User Name is required"),
    dob: yup
      .string()
      .required("Date of Birth is required")
      .matches(
        /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
        "Date of Birth must be a valid date in the format YYYY-MM-DD"
      ),
    email: yup.string().required("Email is required").email("Email is invalid"),
    password: yup
      .string()
      .min(6, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      )
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    acceptTerms: yup.bool().oneOf([true], "Accept Ts & Cs is required"),
  })
  .required();
function Registration() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const notify = () => toast.success("Successfully Registered!");

  const onSubmit = (data) => {
    const storedData = JSON.parse(localStorage.getItem("usersData")) || [];
    
    try {
      const user = storedData.find((user) => user.email === data.email);
      if (user) {
        toast.error("Email Already Exists");
        return
      } else {
        const id = storedData.length + 1;

        const dataWId = { ...data, id };
        storedData.push(dataWId);
        notify();
      }
    } catch (error) {
      console.log(error);
    }

    localStorage.setItem("usersData", JSON.stringify(storedData));

    // Reset fields
    reset({
      firstName: "",
      lastName: "",
      userName: "",
      dob: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    });
  };

  return (
    <div className="container">
      <div className="toast-container">
        <ToastContainer limit={2} />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-5 rounded"
        style={{ backgroundColor: "rgba(255, 0, 174, 0.12" }}
      >
        <h3 style={{ color: "#d51c9a" }}>Registration Form</h3>
        <div className="form-row">
          <div className="form-group col-5 my-3">
            <label className="text-white">First Name</label>
            <input
              autoFocus
              name="firstName"
              type="text"
              {...register("firstName")}
              className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.firstName?.message}</div>
          </div>
          <div className="form-group col-5 my-3">
            <label className="text-white">Last Name</label>
            <input
              name="lastName"
              type="text"
              {...register("lastName")}
              className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.lastName?.message}</div>
          </div>
          <div className="form-group col-5 my-3">
            <label className="text-white">User Name</label>
            <input
              name="userName"
              type="text"
              {...register("userName")}
              className={`form-control ${errors.userName ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.lastName?.message}</div>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col my-3">
            <label className="text-white">Date of Birth</label>
            <input
              name="dob"
              type="date"
              {...register("dob")}
              className={`form-control ${errors.dob ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.dob?.message}</div>
          </div>
          <div className="form-group col my-3">
            <label className="text-white">Email</label>
            <input
              name="email"
              type="text"
              {...register("email")}
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.email?.message}</div>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col my-3">
            <label className="text-white">Password</label>
            <input
              name="password"
              type="password"
              {...register("password")}
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.password?.message}</div>
          </div>
          <div className="form-group col my-3">
            <label className="text-white">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              {...register("confirmPassword")}
              className={`form-control ${
                errors.confirmPassword ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">
              {errors.confirmPassword?.message}
            </div>
          </div>
        </div>
        <div className="form-group form-check my-3">
          <input
            name="acceptTerms"
            type="checkbox"
            {...register("acceptTerms")}
            id="acceptTerms"
            className={`form-check-input ${
              errors.acceptTerms ? "is-invalid" : ""
            }`}
          />
          <label htmlFor="acceptTerms" className="form-check-label text-white">
            Accept Terms & Conditions
          </label>
          <div className="invalid-feedback">{errors.acceptTerms?.message}</div>
        </div>
        <div className="form-group my-4">
          <button type="submit" className="nav-button p-2 rounded my-2">
            Register
          </button>
          <button
            type="reset"
            className="nav-button p-2 rounded m-2"
            onClick={() => reset()}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default Registration;

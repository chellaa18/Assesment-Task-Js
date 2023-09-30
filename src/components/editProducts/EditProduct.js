import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"; 
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
  .object({
    title: yup.string().required("Product Title is required").trim(),
    price: yup.string().required("price is required").trim(),
  })
  .required();
  
const EditProduct = () => {
  const navigate = useNavigate();
  const params = useParams();

  const userDetails = JSON.parse(localStorage.getItem("loggedInUser")) || [];

  const userEmail = userDetails.email;

  const userProducts = JSON.parse(localStorage.getItem(userEmail));

  const productToEdit = userProducts.find((product) => product.id == params.id);

  
  const { register, handleSubmit, setValue, formState: { errors },} = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues: {
      title: productToEdit.title,
      price: productToEdit.price,
    },
  });

  const onSubmit = (data) => {
    const productIndex = userProducts.findIndex((product) => product.id == params.id);

    const updatedUserProducts = [...userProducts];
    updatedUserProducts[productIndex] = {
      ...productToEdit,
      ...data,
    };

    localStorage.setItem(userEmail, JSON.stringify(updatedUserProducts));
    navigate('/dashboard');
  };

  return (
    <div className="container vh-100">
      <form onSubmit={handleSubmit(onSubmit)} className="text-white p-5">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Product Title
          </label>
         
          <input
            type="text"
            id="title"
            name="title"
            {...register("title")} 
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
          />
              <div className="invalid-feedback">{errors.title ?.message}</div>
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Product Price
          </label>
        
          <input
            type="number"
            id="price"
            name="price"
            {...register("price")} 
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
          />
         <div className="invalid-feedback">{errors.price ?.message}</div>
        </div>

        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProduct;

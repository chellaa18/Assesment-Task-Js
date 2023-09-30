import React, { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
   
    if(!loggedInUser){
      navigate('/Login')
      return 
    }
    else if (loggedInUser.isUserLoggedIn === true) {
      navigate("/dashboard");
    }
  }, []);


  const handleSubmit = () => {
    try {
      if (otp !== "123456") {
        toast.error("Invalid Otp!");

        setOtp("");
      } else {
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        loggedInUser.isUserLoggedIn = true;

        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container vh-100">
      <div className="row ">
        <div className="w-50 mx-auto">
          <h4 className="text-white">Please Enter Your Otp</h4>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
            inputStyle={{
              border: "1px solid transparent",
              borderRadius: "8px",
              width: "54px",
              height: "54px",
              fontSize: "12px",
              color: "#000",
              fontWeight: "400",
              caretColor: "blue",
            }}
          />
          <button
            className="view-button p-2 mt-3 w-50"
            onClick={() => handleSubmit()}
          >
            Verify
          </button>
        </div>
      </div>

      <div className="toast-container">
        <ToastContainer limit={2} />
      </div>
    </div>
  );
};

export default Otp;

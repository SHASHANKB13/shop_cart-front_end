import React, { useState } from "react";
import "../Styles/LoginPage.css";
import { toast, ToastContainer } from "react-toastify";

var user_id = parseInt(localStorage.getItem("user_id"));
const AddressModal = ({ isOpen, onClose }) => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleAddressUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:7000/api/shopping/user/update",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id, phone, email, address }),
        }
      );
      const responseData = await response.json();
      console.log(responseData);
      if (response.status === 200) {
        localStorage.setItem("user_email", responseData.data.email);
        localStorage.setItem("user_phone", responseData.data.phone_number);
        localStorage.setItem("user_address", responseData.data.address);
        console.log("Address updated successfully");
        toast.success("Address updated successful!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        onClose();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error(`Failed to update! Please check and try again.`, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // Failed login
        console.error("failed to update address");
        // Display an error message to the user
      }
    } catch (error) {
      console.error("Error:", error);
      toast.warn(error.message || "Error to fetch", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className={`login-modal ${isOpen ? "open" : ""}`}>
        <div className="modal-content">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <h2>Address</h2>
          <div className="form-group">
            <label htmlFor="username"></label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="Enter your phone number"
            />
          </div>
          <div className="form-group">
            <label htmlFor="username"></label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="username"></label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={handleAddressChange}
              placeholder="Enter full address"
            />
          </div>

          <button className="login-button" onClick={handleAddressUpdate}>
            update
          </button>
        </div>
      </div>
    </>
  );
};

export default AddressModal;

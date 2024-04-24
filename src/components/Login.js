import React, { useState } from "react";
import "../Styles/LoginPage.css";
import { toast, ToastContainer } from "react-toastify";

const LoginModal = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:7000/api/shopping/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.status === 200) {
        localStorage.setItem("user_id", data.id);
        localStorage.setItem("username", data.username);
        localStorage.setItem("user_email", data.email);
        localStorage.setItem("user_phone", data.phone);
        localStorage.setItem("user_address", data.address);
        localStorage.setItem("cart_count", data.cart_count);
        // Successful login
        console.log("Login successful");
        toast.success("Login successful!", {
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
        toast.error(
          `Login failed! Please check your credentials and try again.`,
          {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
        // Failed login
        console.error("Login failed");
        // Display an error message to the user
      }
    } catch (error) {
      console.error("Error:", error);
      toast.warn(error.message || "Unable to login", {
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
          <h2>Login</h2>
          <div className="form-group">
            <label htmlFor="username"></label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Enter your username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password"></label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
            />
          </div>
          <button className="login-button" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginModal;

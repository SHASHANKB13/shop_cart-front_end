import React, { useState } from "react";
import "../Styles/Home.css";
import { BsCart3 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { SiFlipkart } from "react-icons/si";
import { BsSearch } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import LoginModal from "./Login";
import { HiShoppingCart } from "react-icons/hi";

var username = localStorage.getItem("username");
var cart_count = parseInt(localStorage.getItem("cart_count"));
function Header(props) {
  const navigate = useNavigate();

  const handleGearIconClick = (page) => {
    navigate(`/${page}`);
  };

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  console.log("props", props.data);

  const onSearch = (e) => {
    console.log(e.target.value);
    const searchTerm = e.target.value.trim().toLowerCase(); // Trim whitespace and convert to lowercase
    if (!searchTerm) {
      // If search term is empty, reset data to original state
      props.setData(props.orginalData.current);
    } else {
      const filter = props.orginalData.current.filter((d) =>
        d.name.toLowerCase().includes(searchTerm)
      ); // Case-insensitive search
      props.setData(filter);
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <HiShoppingCart
          className="logo_icon"
          onClick={() => handleGearIconClick("")}
        />{" "}
        Shop cart
        {/* <BiCategory className="icon" onClick={handleGearIconClick} />
        Categories */}
      </div>
      <div className="category-div">
        <label>category: </label>
        <select
          name="category"
          onChange={(e) => {
            props.setJsonData({
              ...props.jsonData,
              category: e.target.value,
            });
          }}
          value={props.jsonData.category}
        >
          <option value="MOBILE">Mobiles</option>
          <option value="CLOTHING">Clothes</option>
          <option value="GROCERIES">Groceries</option>
        </select>
      </div>

      <div className="header-center">
        <BsSearch className="close-icon" />
        <input
          type="text"
          placeholder="Search for Products, Brand and More"
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "0px solid #ccc",
            width: "100%",
          }}
          onChange={onSearch}
        />
      </div>
      <div className="header-right">
        <div className="header-cart-div">
          {/* Icon to open login modal */}
          <BsPersonCircle className="icon" onClick={openLoginModal} />
          {/* Login modal */}
          <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
          {username ? username : "login"}
          <BsCart3
            className="icon"
            onClick={() => handleGearIconClick("productCart")}
          />
          Cart
          {/* <span className="badge">{cart_count}</span> */}
          {cart_count !== null && <span className="badge">{cart_count}</span>}
        </div>
      </div>
    </header>
  );
}

export default Header;

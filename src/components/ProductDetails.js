import React, { useState, useEffect } from "react";
import "../Styles/Home.css";
import { useParams } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { GiElectric } from "react-icons/gi";
import { FaRupeeSign } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";

var userId = parseInt(localStorage.getItem("user_id"));

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id: productId } = useParams();

  const handleAddToCartClick = async (productId) => {
    try {
      const requestBody = {
        user_id: userId,
        product_id: productId,
        quantity: 1,
      };

      const response = await fetch(
        "http://localhost:7000/api/shopping/cart/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }

      // Assuming responseData contains success message
      const responseData = await response.json();
      toast.success(responseData.message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      toast.error("Error: " + error.message, {
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

  const navigate = useNavigate();

  const handleButtonClick = (page) => {
    navigate(`/${page}`);
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:7000/api/shopping/product/details/${productId}`
        );
        const data = await response.json();
        // setProduct(data);
        setProduct(data.data[0]);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [productId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  const handleBackIconClick = (page) => {
    navigate(`${page}`);
  };

  return (
    <>
      <ToastContainer />
      <div className="background-container">
        <IoArrowBackCircleOutline
          className="back-icon"
          onClick={() => handleBackIconClick("/")}
        />{" "}
        <div className="product-details-container">
          <div className="product-details">
            {/* <h2>Product Details</h2> */}
            <h2>{product.name}</h2>
            <h3>
              Price: <FaRupeeSign />
              {product.price}
            </h3>
            <h3>Category: {product.category}</h3>
            <button
              className="cart-button"
              onClick={() => handleAddToCartClick(product.id)}
            >
              Add to cart <FaCartPlus />
            </button>

            <div> </div>
            <button
              className="cart-button"
              onClick={() => handleButtonClick("productCart")}
            >
              Buy now
              <GiElectric />
            </button>
            <h3>Description:</h3>
            <p>{product.description}</p>
            <h3>
              Rating: {product.rating}
              <FaStar className="logo_icon" />
            </h3>
          </div>
          <div className="product-image">
            <img src={product.imageUrl} alt={product.name} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;

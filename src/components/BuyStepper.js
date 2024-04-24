import React, { useState, useEffect } from "react";
import "../Styles/Home.css";
import { BsCart3 } from "react-icons/bs";
import { FaRupeeSign } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import AddressModal from "./AddressModal";

var user_id = parseInt(localStorage.getItem("user_id"));
var user_email = localStorage.getItem("user_email");
var user_phone = localStorage.getItem("user_phone");
var user_address = localStorage.getItem("user_address");

function BuyProduct() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const openAddressModal = () => {
    setIsAddressModalOpen(true);
  };

  const closeAddressModal = () => {
    setIsAddressModalOpen(false);
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:7000/api/shopping/cart/details/${user_id}`
          //   "http://localhost:7000/api/shopping/cart/details/1"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const responseData = await response.json();
        const data = responseData.data;
        setTotalPrice(responseData.total_price);
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [user_id]);

  const navigate = useNavigate();

  const handleButtonClick = (page) => {
    navigate(`/${page}`);
  };

  const handleBackIconClick = (page) => {
    navigate(`${page}`);
  };

  if (loading) {
    return <p>Loading...</p>; // You can replace this with a loading spinner
  }

  if (error) {
    return <p>Error: {error}</p>; // Display error message
  }

  const handleDeleteButton = async (productId) => {
    try {
      const requestBody = {
        user_id: user_id,
        product_id: productId,
      };

      const response = await fetch(
        "http://localhost:7000/api/shopping/cart/product/delete",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete item in cart");
      }

      // Assuming responseData contains success message
      const responseData = await response.json();
      toast.success(responseData.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
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

  return (
    <>
      <ToastContainer />
      <div className="buy-background-container">
        <IoArrowBackCircleOutline
          className="back-icon"
          onClick={() => handleBackIconClick("/")}
        />{" "}
        {products && (
          <div className="buy-product-details-container">
            <div className="buy-product-details">
              <h2>
                Cart Details <BsCart3 />
              </h2>
              <h3>
                Total amount: <FaRupeeSign />
                {totalPrice}
              </h3>
              <h3>
                Shipping address:{" "}
                <FaRegEdit
                  className="check-cart-icon"
                  onClick={openAddressModal}
                />
                <AddressModal
                  isOpen={isAddressModalOpen}
                  onClose={closeAddressModal}
                />
              </h3>
              <p>Address: {user_address}, </p>
              <p>Email: {user_email}, </p>
              <p>Phone: {user_phone}</p>

              <div> </div>
              <button
                className="buy-cart-button"
                onClick={() => handleButtonClick("checkout")}
              >
                Proceed
              </button>
            </div>
            <div className="buy-product-list">
              {products.map((product) => (
                <div key={product.id} className="buy-product-card">
                  <div className="buy-product-image">
                    <img src={product.imageUrl} alt={product.name} />
                  </div>
                  <h2>{product.name}</h2>
                  <h3>
                    price: <FaRupeeSign />
                    {product.price}
                  </h3>
                  <h3>Quantity: {product.quantity}</h3>

                  <button
                    className="delete-button"
                    onClick={() => handleDeleteButton(product.id)}
                  >
                    {" "}
                    Delete <AiFillDelete />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default BuyProduct;

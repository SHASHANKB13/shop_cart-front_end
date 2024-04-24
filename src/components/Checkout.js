import React, { useState, useEffect } from "react";
import "../Styles/Home.css";
import { MdShoppingCartCheckout } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { FaRegCreditCard } from "react-icons/fa";
import { SiPhonepe } from "react-icons/si";
import { TbTruckDelivery } from "react-icons/tb";

var user_id = parseInt(localStorage.getItem("user_id"));

function CheckoutPage() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [selectedMode, setSelectedMode] = useState("");

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:7000/api/shopping/cart/details/${user_id}`
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

  const handleOrderPlaceButton = async () => {
    toast.success("Order placed successfully.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setTimeout(() => {
      navigate("/invoicePage");
    }, 3000);
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

  const handleModeChange = (event) => {
    setSelectedMode(event.target.value);
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
                Checkout <MdShoppingCartCheckout className="check-cart-icon" />
              </h2>
              <h3>Shipping: Free</h3>
              <h3>
                Total amount to be paid: <FaRupeeSign />
                {totalPrice}
              </h3>

              <div>
                <h2>Select Payment Mode:</h2>
                <ul className="radio-container">
                  <li className="radio-item">
                    <input
                      type="radio"
                      id="creditCard"
                      value="creditCard"
                      checked={selectedMode === "creditCard"}
                      onChange={handleModeChange}
                      className="radio-input"
                    />
                    <label htmlFor="creditCard" className="radio-label">
                      Credit Card
                      <FaRegCreditCard className="payment-icons" />
                      <span className="radio-indicator"></span>
                    </label>
                  </li>
                  <li className="radio-item">
                    <input
                      type="radio"
                      id="debitCard"
                      value="debitCard"
                      checked={selectedMode === "debitCard"}
                      onChange={handleModeChange}
                      className="radio-input"
                    />
                    <label htmlFor="debitCard" className="radio-label">
                      Debit Card
                      <FaRegCreditCard className="payment-icons" />
                      <span className="radio-indicator"></span>
                    </label>
                  </li>
                  <li className="radio-item">
                    <input
                      type="radio"
                      id="cod"
                      value="cod"
                      checked={selectedMode === "cod"}
                      onChange={handleModeChange}
                      className="radio-input"
                    />
                    <label htmlFor="cod" className="radio-label">
                      Cash on delivery
                      <TbTruckDelivery className="payment-icons" />
                      <span className="radio-indicator"></span>
                    </label>
                  </li>
                  <li className="radio-item">
                    <input
                      type="radio"
                      id="upi"
                      value="upi"
                      checked={selectedMode === "upi"}
                      onChange={handleModeChange}
                      className="radio-input"
                    />
                    <label htmlFor="upi" className="radio-label">
                      UPI
                      <SiPhonepe className="payment-icons" />
                      <span className="radio-indicator"></span>
                    </label>
                  </li>
                </ul>
                {/* <h3>Selected Mode: {selectedMode}</h3> */}

                {selectedMode === "debitCard" && (
                  <div>
                    <h3>Please fill the below debit card details</h3>
                    <input type="text" placeholder="Card Number" />
                    <input type="text" placeholder="Expiration Date" />
                    <input type="password" placeholder="CVV" />
                  </div>
                )}
                {selectedMode === "creditCard" && (
                  <div>
                    <h3>Please fill the below credit card details</h3>
                    <input type="text" placeholder="Card Number" />
                    <input type="text" placeholder="Expiration Date" />
                    <input type="password" placeholder="CVV" />
                  </div>
                )}

                {selectedMode === "upi" && (
                  <div>
                    <h3>please scan the QR code to pay</h3>
                    <div className="qr-image">
                      <img
                        src="https://qrcg-free-editor.qr-code-generator.com/main/assets/images/websiteQRCode_noFrame.png"
                        alt="UPI QR Code"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div> </div>
              <button className="cart-button" onClick={handleOrderPlaceButton}>
                Place order
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
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default CheckoutPage;

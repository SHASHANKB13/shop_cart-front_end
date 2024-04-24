import React from "react";
import "../Styles/Home.css";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import createInvoice from "./CreateInvoice";
import { BsFillGiftFill } from "react-icons/bs";

var user_id = parseInt(localStorage.getItem("user_id"));
var customer_name = localStorage.getItem("username");

function InvoiceDownloadPage() {
  const navigate = useNavigate();

  const handleBackIconClick = (page) => {
    navigate(`${page}`);
  };

  // handle invoice download
  const handleInvoiceDownload = async () => {
    try {
      const response = await fetch(
        `http://localhost:7000/api/shopping/cart/details/${user_id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch product details");
      }
      const responseBody = await response.json();

      // Create the invoice HTML using the imported function
      const invoiceHtml = createInvoice(responseBody, customer_name);

      // Create a Blob from the HTML content
      const blob = new Blob([invoiceHtml], { type: "text/html" });

      // Create a temporary URL for the Blob
      const url = URL.createObjectURL(blob);

      // Create a link element and simulate a click to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.download = `${customer_name}_invoice.html`;
      document.body.appendChild(link);
      link.click();

      // Cleanup: remove the temporary URL and link element
      URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading invoice:", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="buy-background-container">
        <IoArrowBackCircleOutline
          className="back-icon"
          onClick={() => handleBackIconClick("/")}
        />
        <div className="buy-product-details-container">
          <div className="buy-product-details">
            <h1>
              Thank you for shopping. your order has been placed successfully!
            </h1>
            <div className="gift-container">
              <button
                className="invoice-button"
                onClick={handleInvoiceDownload}
              >
                Download Invoice
              </button>
              <BsFillGiftFill className="gift-icon" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default InvoiceDownloadPage;

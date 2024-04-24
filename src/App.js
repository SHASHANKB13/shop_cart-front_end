import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "./components/ProductList";
import ShoppingCart from "./components/ShoppingCart";
import ProductDetails from "./components/ProductDetails";
import LoginModal from "./components/Login";
import BuyProduct from "./components/BuyStepper";
import Checkout from "./components/Checkout";
import InvoiceDownloadPage from "./components/InvoicePage";

const App = () => {
  return (
    <Routes>
      <Route path="/" Component={ProductList} />
      <Route path="/cart" Component={ShoppingCart} />
      <Route path="/product/:id" Component={ProductDetails} />
      <Route path="/login" Component={LoginModal} />
      <Route path="/productCart" Component={BuyProduct} />
      <Route path="/checkout" Component={Checkout} />
      <Route path="/invoicePage" Component={InvoiceDownloadPage} />
    </Routes>
  );
};

export default App;

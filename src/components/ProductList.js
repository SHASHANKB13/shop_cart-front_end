import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "../Styles/Home.css"; // Import CSS file
import { FaRupeeSign } from "react-icons/fa";

const ProductList = () => {
  const navigate = useNavigate();

  const handleCardClick = (productId) => {
    navigate(`/product/${productId}`); // Navigate to a specific product page
  };

  const [data, setData] = useState([]);
  const orginalData = useRef();

  const [jsonData, setJsonData] = useState({
    category: "MOBILE",
    pageNumber: 1,
    pageSize: 10,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:7000/api/shopping/product/list",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(jsonData),
          }
        );
        const responseData = await response.json();
        const data = responseData.data;
        orginalData.current = data;
        console.log(responseData);
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [jsonData]);

  return (
    <>
      <Header
        setData={setData}
        data={data}
        orginalData={orginalData}
        setJsonData={setJsonData}
        jsonData={jsonData}
      />
      <div className="product-list">
        {data.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => handleCardClick(product.id)}
          >
            <div className="card-inner">
              <div className="card-image">
                <img
                  className="product-img"
                  src={product.imageUrl}
                  alt={product.name}
                />
              </div>
              <div className="card-content">
                <div className="card-title">
                  <h3>{product.name}</h3>
                </div>
                <div className="card-subtitle">
                  <h4>
                    <FaRupeeSign />
                    {product.price}
                  </h4>
                </div>
              </div>
              <button>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductList;

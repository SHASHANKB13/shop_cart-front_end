function createInvoice(responseBody, customer_name) {
  const date = new Date().toDateString();
  const invoiceDiv = `
      <style>
        /* CSS styles for the invoice bill */
        .invoice {
          width: 80%;
          margin: 20px auto;
          border: 3px solid #ccc;
          padding: 20px;
        }
        .invoice-header {
          text-align: center;
          margin-bottom: 20px;
        }
        .invoice-header h1 {
          margin: 0;
        }
        .invoice-details {
          margin-bottom: 20px;
        }
        .invoice-details p {
          margin: 5px 0;
        }
        .product {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }
        .product img {
          width: 100px;
          margin-right: 10px;
        }
        .total h3 {
          text-align: right;
        }
      </style>
      <div class="invoice">
        <div class="invoice-header">
          <h1>Invoice</h1>
        </div>
        <div class="invoice-details">
          <p>Invoice Number: #123456</p>
          <p>Date: ${date}</p>
          <p>Customer: ${customer_name}</p>
        </div>
        <div class="products">
          ${responseBody.data
            .map(
              (product) => `
              <div class="product">
                <img src="${product.imageUrl}" alt="${product.name}">
                <div>
                  <h3>${product.name}</h3>
                  <p>Price: ${product.price.toFixed(2)}</p>
                  <p>Quantity: ${product.quantity}</p>
                </div>
              </div>
            `
            )
            .join("")}
        </div>
        <div class="total">
          <h3>Total: ${responseBody.total_price.toFixed(2)}</h3>
        </div>
      </div>
    `;

  return invoiceDiv;
}

module.exports = createInvoice;

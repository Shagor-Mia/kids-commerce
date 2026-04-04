export const orderInvoiceTemplate = ({ user, orderId, items, total }) => {
  return `
    <div style="font-family: Arial; padding: 20px;">
      <h2>🧾 Order Invoice</h2>
      <p>Hello ${user.name},</p>

      <p>Thank you for your order!</p>

      <h3>Order ID: ${orderId}</h3>
        
      <img src="/favicon.ico"/>

      <table border="1" cellspacing="0" cellpadding="8" style="border-collapse: collapse; width: 100%;">
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          ${items
            .map(
              (item) => `
              <tr>
                <td>${item.title}</td>
                <td>${item.quantity}</td>
                <td>$${item.price}</td>
              </tr>
            `,
            )
            .join("")}
        </tbody>
      </table>

      <h3>Total: $${total}</h3>

      <p>We appreciate your business ❤️</p>
    </div>
  `;
};

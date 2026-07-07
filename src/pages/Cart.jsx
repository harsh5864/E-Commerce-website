import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Cart.css";

function Cart({cart, updateQuantity, removeFromCart, clearCart}){
    const [selectedItem, setSelectedItem] = useState(null);
    const checkoutItems = selectedItem ? [selectedItem] : cart;
    const totalPrice = checkoutItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const [customerDetails, setCustomerDetails] = useState({
      fullName: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      postalCode: "",
      note: "",
    });

    const isValidPhoneNumber = (phone) => /^\d{10}$/.test(phone);
    const isValidEmail = (email) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(email);
    const isValidPostalCode = (postalCode) => /^\d{6}$/.test(postalCode);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setCustomerDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handlePlaceOrder = (e) => {
      e.preventDefault();
      const { fullName, phone, email, address, city, postalCode } = customerDetails;

      if (!fullName || !phone || !email || !address || !city || !postalCode) {
        alert("Please fill in all required customer details and address fields.");
        return;
      }

      if (!isValidPhoneNumber(phone)) {
        alert("Please enter a valid phone number.");
        return;
      }

      if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      if (!isValidPostalCode(postalCode)) {
        alert("Please enter a valid postal code.");
        return;
      }

      alert(`Order placed successfully for ${selectedItem ? selectedItem.title : "your selected items"}!`);
      clearCart();
      setCustomerDetails({
        fullName: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        postalCode: "",
        note: "",
      });
      setSelectedItem(null);
    };

    if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <p className="eyebrow">Cart</p>
        <h2>Your cart is empty</h2>
        <Link to="/">Go Shopping</Link>
      </div>
    );
  }
    return(
       <div className="cart-container">
      <p className="eyebrow">Order receipt</p>
      <h1>Shopping Cart</h1>
      {selectedItem && (
        <div className="buy-now-banner">
          <span>Buying only: <strong>{selectedItem.title}</strong></span>
          <button type="button" className="buy-now-clear" onClick={() => setSelectedItem(null)}>Buy All Cart Items</button>
        </div>
      )}
      <div className="cart-items">
        {checkoutItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} className="cart-item-image" />
            <div className="cart-item-info">
              <h3>{item.title}</h3>
              <p>Rs {item.price}</p>
            </div>
            <div className="quantity-controls">
              <button onClick={() => updateQuantity(item.id, -1)} aria-label="Decrease quantity">-</button>
              <span className="quantity-display">{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, 1)} aria-label="Increase quantity">+</button>
            </div>
            <div className="cart-item-actions">
              <button type="button" className="buy-now-item-button" onClick={() => setSelectedItem(item)}>Buy Now</button>
              <button className="remove-button" onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      <form className="checkout-form" onSubmit={handlePlaceOrder}>
        <h2>Customer Details</h2>
        <div className="form-grid">
          <label>
            Full Name
            <input type="text" name="fullName" value={customerDetails.fullName} onChange={handleChange} required />
          </label>
          <label>
            Phone Number
            <input type="tel" name="phone" value={customerDetails.phone} onChange={handleChange} required inputMode="tel" placeholder="10 digits" />
          </label>
          <label>
            Email Address
            <input type="email" name="email" value={customerDetails.email} onChange={handleChange} required placeholder="name@gmail.com" />
          </label>
          <label>
            Address
            <input type="text" name="address" value={customerDetails.address} onChange={handleChange} required />
          </label>
          <label>
            City
            <input type="text" name="city" value={customerDetails.city} onChange={handleChange} required />
          </label>
          <label>
            Postal Code
            <input type="text" name="postalCode" value={customerDetails.postalCode} onChange={handleChange} required placeholder="6 digits" />
          </label>
        </div>


        <div className="cart-footer">
          <h2 className="cart-total">Total: Rs {totalPrice.toFixed(2)}</h2>
          <button type="submit" className="place-order-button">Place Order</button>
        </div>
      </form>
    </div>
    );
}
export default Cart;

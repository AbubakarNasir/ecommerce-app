import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiCreditCard } from "react-icons/fi";
import { FaPaypal, FaUniversity } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { products } from "../data/products";
import { useStore } from "../context/StoreContext";
import "./checkout.css";

const paymentMethods = [
  { id: "card", label: "Credit / Debit Card", icon: FiCreditCard },
  { id: "paypal", label: "PayPal", icon: FaPaypal },
  { id: "bank", label: "Bank Transfer", icon: FaUniversity },
];

export default function Checkout() {
  const { cart, clearCart } = useStore();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const [payment, setPayment] = useState("card");

  const items = cart
    .map(({ id, qty }) => {
      const product = products.find((p) => p.id === id);
      return product ? { ...product, qty } : null;
    })
    .filter(Boolean);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = items.length === 0 ? 0 : subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const orderId = `#SN${Math.floor(10000 + Math.random() * 90000)}`;
    clearCart();
    navigate("/order-confirmation", {
      state: { orderId, total, items, ...form },
    });
  };

  if (items.length === 0) {
    return (
      <div>
        <Navbar />
        <main className="container checkout-page empty-checkout">
          <h1>Your cart is empty</h1>
          <p>Add some products before checking out.</p>
          <Link to="/shop" className="btn btn-primary">
            Browse Products
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <main className="container checkout-page">
        <h1>Checkout</h1>

        <form className="checkout-layout" onSubmit={handlePlaceOrder}>
          <div className="checkout-form">
            <section className="form-section">
              <h2>Shipping Information</h2>

              <div className="form-grid">
                <div className="field full">
                  <label>Full Name</label>
                  <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="John Doe" required />
                </div>

                <div className="field full">
                  <label>Email Address</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="john@example.com" required />
                </div>

                <div className="field full">
                  <label>Phone Number</label>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="+234 812 345 6789" required />
                </div>

                <div className="field full">
                  <label>Delivery Address</label>
                  <input name="address" value={form.address} onChange={handleChange} placeholder="Street address, apt, etc." required />
                </div>

                <div className="field">
                  <label>City</label>
                  <input name="city" value={form.city} onChange={handleChange} placeholder="Lagos" required />
                </div>

                <div className="field">
                  <label>State</label>
                  <input name="state" value={form.state} onChange={handleChange} placeholder="Lagos" required />
                </div>

                <div className="field">
                  <label>Zip Code</label>
                  <input name="zip" value={form.zip} onChange={handleChange} placeholder="100001" required />
                </div>
              </div>
            </section>

            <section className="form-section">
              <h2>Payment Method</h2>
              <div className="payment-options">
                {paymentMethods.map(({ id, label, icon: Icon }) => (
                  <label key={id} className={`payment-option ${payment === id ? "active" : ""}`}>
                    <input
                      type="radio"
                      name="payment"
                      value={id}
                      checked={payment === id}
                      onChange={() => setPayment(id)}
                    />
                    <Icon />
                    {label}
                  </label>
                ))}
              </div>
            </section>
          </div>

          <aside className="order-summary">
            <h2>Order Summary</h2>

            <div className="summary-items">
              {items.map((item) => (
                <div key={item.id} className="summary-item">
                  <img src={item.image} alt={item.name} />
                  <div className="summary-item-info">
                    <span>{item.name}</span>
                    <span className="summary-item-qty">Qty: {item.qty}</span>
                  </div>
                  <span className="summary-item-price">${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="summary-row total-row">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button type="submit" className="btn btn-primary place-order-btn">
              Place Order
            </button>
          </aside>
        </form>
      </main>

      <Footer />
    </div>
  );
}
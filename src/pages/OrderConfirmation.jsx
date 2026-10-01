import { Link, useLocation, Navigate } from "react-router-dom";
import { FiCheck, FiMail, FiPackage, FiTruck } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./orderConfirmation.css";

const steps = [
  { icon: FiMail, title: "Order confirmed", text: "You'll receive an email shortly." },
  { icon: FiPackage, title: "Processing", text: "We'll prepare your items for shipment." },
  { icon: FiTruck, title: "Shipping", text: "You'll get a tracking number when it ships." },
];

export default function OrderConfirmation() {
  const { state } = useLocation();

  if (!state) {
    return <Navigate to="/" replace />;
  }

  const { orderId, total, items = [] } = state;
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      <Navbar />

      <main className="container confirmation-page">
        <div className="confirmation-card">
          <div className="check-circle">
            <FiCheck />
          </div>

          <h1>Order Placed!</h1>
          <p className="confirm-sub">
            Thank you for your purchase. Your order has been successfully placed and is being processed.
          </p>

          <div className="order-meta">
            <span>Order {orderId}</span>
            <span>Placed on {today}</span>
          </div>

          <div className="confirm-actions">
            <Link to="/account/orders" className="btn btn-primary">
              View Order Details
            </Link>
            <Link to="/shop" className="btn btn-outline">
              Continue Shopping
            </Link>
          </div>
        </div>

        <section className="whats-next">
          <h2>What happens next?</h2>
          <div className="steps-list">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <div key={title} className="next-step">
                <div className="step-number">
                  <Icon />
                </div>
                <div>
                  <strong>{i + 1}. {title}</strong>
                  <span>{text}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {items.length > 0 && (
          <section className="ordered-items">
            <h2>Order Summary</h2>
            <div className="ordered-list">
              {items.map((item) => (
                <div key={item.id} className="ordered-item">
                  <img src={item.image} alt={item.name} />
                  <div className="ordered-item-info">
                    <span>{item.name}</span>
                    <span className="ordered-item-qty">Qty: {item.qty}</span>
                  </div>
                  <span className="ordered-item-price">${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="ordered-total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
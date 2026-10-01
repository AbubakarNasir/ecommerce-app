import { Link } from "react-router-dom";
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { products } from "../data/products";
import { useStore } from "../context/StoreContext";
import "./cart.css";

export default function Cart() {
  const { cart, updateQty, removeFromCart } = useStore();

  const items = cart
    .map(({ id, qty }) => {
      const product = products.find((p) => p.id === id);
      return product ? { ...product, qty } : null;
    })
    .filter(Boolean);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = items.length === 0 ? 0 : subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div>
        <Navbar />
        <main className="container cart-page empty-cart">
          <FiShoppingBag className="empty-icon" />
          <h1>Your cart is empty</h1>
          <p>Looks like you haven't added anything yet.</p>
          <Link to="/shop" className="btn btn-primary">
            Start Shopping
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <main className="container cart-page">
        <div className="cart-head">
          <h1>Your Cart ({items.length} {items.length === 1 ? "item" : "items"})</h1>
          <Link to="/shop" className="continue-link">
            Continue Shopping
          </Link>
        </div>

        <div className="cart-layout">
          <div className="cart-table">
            <div className="cart-table-head">
              <span>Product</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Total</span>
              <span></span>
            </div>

            {items.map((item) => (
              <div key={item.id} className="cart-row">
                <div className="cart-product">
                  <img src={item.image} alt={item.name} />
                  <Link to={`/product/${item.id}`}>{item.name}</Link>
                </div>

                <span className="cart-price">${item.price.toFixed(2)}</span>

                <div className="qty-control">
                  <button onClick={() => updateQty(item.id, item.qty - 1)} aria-label="Decrease quantity">
                    <FiMinus />
                  </button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)} aria-label="Increase quantity">
                    <FiPlus />
                  </button>
                </div>

                <span className="cart-total">${(item.price * item.qty).toFixed(2)}</span>

                <button className="remove-btn" onClick={() => removeFromCart(item.id)} aria-label="Remove item">
                  <FiTrash2 />
                </button>
              </div>
            ))}
          </div>

          <aside className="order-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>
            {shipping > 0 && (
              <p className="shipping-note">Free shipping on orders over $50</p>
            )}

            <div className="summary-row total-row">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <Link to="/checkout" className="btn btn-primary checkout-btn">
              Proceed to Checkout
            </Link>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
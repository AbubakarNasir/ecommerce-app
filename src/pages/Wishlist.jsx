import { Link } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiTrash2 } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { products } from "../data/products";
import { useStore } from "../context/StoreContext";
import "./wishlist.css";

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart } = useStore();

  const items = wishlist
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  if (items.length === 0) {
    return (
      <div>
        <Navbar />
        <main className="container wishlist-page empty-wishlist">
          <FiHeart className="empty-icon" />
          <h1>Your wishlist is empty</h1>
          <p>Save items you love and find them here later.</p>
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

      <main className="container wishlist-page">
        <div className="wishlist-head">
          <h1>My Wishlist ({items.length})</h1>
          <Link to="/shop" className="continue-link">
            Continue Shopping
          </Link>
        </div>

        <div className="wishlist-grid">
          {items.map((item) => (
            <article key={item.id} className="wishlist-card">
              <Link to={`/product/${item.id}`}>
                <img src={item.image} alt={item.name} />
              </Link>
              <Link to={`/product/${item.id}`} className="wishlist-name">
                {item.name}
              </Link>
              <p className="wishlist-price">${item.price.toFixed(2)}</p>
              <p className="wishlist-rating">
                ★ {item.rating} ({item.reviews})
              </p>

              <div className="wishlist-actions">
                <button className="btn btn-primary" onClick={() => addToCart(item.id)}>
                  <FiShoppingCart /> Add to Cart
                </button>
                <button
                  className="remove-btn"
                  onClick={() => toggleWishlist(item.id)}
                  aria-label="Remove from wishlist"
                >
                  <FiTrash2 />
                </button>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
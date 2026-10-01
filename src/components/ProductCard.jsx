import { Link } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiStar } from "react-icons/fi";
import { useStore } from "../context/StoreContext";
import "./productCard.css";

export default function ProductCard({ product }) {
  const { id, name, price, rating, reviews, image } = product;
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const wishlisted = isWishlisted(id);

  return (
    <article className="product-card">
      <div className="product-image">
        <Link to={`/product/${id}`}>
          <img src={image} alt={name} />
        </Link>
        <button
          className={`wishlist-btn ${wishlisted ? "active" : ""}`}
          onClick={() => toggleWishlist(id)}
          aria-label="Toggle wishlist"
        >
          <FiHeart />
        </button>
      </div>

      <Link to={`/product/${id}`} className="product-name">
        {name}
      </Link>
      <p className="product-price">${price.toFixed(2)}</p>
      <p className="product-rating">
        <FiStar className="star" /> {rating} ({reviews})
      </p>

      <button className="btn btn-primary add-btn" onClick={() => addToCart(id)}>
        <FiShoppingCart /> Add to Cart
      </button>
    </article>
  );
}
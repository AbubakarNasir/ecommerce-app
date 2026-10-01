import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiStar, FiMinus, FiPlus, FiCheck } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import { productDetails, defaultDetail } from "../data/productDetails";
import { useStore } from "../context/StoreContext";
import "./productDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const details = productDetails[id] || defaultDetail;

  const [activeImage, setActiveImage] = useState(0);
  const [activeColor, setActiveColor] = useState(0);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("description");

  const { addToCart, toggleWishlist, isWishlisted } = useStore();

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImage(0);
    setActiveColor(0);
    setQty(1);
  }, [id]);

  if (!product) {
    return (
      <div>
        <Navbar />
        <main className="container detail not-found">
          <h1>Product not found</h1>
          <Link to="/shop" className="btn btn-primary">
            Back to Shop
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const gallery = details.gallery.length > 0 ? details.gallery : [product.image];
  const related = products.filter((p) => p.category === product.category && p.id !== id).slice(0, 4);
  const wishlisted = isWishlisted(id);

  return (
    <div>
      <Navbar />

      <main className="container detail">
        <p className="breadcrumb">{product.category}</p>

        <div className="detail-top">
          <div className="gallery">
            <div className="thumbs">
              {gallery.map((img, i) => (
                <button
                  key={img}
                  className={`thumb ${activeImage === i ? "active" : ""}`}
                  onClick={() => setActiveImage(i)}
                >
                  <img src={img} alt={`${product.name} ${i + 1}`} />
                </button>
              ))}
            </div>
            <div className="main-image">
              <img src={gallery[activeImage]} alt={product.name} />
            </div>
          </div>

          <div className="detail-info">
            <h1>{product.name}</h1>
            <p className="price">${product.price.toFixed(2)}</p>
            <p className="rating">
              <FiStar className="star" /> {product.rating} ({product.reviews} reviews)
            </p>

            <p className="detail-desc">{details.description}</p>

            {details.colors.length > 0 && (
              <div className="color-picker">
                <span>Color</span>
                <div className="colors">
                  {details.colors.map((c, i) => (
                    <button
                      key={c}
                      className={`color-dot ${activeColor === i ? "active" : ""}`}
                      style={{ background: c }}
                      onClick={() => setActiveColor(i)}
                      aria-label={`Color ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}

            <p className="stock">
              <FiCheck /> In Stock
            </p>

            <div className="purchase-row">
              <div className="qty-control">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
                  <FiMinus />
                </button>
                <span>{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity">
                  <FiPlus />
                </button>
              </div>
              <button className="btn btn-primary" onClick={() => addToCart(id, qty)}>
                <FiShoppingCart /> Add to Cart
              </button>
            </div>

            <button
              className={`wishlist-link ${wishlisted ? "active" : ""}`}
              onClick={() => toggleWishlist(id)}
            >
              <FiHeart /> {wishlisted ? "Added to Wishlist" : "Add to Wishlist"}
            </button>
          </div>
        </div>

        <section className="tabs-section">
          <div className="tabs">
            <button className={tab === "description" ? "active" : ""} onClick={() => setTab("description")}>
              Description
            </button>
            <button className={tab === "specifications" ? "active" : ""} onClick={() => setTab("specifications")}>
              Specifications
            </button>
            <button className={tab === "reviews" ? "active" : ""} onClick={() => setTab("reviews")}>
              Reviews
            </button>
          </div>

          <div className="tab-content">
            {tab === "description" && (
              <ul className="feature-list">
                {details.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            )}

            {tab === "specifications" && (
              <table className="spec-table">
                <tbody>
                  {details.specifications.map(({ label, value }) => (
                    <tr key={label}>
                      <td>{label}</td>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {tab === "reviews" && (
              <p className="no-reviews">No written reviews yet — {product.reviews} ratings so far.</p>
            )}
          </div>
        </section>

        {related.length > 0 && (
          <section className="related">
            <h2>You may also like</h2>
            <div className="product-grid">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
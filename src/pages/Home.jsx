import { Link } from "react-router-dom";
import { FiTruck, FiShield, FiRefreshCw, FiHeadphones, FiArrowRight } from "react-icons/fi";
import { FiCamera, FiFeather, FiHome, FiWatch } from "react-icons/fi";
import { GiRunningShoe } from "react-icons/gi";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { products, categories } from "../data/products";
import "./home.css";

const perks = [
  { icon: FiTruck, title: "Free Shipping", sub: "On orders over $50" },
  { icon: FiShield, title: "Secure Payments", sub: "100% secure checkout" },
  { icon: FiRefreshCw, title: "Easy Returns", sub: "Hassle free returns" },
  { icon: FiHeadphones, title: "24/7 Support", sub: "We're here to help" },
];

const categoryIcons = {
  Electronics: FiCamera,
  Fashion: FiFeather,
  "Home & Living": FiHome,
  Beauty: FiWatch,
  Sports: GiRunningShoe,
};

export default function Home() {
  const featured = products.slice(0, 4);
  const shopCategories = categories.filter((c) => c.name !== "All Products");

  return (
    <div>
      <Navbar />

      <section className="container hero">
        <div className="hero-banner">
          <div className="hero-text">
            <h1>
              Better Products
              <br />
              For a Brighter You
            </h1>
            <p>Discover quality products, unbeatable prices and a seamless shopping experience.</p>
            <Link to="/shop" className="btn btn-primary">
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      <section className="container perks">
        {perks.map(({ icon: Icon, title, sub }) => (
          <div key={title} className="perk">
            <Icon />
            <div>
              <strong>{title}</strong>
              <span>{sub}</span>
            </div>
          </div>
        ))}
      </section>

      <section className="container shop-by-category">
        <div className="section-head">
          <h2>Shop by Category</h2>
          <Link to="/categories" className="view-all">
            View all <FiArrowRight />
          </Link>
        </div>
        <div className="category-grid">
          {shopCategories.map(({ name, count }) => {
            const Icon = categoryIcons[name] || FiFeather;
            return (
              <Link key={name} to={`/shop?category=${encodeURIComponent(name)}`} className="category-card">
                <Icon />
                <strong>{name}</strong>
                <span>{count}+ products</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="container featured-products">
        <div className="section-head">
          <h2>Featured Products</h2>
          <Link to="/shop" className="view-all">
            View all <FiArrowRight />
          </Link>
        </div>
        <div className="product-grid">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
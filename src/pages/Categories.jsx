import { Link } from "react-router-dom";
import { FiCamera, FiFeather, FiHome, FiWatch, FiArrowRight } from "react-icons/fi";
import { GiRunningShoe } from "react-icons/gi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { categories } from "../data/products";
import "./categories.css";

const categoryIcons = {
  Electronics: FiCamera,
  Fashion: FiFeather,
  "Home & Living": FiHome,
  Beauty: FiWatch,
  Sports: GiRunningShoe,
};

const bannerImages = {
  Electronics: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&q=80",
  Fashion: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80",
  "Home & Living": "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80",
  Beauty: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80",
  Sports: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80",
};

export default function Categories() {
  const shopCategories = categories.filter((c) => c.name !== "All Products");

  return (
    <div>
      <Navbar />

      <main className="container categories-page">
        <h1>Shop by Category</h1>
        <p className="categories-sub">Browse our full range of categories and find what you need.</p>

        <div className="categories-grid">
          {shopCategories.map(({ name, count }) => {
            const Icon = categoryIcons[name] || FiFeather;
            return (
              <Link
                key={name}
                to={`/category/${encodeURIComponent(name)}`}
                className="category-tile"
                style={{ backgroundImage: `url(${bannerImages[name]})` }}
              >
                <div className="tile-overlay">
                  <Icon className="tile-icon" />
                  <strong>{name}</strong>
                  <span>{count}+ products</span>
                  <span className="tile-link">
                    Browse <FiArrowRight />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
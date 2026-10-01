import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { products, categories } from "../data/products";
import "./categoryPage.css";

const priceRanges = [
  { label: "Under $25", test: (p) => p.price < 25 },
  { label: "$25 - $50", test: (p) => p.price >= 25 && p.price <= 50 },
  { label: "$50 - $100", test: (p) => p.price > 50 && p.price <= 100 },
  { label: "$100 - $200", test: (p) => p.price > 100 && p.price <= 200 },
  { label: "Over $200", test: (p) => p.price > 200 },
];

const bannerImages = {
  Electronics: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&q=80",
  Fashion: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&q=80",
  "Home & Living": "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80",
  Beauty: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&q=80",
  Sports: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&q=80",
};

export default function CategoryPage() {
  const { name } = useParams();
  const currentCategory = decodeURIComponent(name || "Fashion");

  const [selectedPrices, setSelectedPrices] = useState([]);
  const [sort, setSort] = useState("featured");

  const togglePrice = (label) => {
    setSelectedPrices((prev) =>
      prev.includes(label) ? prev.filter((p) => p !== label) : [...prev, label]
    );
  };

  const categoryProducts = useMemo(() => {
    let list = products.filter((p) => p.category === currentCategory);

    if (selectedPrices.length > 0) {
      const ranges = priceRanges.filter((r) => selectedPrices.includes(r.label));
      list = list.filter((p) => ranges.some((r) => r.test(p)));
    }

    const sorted = [...list];
    if (sort === "price-low") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-high") sorted.sort((a, b) => b.price - a.price);
    if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);

    return sorted;
  }, [currentCategory, selectedPrices, sort]);

  const banner = bannerImages[currentCategory] || bannerImages.Fashion;
  const otherCategories = categories.filter((c) => c.name !== "All Products");

  return (
    <div>
      <Navbar />

      <section className="container category-banner" style={{ backgroundImage: `url(${banner})` }}>
        <div className="banner-overlay">
          <h1>{currentCategory}</h1>
          <p>Style meets comfort. Find your perfect look for every occasion.</p>
        </div>
      </section>

      <main className="container category-page">
        <div className="category-layout">
          <aside className="category-sidebar">
            <div className="filter-group">
              <h3>Categories</h3>
              <ul>
                {otherCategories.map(({ name: cat, count }) => (
                  <li key={cat}>
                    <Link
                      to={`/category/${encodeURIComponent(cat)}`}
                      className={currentCategory === cat ? "active" : ""}
                    >
                      {cat} <span>{count}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="filter-group">
              <h3>Price Range</h3>
              <ul className="checkbox-list">
                {priceRanges.map(({ label }) => (
                  <li key={label}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedPrices.includes(label)}
                        onChange={() => togglePrice(label)}
                      />
                      {label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <section className="category-results">
            <div className="results-head">
              <span>{categoryProducts.length} products</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            {categoryProducts.length > 0 ? (
              <div className="product-grid">
                {categoryProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <p className="no-results">No products in this category yet.</p>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { products, categories } from "../data/products";
import "./shop.css";

const priceRanges = [
  { label: "Under $25", test: (p) => p.price < 25 },
  { label: "$25 - $50", test: (p) => p.price >= 25 && p.price <= 50 },
  { label: "$50 - $100", test: (p) => p.price > 50 && p.price <= 100 },
  { label: "$100 - $200", test: (p) => p.price > 100 && p.price <= 200 },
  { label: "Over $200", test: (p) => p.price > 200 },
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "All Products";

  const [selectedPrices, setSelectedPrices] = useState([]);
  const [sort, setSort] = useState("featured");

  const togglePrice = (label) => {
    setSelectedPrices((prev) =>
      prev.includes(label) ? prev.filter((p) => p !== label) : [...prev, label]
    );
  };

  const setCategory = (name) => {
    if (name === "All Products") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", name);
    }
    setSearchParams(searchParams);
  };

  const filtered = useMemo(() => {
    let list = products;

    if (activeCategory !== "All Products") {
      list = list.filter((p) => p.category === activeCategory);
    }

    if (selectedPrices.length > 0) {
      const ranges = priceRanges.filter((r) => selectedPrices.includes(r.label));
      list = list.filter((p) => ranges.some((r) => r.test(p)));
    }

    const sorted = [...list];
    if (sort === "price-low") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-high") sorted.sort((a, b) => b.price - a.price);
    if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);

    return sorted;
  }, [activeCategory, selectedPrices, sort]);

  return (
    <div>
      <Navbar />

      <main className="container shop-page">
        <h1>All Products</h1>
        <p className="shop-sub">Discover our wide range of products tailored for you.</p>

        <div className="shop-layout">
          <aside className="shop-sidebar">
            <div className="filter-group">
              <h3>Categories</h3>
              <ul>
                {categories.map(({ name, count }) => (
                  <li key={name}>
                    <button
                      className={activeCategory === name ? "active" : ""}
                      onClick={() => setCategory(name)}
                    >
                      {name} <span>{count}</span>
                    </button>
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

          <section className="shop-results">
            <div className="results-head">
              <span>{filtered.length} products</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            {filtered.length > 0 ? (
              <div className="product-grid">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <p className="no-results">No products match these filters.</p>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
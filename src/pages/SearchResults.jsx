import { useMemo, useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { products, categories } from "../data/products";
import "./searchResults.css";

const priceRanges = [
  { label: "Under $25", test: (p) => p.price < 25 },
  { label: "$25 - $50", test: (p) => p.price >= 25 && p.price <= 50 },
  { label: "$50 - $100", test: (p) => p.price > 50 && p.price <= 100 },
  { label: "$100 - $200", test: (p) => p.price > 100 && p.price <= 200 },
  { label: "Over $200", test: (p) => p.price > 200 },
];

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [inputValue, setInputValue] = useState(query);
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [sort, setSort] = useState("relevance");

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  const togglePrice = (label) => {
    setSelectedPrices((prev) =>
      prev.includes(label) ? prev.filter((p) => p !== label) : [...prev, label]
    );
  };

  const matched = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = q ? products.filter((p) => p.name.toLowerCase().includes(q)) : [];

    if (activeCategory !== "All Categories") {
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
  }, [query, activeCategory, selectedPrices, sort]);

  // Category counts scoped to the current search term, not the whole catalog
  const searchCategories = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = q ? products.filter((p) => p.name.toLowerCase().includes(q)) : [];
    return [
      { name: "All Categories", count: base.length },
      ...categories
        .filter((c) => c.name !== "All Products")
        .map((c) => ({
          name: c.name,
          count: base.filter((p) => p.category === c.name).length,
        })),
    ];
  }, [query]);

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputValue.trim()) navigate(`/search?q=${encodeURIComponent(inputValue.trim())}`);
  };

  return (
    <div>
      <Navbar />

      <main className="container search-page">
        <form className="search-bar" onSubmit={handleSearch}>
          <FiSearch />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search products..."
          />
          <button type="submit">Search</button>
        </form>

        <h1>Search results for "{query}"</h1>
        <p className="results-count">{matched.length} results</p>

        <div className="search-layout">
          <aside className="search-sidebar">
            <div className="filter-group">
              <h3>Categories</h3>
              <ul>
                {searchCategories.map(({ name, count }) => (
                  <li key={name}>
                    <button
                      className={activeCategory === name ? "active" : ""}
                      onClick={() => setActiveCategory(name)}
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

            <div className="filter-group">
              <h3>Sort By</h3>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </aside>

          <section className="search-results">
            {!query ? (
              <p className="no-results">Type something in the search bar to see results.</p>
            ) : matched.length > 0 ? (
              <div className="product-grid">
                {matched.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <p className="no-results">No products match "{query}".</p>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiSearch, FiShoppingCart, FiHeart, FiUser, FiMenu, FiX } from "react-icons/fi";
import { useStore } from "../context/StoreContext";
import "./navbar.css";

const links = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Categories", to: "/categories" },
  { label: "Wishlist", to: "/wishlist" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { cartCount, wishlistCount } = useStore();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="logo">
          ShopNest
        </Link>

        <ul className={`nav-links ${open ? "open" : ""}`}>
          {links.map(({ label, to }) => (
            <li key={to}>
              <Link to={to} className={pathname === to ? "active" : ""} onClick={() => setOpen(false)}>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <form className="nav-search" onSubmit={handleSearch}>
          <FiSearch />
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>

        <div className="nav-icons">
          <Link to="/wishlist" className="icon-btn">
            <FiHeart />
            {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
          </Link>
          <Link to="/cart" className="icon-btn">
            <FiShoppingCart />
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </Link>
          <Link to="/account" className="icon-btn">
            <FiUser />
          </Link>
        </div>

        <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>
    </header>
  );
}
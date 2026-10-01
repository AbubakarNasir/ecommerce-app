import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import SearchResults from "./pages/SearchResults";
import Categories from "./pages/Categories";
import CategoryPage from "./pages/CategoryPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:name" element={<CategoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}
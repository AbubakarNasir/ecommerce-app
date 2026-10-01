export const products = [
  { id: "wireless-headphones", name: "Wireless Headphones", price: 79.99, rating: 4.5, reviews: 120, category: "Electronics", image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&q=80", inStock: true },
  { id: "smart-watch", name: "Smart Watch", price: 149.99, rating: 4.7, reviews: 98, category: "Electronics", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80", inStock: true },
  { id: "backpack", name: "Backpack", price: 59.99, rating: 4.6, reviews: 76, category: "Fashion", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80", inStock: true },
  { id: "sneakers", name: "Sneakers", price: 88.99, rating: 4.3, reviews: 64, category: "Fashion", image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500&q=80", inStock: true },
  { id: "sunglasses", name: "Sunglasses", price: 35.99, rating: 4.4, reviews: 52, category: "Fashion", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80", inStock: true },
  { id: "t-shirt", name: "T-Shirt", price: 26.99, rating: 4.2, reviews: 36, category: "Fashion", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80", inStock: true },
  { id: "running-shoes", name: "Running Shoes", price: 74.99, rating: 4.6, reviews: 71, category: "Sports", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80", inStock: true },
  { id: "water-bottle", name: "Water Bottle", price: 18.99, rating: 4.1, reviews: 44, category: "Sports", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80", inStock: true },
  { id: "laptop-bag", name: "Laptop Bag", price: 60.99, rating: 4.5, reviews: 59, category: "Fashion", image: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=500&q=80", inStock: true },
  { id: "gaming-headset", name: "Gaming Headset", price: 59.99, rating: 4.4, reviews: 86, category: "Electronics", image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=500&q=80", inStock: true },
  { id: "earbuds", name: "Earbuds", price: 49.99, rating: 4.2, reviews: 64, category: "Electronics", image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&q=80", inStock: true },
  { id: "noise-cancelling-headphones", name: "Noise Cancelling Headphones", price: 129.99, rating: 4.7, reviews: 52, category: "Electronics", image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&q=80", inStock: true },
];

export const categories = [
  { name: "All Products", count: products.length },
  { name: "Electronics", count: products.filter((p) => p.category === "Electronics").length },
  { name: "Fashion", count: products.filter((p) => p.category === "Fashion").length },
  { name: "Home & Living", count: 18 },
  { name: "Beauty", count: 10 },
  { name: "Sports", count: products.filter((p) => p.category === "Sports").length },
];
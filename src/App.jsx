import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/navbar';
import ProductGrid from './components/productgrid';
import Cart from './pages/cart';
import CreateAccount from './pages/createaccount';
import Login from './pages/login';
import Checkout from './pages/checkout';
import Footer from './pages/footer';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [resultCount, setResultCount] = useState(null);

  const products = [
    { id: 1, title: "Men's Shoes Collection", price: 100, image: '/oxford.jpg' },
    { id: 2, title: "Men's Casual Shirts Collection", price: 100, image: '/casual.png' },
    { id: 3, title: "Men's Jeans Collection", price: 100, image: '/jeans.jpeg' },
    { id: 4, title: "Men's Leather Jackets", price: 200, image: '/leather.jpeg' },
    { id: 5, title: "Men's Watches", price: 150, image: '/watch.png' },
    { id: 6, title: "Men's Hats", price: 50, image: '/men hat.jpg' },
  ];

  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
    setSnackbarOpen(true);
  };

  const removeFromCart = (index) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const handleSearchResults = (results) => {
    setFilteredProducts(results);
    setResultCount(results.length);
  };

  const resetSearch = () => {
    setFilteredProducts([]);
    setResultCount(null);
  };

  const SlideTransition = (props) => <Slide {...props} direction="up" />;

  return (
    <Router>
      <Navbar
        cartItems={cartItems}
        products={products}
        onSearchResults={handleSearchResults}
        resetSearch={resetSearch}
      />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div style={{ padding: '16px', fontSize: '16px' }}>
                {resultCount !== null
                  ? `${resultCount} ${resultCount === 1 ? 'Result' : 'Results'}`
                  : ''}
              </div>
              <ProductGrid
                products={filteredProducts.length > 0 ? filteredProducts : products}
                addToCart={addToCart}
              />
            </>
          }
        />
        <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />} />
        <Route
          path="/createaccount"
          element={<CreateAccount />}
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/checkout"
          element={<Checkout cartItems={cartItems} />}
        />
      </Routes>
      <Footer />
      <Snackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message="Item added to cart!"
        autoHideDuration={3000}
        TransitionComponent={SlideTransition}
      />
    </Router>
  );
}

export default App;

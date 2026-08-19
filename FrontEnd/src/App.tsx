import "./App.css";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./auth/Login";
import Register from "./auth/Register";

import Layout from "./Layout/Layout";
import Home from "./pages/Home";
import Category from "./pages/Category";
import CategoryProducts from "./pages/CategoryProducts";
import Products from "./pages/Products";
import ProductsDetails from "./pages/ProductsDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";

import AuthRoute from "./routes/AuthRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import Wishlist from "./pages/Wishlist";
import { useEffect } from "react";
import { useAppDispatch } from "./store/hooks";
import { loadCartFromAPI } from "./store/slices/cartSlice";
import Profile from "./pages/Profile";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadCartFromAPI());
  }, [dispatch]);

  return (
    <ErrorBoundary>
      <Router>
        
        <Toaster position="top-right" reverseOrder={false} />

        <Routes>
          {/* Public + Layout Routes */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/category" element={<Category />} />
            <Route
              path="/category/:categoryName"
              element={<CategoryProducts />}
            />
            <Route path="/product" element={<Products />} />
            <Route path="/product/:id" element={<ProductsDetails />} />
            <Route path="/cart" element={<Cart />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route
                path="/order-success/:orderId"
                element={<OrderSuccess />}
              />
              <Route path="/order" element={<Orders />} />
              <Route path="/order/:orderId" element={<OrderDetails />} />
              <Route path="/wishlist" element={<Wishlist />} />
            </Route>
          </Route>

          {/* Auth Routes */}
          <Route element={<AuthRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;

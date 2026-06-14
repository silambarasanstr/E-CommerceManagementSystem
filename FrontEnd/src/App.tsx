import "./App.css";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./Layout/Layout";
// import NotFound from "./pages/NotFound";
// import PrivateRoute from "./component/PrivateRoute";
import Products from "./pages/Products";
import Home from "./pages/Home";
// import Category from "./pages/Category";
// import Cart from "./pages/Cart";
// import Register from "./pages/Register";
import Category from "./pages/Category";
// import Wishlist from "./pages/Wishlist";
// import Checkout from "./pages/Checkout";
// import OrderSuccess from "./pages/OrderSuccess";
// import Orders from "./pages/Orders";
// import OrderDetails from "./pages/OrderDetails";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <div>
        <ErrorBoundary>
          <Toaster position="top-right" reverseOrder={false} />
          <Router>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/category" element={<Category />} />
                <Route path="/product" element={<Products />} />
                {/* <Route path="/product/:id" element={<Products />} /> */}
                {/* <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/orders/:orderId" element={<OrderDetails />} /> */}
                {/* <Route
                  path="/order-success/:orderId"
                  element={<OrderSuccess />}
                /> */}

                {/* <Route
                  path="/cart"
                  element={
                    <PrivateRoute>
                      <Cart />
                    </PrivateRoute>
                  }
                /> */}
                {/* <Route path="*" element={<NotFound />} /> */}
              </Route>
              {/* <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} /> */}
            </Routes>
          </Router>
        </ErrorBoundary>
      </div>
    </>
  );
}

export default App;

import "./App.css";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Layout from "./Layout/Layout";
import Products from "./pages/Products";
import Home from "./pages/Home";
import Category from "./pages/Category";
import { Toaster } from "react-hot-toast";
import Register from "./auth/Register";
import AuthRoute from "./routes/AuthRoute";

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
              </Route>
              <Route element={<AuthRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>
            </Routes>
          </Router>
        </ErrorBoundary>
      </div>
    </>
  );
}

export default App;

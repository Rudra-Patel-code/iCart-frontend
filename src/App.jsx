import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./Layout/Header";
import ProtectedRoute from "./utils/ProtectedRoute";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useLayoutEffect } from "react";
import Loader from "./utils/Loader";
import { loadData } from "./redux/actions/authActions";
import Dashboard from "./pages/Admin/Dashboard";
import Categories from "./pages/Admin/Categories";
import Users from "./pages/Admin/User/Users";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import { loadCart } from "./redux/actions/cartaction";
import CartPage from "./pages/Cart/CartPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import Shipping from "./pages/shipping/Shipping";
import ConfirmOrder from "./pages/shipping/ConfirmOrder";
import Success from "./pages/shipping/Success";
import NotFound from "./NotFound";

function App() {
  const { loading, isAuth, error, message, user } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [error, message, dispatch]);

  useEffect(() => {
    if (!user) dispatch(loadData());
    if (isAuth) dispatch(loadCart());
  }, [isAuth]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/products" element={<Products />} />

              <Route
                path="/login"
                element={
                  <ProtectedRoute isAllowed={!isAuth} to={"/"}>
                    <Login />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/register"
                element={
                  <ProtectedRoute isAllowed={!isAuth} to={"/"}>
                    <Register />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/cart"
                element={
                  <ProtectedRoute isAllowed={isAuth} to={"/login"}>
                    <CartPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/dashboard/products"
                element={
                  <ProtectedRoute
                    isAllowed={user && user.role === "admin"}
                    to={"/"}
                  >
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/categories"
                element={
                  <ProtectedRoute
                    isAllowed={user && user.role === "admin"}
                    to={"/"}
                  >
                    <Categories />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/dashboard/users"
                element={
                  <ProtectedRoute
                    isAllowed={user && user.role === "admin"}
                    to="/"
                  >
                    <Users />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/products/:id"
                element={
                  <ProtectedRoute isAllowed={true} to={"/products"}>
                    <ProductPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/shipping"
                element={
                  <ProtectedRoute isAllowed={isAuth} to={"/login"}>
                    <Shipping />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/shipping/confirm"
                element={
                  <ProtectedRoute isAllowed={isAuth} to={"/login"}>
                    <ConfirmOrder />
                  </ProtectedRoute>
                }
              />

              <Route path="/shipping/success" element={<Success />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </Router>
        </>
      )}
    </>
  );
}

export default App;

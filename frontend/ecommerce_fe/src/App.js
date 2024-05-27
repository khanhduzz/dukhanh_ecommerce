import "./App.css";
import AdminAllProducts from "./pages/AdminAllProducts";
import AdminAllUsers from "./pages/AdminAllUsers";
import UserSignUp from "./pages/UserSignUp";
import UserSignIn from "./pages/UserSignIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminProductDetail from "./pages/AdminProductDetail.js";
import Home from "./pages/Home.js";
import Error from "./pages/Error.js";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/allproducts" element={<AdminAllProducts />} />
          <Route
            path="/admin/product/:productId"
            element={<AdminProductDetail />}
          />
          <Route path="/admin/allusers" element={<AdminAllUsers />} />
          <Route path="/signin" element={<UserSignIn />} />
          <Route path="/signup" element={<UserSignUp />} />
          <Route path="/error" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

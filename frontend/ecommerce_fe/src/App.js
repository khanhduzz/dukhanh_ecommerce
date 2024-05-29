import "./App.css";
import AdminAllProducts from "./pages/AdminAllProducts";
import AdminAllUsers from "./pages/AdminAllUsers";
import UserSignUp from "./pages/UserSignUp";
import UserSignIn from "./pages/UserSignIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminProductDetail from "./pages/AdminProductDetail.js";
import Home from "./pages/Home.js";
import Error from "./pages/Error.js";
import AdminAddProduct from "./pages/AdminAddProduct.js";
import AdminAddCategory from "./pages/AdminAddCategory.js";
import AdminAllCategories from "./pages/AdminAllCategories.js";
import Admin from "./pages/Admin.js";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route
            path="/admin/product/:productId"
            element={<AdminProductDetail />}
          />
          <Route path="/admin/allproducts" element={<AdminAllProducts />} />
          <Route path="/admin/allcategories" element={<AdminAllCategories />} />
          <Route path="/admin/allusers" element={<AdminAllUsers />} />
          <Route path="/admin/addproduct" element={<AdminAddProduct />} />
          <Route path="/admin/addcategory" element={<AdminAddCategory />} />
          <Route path="/signin" element={<UserSignIn />} />
          <Route path="/signup" element={<UserSignUp />} />
          <Route path="/error" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

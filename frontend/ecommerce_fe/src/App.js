import "./App.css";
import AdminAllProducts from "./pages/AdminAllProducts";
import AdminAllUsers from "./pages/AdminAllUsers";
import UserSignUp from "./pages/UserSignUp";
import UserSignIn from "./pages/UserSignIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminProductDetail from "./pages/AdminProductDetail.js";
import AdminUserDetail from "./pages/AdminUserDetail.js";
import Home from "./pages/Home.js";
import Error from "./pages/Error.js";
import AdminAddProduct from "./pages/AdminAddProduct.js";
import AdminAddUser from "./pages/AdminAddUser.js";
import AdminAddCategory from "./pages/AdminAddCategory.js";
import AdminAllCategories from "./pages/AdminAllCategories.js";
import Admin from "./pages/Admin.js";

import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

const theme = createTheme({
  typography: {
    fontFamily: ["Source Serif 4", "IBM Plex Serif", "Arial", "serif"].join(
      ","
    ),
  },
  components: {
    MuiBox: {
      styleOverrides: {
        root: {
          padding: 0,
          margin: 0,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route
              path="/admin/product/:productId"
              element={<AdminProductDetail />}
            />
            <Route path="/admin/user/:userId" element={<AdminUserDetail />} />
            <Route path="/admin/allproducts" element={<AdminAllProducts />} />
            <Route
              path="/admin/allcategories"
              element={<AdminAllCategories />}
            />
            <Route path="/admin/allusers" element={<AdminAllUsers />} />
            <Route path="/admin/addproduct" element={<AdminAddProduct />} />
            <Route path="/admin/addcategory" element={<AdminAddCategory />} />
            <Route path="/admin/adduser" element={<AdminAddUser />} />
            <Route path="/signin" element={<UserSignIn />} />
            <Route path="/signup" element={<UserSignUp />} />
            <Route path="/error" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;

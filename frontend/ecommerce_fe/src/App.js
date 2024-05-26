import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import BodyWithAdmin from "./components/BodyWithAdmin";
import AdminAllProducts from "./pages/AdminAllProducts";
import AdminAllUsers from "./pages/AdminAllUsers";
import Paging from "./components/Paging";
import UserSignUp from "./pages/UserSignUp";
import UserSignIn from "./pages/UserSignIn";

function App() {
  return (
    <div className="App">
      {/* <Navbar />
      <h1>Administrator</h1>
      <BodyWithAdmin /> */}
      <AdminAllProducts />
      {/* <AdminAllUsers /> */}
      {/* <Paging /> */}
      {/* < UserSignUp /> */}
      {/* <UserSignIn /> */}
    </div>
  );
}

export default App;

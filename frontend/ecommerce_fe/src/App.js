import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import BodyWithAdmin from "./components/BodyWithAdmin";
import AdminAllUsers from "./pages/AdminAllUsers";

function App() {
  return (
    <div className="App">
      {/* <Navbar />
      <h1>Administrator</h1>
      <BodyWithAdmin /> */}
      <AdminAllUsers />
    </div>
  );
}

export default App;

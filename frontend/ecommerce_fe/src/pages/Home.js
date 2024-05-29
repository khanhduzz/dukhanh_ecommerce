import React from "react";
import { useCookies } from "react-cookie";
import Navbar from "../components/Navbar";

const Home = () => {
  const [cookies, setCookie, removeCookie] = useCookies(
    ["token"],
    ["user"],
    ["userId"]
  );

  return (
    <div className="App">
      <Navbar />
      <h1>This is Home</h1>
    </div>
  );
};

export default Home;

import React from "react";
import { useCookies } from "react-cookie";

const Home = () => {
  const [cookies, setCookie, removeCookie] = useCookies(
    ["token"],
    ["user"],
    ["userId"]
  );
  console.log(cookies["user"]);
  return (
    <div>
      <h1>This is Home, hello {cookies["user"]}</h1>
    </div>
  );
};

export default Home;

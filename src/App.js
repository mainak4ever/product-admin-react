import "./App.css";
import Header from "./Header";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Footer from "./Footer";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Products from "./Products";
import Accounts from "./Accounts";
import { useEffect, useState } from "react";
import axios from "axios";
import AddProduct from "./Products/AddProduct";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(
    JSON.parse(localStorage.getItem("isLoggedIn")) || false
  );

  useEffect(() => {
    const storedData = localStorage.getItem("data");

    if (!storedData) {
      axios
        .get("https://reactmusicplayer-ab9e4.firebaseio.com/project-data.json")
        .then((response) => {
          localStorage.setItem("data", JSON.stringify(response.data));
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/accounts" element={<Accounts />} />
              <Route path="/products/addproduct" element={<AddProduct />} />

              <Route
                path="*"
                element={
                  <h1 style={{ textAlign: "center" }}> 404 Page not found </h1>
                }
              />
            </>
          ) : (
            <>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/products" element={<Navigate to="/login" />} />
              <Route path="/accounts" element={<Navigate to="/login" />} />
              <Route
                path="/products/addproduct"
                element={<Navigate to="/login" />}
              />
            </>
          )}
          <Route
            path="/login"
            element={
              <Login isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
            }
          ></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

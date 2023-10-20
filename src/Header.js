import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useMatch } from "react-router-dom";

function Header(props) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoginPage = location.pathname === "/login";
  const menuRef = useRef(null);

  const productsMatch = useMatch("/products/*");

  // const navItems = [
  //   { to: "/", label: "Dashboard", iconClass: "fas fa-tachometer-alt" },
  //   { to: "/products", label: "Products", iconClass: "fas fa-shopping-cart" },
  //   { to: "/accounts", label: "Accounts", iconClass: "far fa-user" },
  // ];
  const navItems = [
    {
      to: "/",
      label: "Dashboard",
      iconClass: "fas fa-tachometer-alt",
      isActive: location.pathname === "/",
    },
    {
      to: "/products",
      label: "Products",
      iconClass: "fas fa-shopping-cart",
      isActive: productsMatch != null,
    },
    {
      to: "/accounts",
      label: "Accounts",
      iconClass: "far fa-user",
      isActive: location.pathname === "/accounts",
    },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on cleanup
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logout = () => {
    localStorage.setItem("isLoggedIn", false);
    props.setLoggedIn(JSON.parse(localStorage.getItem("isLoggedIn")));
  };

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <div className="nav-bar">
        <div className="web-name">
          <Link to="/">
            <h2>PRODUCT ADMIN</h2>
          </Link>
        </div>
        <div
          className={`burger-menu ${isMenuOpen ? "open" : ""}`}
          onClick={handleMenuClick}
          ref={menuRef}
        >
          <i className="fas fa-bars"></i>
        </div>
        <ul
          className={`nav-icon-links ${isMenuOpen ? "open" : ""}`}
          ref={menuRef}
        >
          {navItems.map((item, index) => (
            <Link to={item.to}>
              <li
                className={`nav-item ${item.isActive ? "active" : ""}`}
                key={index}
              >
                <i className={item.iconClass}></i>
                {item.label}
              </li>
            </Link>
          ))}
          <li className="burger-logout">
            {!isLoginPage && (
              <div className="log-out" onClick={logout}>
                Admin, <b>Logout</b>
              </div>
            )}
          </li>
        </ul>
        <div className="nav-logout">
          {!isLoginPage && (
            <div className="log-out" onClick={logout}>
              Admin, <b>Logout</b>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

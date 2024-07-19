import { Link } from "react-router-dom";

import logo from "../assets/logo.svg";

export default function Header(props) {
  function toggleMenu() {
    let menu = document.getElementsByClassName("mobile-menu")[0];
    let hamburger = document.getElementsByClassName("hamburger")[0];

    if (menu.style.display === "block") {
      menu.style.display = "none";
      document.body.style.overflow = "auto";
      hamburger.classList.remove("open");
    } else {
      menu.style.display = "block";
      document.body.style.overflow = "hidden";
      hamburger.classList.add("open");
    }
  }

  return (
    <>
      <header className="desktop-header">
        <Link className="accent-text" to="/">
          Home
        </Link>
        <Link className="accent-text" to="/shop">
          Shop
        </Link>
        <Link to="/">
          <img src={logo} alt="Bizarre Logo" className="header-logo" />
        </Link>

        <Link className="accent-text" to="/about">
          About
        </Link>
        <div>
          <Link className="accent-text" to="/cart">
            Cart
          </Link>
          <span className="circ">{props.cart}</span>
        </div>
      </header>

      <header>
        <div className="mobile-header">
          <Link to="/">
            <img src={logo} alt="Bizarre Logo" className="header-logo" />
          </Link>
          <div className="hamburger" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className="mobile-menu width-full">
          <Link onClick={toggleMenu} className="accent-text" to="/">
            Home
          </Link>
          <Link onClick={toggleMenu} className="accent-text" to="/shop">
            Shop
          </Link>

          <Link onClick={toggleMenu} className="accent-text" to="/about">
            About
          </Link>
          <Link onClick={toggleMenu} className="accent-text" to="/cart">
            Cart
          </Link>
        </div>
      </header>
    </>
  );
}

import { Nav, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { Route, Switch, HashRouter, NavLink, Router } from "react-router-dom";
import Home from "./Home";
import Cart from "./Cart";
import { Link } from "react-scroll";
import { Trans, useTranslation } from "react-i18next";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useState } from "react";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    if (language === "en") {
      toast.info("Set language to English", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
      });
    } else {
      toast.info("La langue a été changée au Français", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
      });
    }
   
  };

  return (
    <div className="top">
      <Navbar
        fixed="top"
        className="nav"
        variant="dark"
        sticky="top"
        expand="md"
      >
        <Navbar.Brand>
          <Link
            activeClass="active"
            class="brand navbarLink"
            to="home"
            smooth={true}
            offset={-70}
            duration={500}
          >
            <img src="https://img.icons8.com/ios-glyphs/35/ffffff/audio-wave--v1.png" />{" "}
            <span className="purple">Beat</span>
            <span className="yellow">wire</span>
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav activeStyle={{ color: "red" }}>
            <Link
              class="navbarLink"
              activeClass="active"
              to="home"
              smooth={true}
              offset={-70}
              duration={500}
            >
              <img src="https://img.icons8.com/material-outlined/30/ffffff/search-more.png" />{" "}
              <Trans i18nKey="exploreNav">Explore</Trans>
            </Link>
            <Link
              class="navbarLink"
              activeClass="active"
              to="cart"
              smooth={true}
              offset={-70}
              duration={500}
            >
              <img src="https://img.icons8.com/material-sharp/30/ffffff/shopping-cart.png" />{" "}
              <Trans i18nKey="cartNav">Cart</Trans>
            </Link>
            <Link
              class="navbarLink"
              activeClass="active"
              to="checkout"
              smooth={true}
              offset={-70}
              duration={500}
            >
              <img src="https://img.icons8.com/ios-glyphs/30/ffffff/bank-card-back-side.png" />{" "}
              <Trans i18nKey="checkoutNav">Checkout</Trans>
            </Link>
          </Nav>
        </Navbar.Collapse>

        <div style={{ float: "right" }}>
          <Tippy content="Switch language to English">
            <button className="translator" onClick={() => changeLanguage("en")}>
              English
            </button>
          </Tippy>

          <Tippy content="Changez la langue au français">
            <button className="translator" onClick={() => changeLanguage("fr")}>
              Français
            </button>
          </Tippy>
        </div>
      </Navbar>

      <div
        className="body"
        style={{ paddingLeft: "50px", paddingRight: "50px" }}
      >
        <Home />
      </div>
    </div>
  );
}

export default App;

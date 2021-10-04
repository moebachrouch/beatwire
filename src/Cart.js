import { Grid, List, ListItem } from "@material-ui/core";
import Header from "./Header";
import BeatInCart from "./BeatInCart";
import Checkout from "./Checkout";
import { Trans, useTranslation } from "react-i18next";
import React from "react";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const Cart = ({ cart, removeBeatFromCart, clearCart }) => {
  const totalCartPrice = (cart) => {
    return cart.reduce((a, { price }) => a + price, 0);
  };

  const removeBeat = (beat) => {
    removeBeatFromCart(beat);
  };

  const handleClearCartCheckout = () => {
    clearCart();
    if (cart.length === 0) {
      toast.error("Cart is empty", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
      });
    } else {
      toast.error("Cleared cart", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
      });
    }
  };

  return (
    <div id="cart">
      <div style={{ paddingLeft: "50px", paddingRight: "50px" }}>
        <Header
          first="cart"
          second="beatsCap"
          title="cartTitle"
          imgSrc="https://img.icons8.com/material-sharp/40/ffffff/shopping-cart.png"
        />
      </div>

      <div>
        <Grid
          style={{ paddingBottom: "40px" }}
          container
          spacing={3}
          alignItems="center"
          justify="center"
        >
          {cart.map((beat) => (
            <Grid item>
              <BeatInCart removeBeat={removeBeat} beat={beat} />
              <div
                style={{
                  color: "#E93F3F",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              ></div>
            </Grid>
          ))}
        </Grid>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "30px",
          paddingBottom: "15px",
        }}
      >
        <Trans i18nKey="total"></Trans>
        <div style={{ color: "#E93F3F", fontSize: "20px", fontWeight: "bold" }}>
          &nbsp;${totalCartPrice(cart)}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: "50px",
        }}
      >
        <Tippy content="Remove all beats from cart">
          <button
            onClick={() => {
              handleClearCartCheckout();
            }}
            class="addToCartBtn"
            style={{
              display: "flex",
              marginBottom: "10px",
              backgroundColor: "#E93F3F",
              fontWeight: "bold",
            }}
          >
            <div>
              <img src="https://img.icons8.com/material-rounded/24/ffffff/clear-shopping-cart.png" />
              <Trans i18nKey="clearCart"></Trans>
            </div>
          </button>
        </Tippy>
      </div>

      <Checkout cart={cart}/>
    </div>
  );
};

export default Cart;

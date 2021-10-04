import BeatCard from "./BeatCard";
import { useState, useRef, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Header from "./Header";
import Title from "./Title";
import BeatInCart from "./BeatInCart";
import Cart from "./Cart";

const Home = () => {
  const [beats, setBeats] = useState([
    {
      name: "4AM in London",
      prod: "M1onthebeat",
      video: "/video/cb.mp4",
      genre: "ukdrill",
      inCart: false,
      rating: 5,
      price: 30,
      id: 1,
    },
    {
      name: "Glizzy",
      prod: "Chris Rich Beats",
      video: "/video/glizzy.mp4",
      genre: "ukdrill",
      inCart: false,
      rating: 2,
      price: 15,
      id: 2,
    },
    {
      name: "On deck",
      prod: "LKlabs",
      video: "/video/labs.mp4",
      genre: "ukdrill",
      inCart: false,
      rating: 4,
      price: 25,
      id: 3,
    },
    {
      name: "Chariot",
      prod: "JM-00",
      video: "/video/chariot.mp4",
      genre: "ukdrill",
      inCart: false,
      rating: 4,
      price: 25,
      id: 4,
    },
    {
      name: "Gaza Settingz",
      prod: "TIIMBABYYY",
      video: "/video/tim.mp4",
      genre: "ukdrill",
      inCart: false,
      rating: 3,
      price: 20,
      id: 5,
    },
    {
      name: "When the Sun Goes Down",
      prod: "brillion",
      video: "/video/brillion.mp4",
      genre: "lofi",
      inCart: false,
      rating: 3,
      price: 15,
      id: 6,
    },
    {
      name: "Contrasts",
      prod: "Softy & Kaspa",
      video: "/video/contrasts.mp4",
      genre: "lofi",
      inCart: false,
      rating: 4,
      price: 20,
      id: 7,
    },
    {
      name: "Soaring",
      prod: "Elior",
      video: "/video/ellior.mp4",
      genre: "lofi",
      inCart: false,
      rating: 3,
      price: 25,
      id: 8,
    },
    {
      name: "yú",
      prod: "junyii",
      video: "/video/junyii.mp4",
      genre: "lofi",
      inCart: false,
      rating: 5,
      price: 50,
      id: 9,
    },
    {
      name: "Parallel",
      prod: "Tom Doolie & lōland",
      video: "/video/parallel.mp4",
      genre: "lofi",
      inCart: false,
      rating: 2,
      price: 10,
      id: 10,
    },
    {
      name: "Off",
      prod: "Twins Prod",
      video: "/video/carving.mp4",
      genre: "trap",
      inCart: false,
      rating: 3,
      price: 15,
      id: 11,
    },
    {
      name: "Flow",
      prod: "Beaucoup Beatz",
      video: "/video/flow.mp4",
      genre: "trap",
      inCart: false,
      rating: 4,
      price: 20,
      id: 12,
    },
    {
      name: "Metro Freestyle",
      prod: "Heath Stone",
      video: "/video/metro.mp4",
      genre: "trap",
      inCart: false,
      rating: 2,
      price: 10,
      id: 13,
    },
    {
      name: "RATED R",
      prod: "Gems",
      video: "/video/future.mp4",
      genre: "trap",
      inCart: false,
      rating: 5,
      price: 25,
      id: 14,
    },
    {
      name: "Still Alive",
      prod: "Goldino Star",
      video: "/video/nav.mp4",
      genre: "trap",
      inCart: false,
      rating: 3,
      price: 20,
      id: 15,
    },
  ]);

  const [cart, setCart] = useState([]);

  const [updated, setUpdated] = useState(false);

  const filterInPlace = (array, predicate) => {
    let end = 0;

    for (let i = 0; i < array.length; i++) {
      const obj = array[i];

      if (predicate(obj)) {
        array[end++] = obj;
      }
    }

    array.length = end;
  };

  const handleCartButton = (beat, added) => {
    // Find beat and remove it from cart
    let tempCart = cart;

    if (added) {
      tempCart.push(beat);
      setCart(tempCart);
    } else {
      // Remove from cart
      filterInPlace(cart, (obj) => obj.id !== beat.id);
    }

    let updatedItem = beat;
    updatedItem.inCart = added;

    let updatedBeats = beats.map((beat) =>
      beat.id === updatedItem.id ? updatedItem : beat
    );

    setBeats(updatedBeats);

    setUpdated(!updated);
    console.log("beats:");
    console.log(beats);
  };

  const clearCart = () => {
    setCart([]);

    let updatedBeats = beats.map((beat) => {
      let tempBeat = beat;
      tempBeat.inCart = false;
      return tempBeat;
    });

    setBeats(updatedBeats);

    setUpdated(!updated);
  };

  const removeBeatFromCart = (beat) => {
    filterInPlace(cart, (obj) => obj.id !== beat.id);
    setUpdated(!updated);

    let updatedItem = beat;
    updatedItem.inCart = false;

    let updatedBeats = beats.map((beat) =>
      beat.id === updatedItem.id ? updatedItem : beat
    );

    setBeats(updatedBeats);

    console.log(beats);
  };

  return (
    <div id="home">
      <div style={{ paddingLeft: "50px", paddingRight: "50px" }}>
        <Header
          first="explore"
          second="beatsCap"
          title="findTitle"
          imgSrc="https://img.icons8.com/material-rounded/40/ffffff/search-more.png"
        />
        <Title title="UK Drill" />
        <div>
          <Grid
            style={{ paddingBottom: "40px" }}
            container
            spacing={3}
            alignItems="center"
            justify="center"
          >
            {beats
              .filter((beat) => beat.genre === "ukdrill")
              .map((beat) => (
                <Grid item>
                  <BeatCard handleCartButton={handleCartButton} beat={beat} />
                </Grid>
              ))}
          </Grid>
        </div>

        <Title title="Trap" />
        <div>
          <Grid
            style={{ paddingBottom: "40px" }}
            container
            spacing={3}
            alignItems="center"
            justify="center"
          >
            {beats
              .filter((beat) => beat.genre === "trap")
              .map((beat) => (
                <Grid item>
                  <BeatCard handleCartButton={handleCartButton} beat={beat} />
                </Grid>
              ))}
          </Grid>
        </div>

        <Title title="Lo-Fi" />
        <div>
          <Grid
            style={{ paddingBottom: "40px" }}
            container
            spacing={3}
            alignItems="center"
            justify="center"
          >
            {beats
              .filter((beat) => beat.genre === "lofi")
              .map((beat) => (
                <Grid item>
                  <BeatCard handleCartButton={handleCartButton} beat={beat} />
                </Grid>
              ))}
          </Grid>
        </div>

        <Cart
          clearCart={clearCart}
          removeBeatFromCart={removeBeatFromCart}
          cart={cart}
        />
      </div>
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, Link } from "react-router-dom";

/* COMPONENTS */
import Card from "./components/Card/Card";
import Header from "./components/Header/Header";
import Overlay from "./components/Overlay/Overlay";
import Home from "./pages/Home/Home";
import Favourite from "./pages/Favourites/Favourite";

import "./App.scss";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpened, setIsCartOpened] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [favouriteItems, setFavouriteItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log(isLoading, "app");
  useEffect(() => {
    async function myFetch() {
      setIsLoading(false);
      const itemsResponse = await axios.get(
        "https://62f17d58b1098f1508018e86.mockapi.io/items"
      );
      const cartResponse = await axios.get(
        "https://62f17d58b1098f1508018e86.mockapi.io/cart"
      );
      const favouriteResponse = await axios.get(
        "https://62f17d58b1098f1508018e86.mockapi.io/favourite"
      );

      setIsLoading(true);

      setCartItems(cartResponse.data);
      setFavouriteItems(favouriteResponse.data);
      setItems(itemsResponse.data);
    }

    myFetch();
  }, []);

  let cartPrice = +0;

  const onPlus = (obj) => {
    if (cartItems.find((item) => item.idCard === obj.idCard)) {
      setCartItems((prev) => prev.filter((item) => item.idCard !== obj.idCard));

      let id = -1;

      cartItems.forEach((item) => {
        if (item.idCard !== obj.idCard) {
          id++;
        } else {
          id++;
          return id;
        }
      });

      axios.delete(`https://62f17d58b1098f1508018e86.mockapi.io/cart/${id}`);
    } else {
      axios.post("https://62f17d58b1098f1508018e86.mockapi.io/cart", obj);
      setCartItems((prev) => [...prev, obj]);
    }
  };

  const onFavourite = (obj) => {
    console.log(obj);
    if (favouriteItems.find((item) => item.idCard === obj.idCard)) {
      setFavouriteItems((prev) =>
        prev.filter((elem) => elem.idCard !== obj.idCard)
      );

      let id = -1;

      favouriteItems.forEach((item) => {
        if (item.idCard !== obj.idCard) {
          id++;
        } else {
          id++;
          return id;
        }
      });

      axios.delete(
        `https://62f17d58b1098f1508018e86.mockapi.io/favourite/${id}`
      );
    } else {
      setFavouriteItems((prev) => [...prev, obj]);
      axios.post("https://62f17d58b1098f1508018e86.mockapi.io/favourite", obj);
    }
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://62f17d58b1098f1508018e86.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper">
      {isCartOpened
        ? ((document.body.style.overflow = "hidden"),
          window.scrollTo(0, 0),
          (
            <Overlay
              onClose={() => setIsCartOpened(false)}
              carts={cartItems}
              onRemove={onRemoveItem}
            />
          ))
        : (document.body.style.overflow = "")}

      <Header cartPrice={cartPrice} onClickCart={() => setIsCartOpened(true)} />

      <hr></hr>

      <Routes>
        <Route
          path="/"
          exact
          element={
            <Home
              items={items}
              cartItems={cartItems}
              favouriteItems={favouriteItems}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onPlus={onPlus}
              onFavourite={onFavourite}
              onChangeSearchInput={onChangeSearchInput}
              isLoading={isLoading}
            />
          }
        />
        <Route
          path="favourites"
          exact
          element={
            <Favourite
              favouriteItems={favouriteItems}
              cartItems={cartItems}
              onPlus={onPlus}
              onFavourite={onFavourite}
              isLoading={isLoading}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;

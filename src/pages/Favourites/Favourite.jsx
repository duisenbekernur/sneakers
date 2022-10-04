import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";

import Card from "../../components/Card/Card";

import * as styles from "./_favourite.scss";

export default function Favourite({
  favouriteItems,
  cartItems,
  onPlus,
  onFavourite,
  isLoading
}) {
  return (
    <div className="favouite">
      <div className="favouriteTop">
        <Link to="/">
          <img src="/img/prevToHome.svg" alt="" />
        </Link>
        <h3>Мои закладки</h3>
      </div>
      <div className="contentCards">
        {favouriteItems.map((elem, index) => (
          <Card
            key={index}
            elem={elem}
            idCard={elem.idCard}
            name={elem.name}
            price={elem.price}
            imgUrl={elem.imgUrl}
            onPlus={onPlus}
            onFavourite={onFavourite}
            added={cartItems.some((obj) => obj.idCard === elem.idCard)}
            favourited={favouriteItems.some(
              (obj) => obj.idCard === elem.idCard
            )}
            loading={isLoading}
          />
        ))}
      </div>
    </div>
  );
}

import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import * as styles from "../Overlay/_overlay.scss";

export default function Header(props) {
  return (
    <header>
      <Link to="/">
        <div className="headerLeft">
          <img width={40} height={40} src="/img/logo.png" alt="logo" />
          <div className="headerInfo">
            <h3>REACT SNEAKERS</h3>
            <p>Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className="headerRight">
        <li onClick={props.onClickCart}>
          <img src="/img/cart.svg" alt="cart" />
          <p>{props.cartPrice} руб.</p>
        </li>
        <li>
          <Link to="/favourites">
            <img src="/img/like.svg" alt="like" />
          </Link>
        </li>
        <li>
          <img src="/img/user.svg" alt="user" />
        </li>
      </ul>
    </header>
  );
}

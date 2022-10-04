import axios from "axios";
import React, { useState } from "react";
import ContentLoader from "react-content-loader";

export default function Card({
  name,
  idCard,
  imgUrl,
  price,
  onPlus,
  onFavourite,
  added,
  favourited,
  loading,
}) {
  const [isAdded, setIsAdded] = useState(added);
  const [isFavourite, setIsFavourite] = useState(favourited);

  const onAddToCard = () => {
    onPlus({ name, imgUrl, price, idCard });
    setIsAdded(!isAdded);
  };

  const onAddToFavourite = () => {
    onFavourite({ name, imgUrl, price, idCard });
    setIsFavourite(!isFavourite);
    console.log(favourited);
  };


  return (
    <>
      {loading ? (
        <div className="card">
          <button onClick={onAddToFavourite}>
            <img
              src={
                favourited ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"
              }
              alt={favourited ? "liked" : "unliked"}
            />
          </button>
          <img src={imgUrl} alt="sneakers" />
          <h4>{name}</h4>
          <div className="cardBottom">
            <div className="cardBottomInfo">
              <p>Цена: </p>
              <span>{price} руб.</span>
            </div>
            <button
              onClick={() => {
                onAddToCard();
              }}
            >
              <img
                src={
                  added ? "/img/card-checked.svg" : "/img/card-unchecked.svg"
                }
                alt={added ? "checked" : "unchecked"}
              />
            </button>
          </div>
        </div>
      ) : (
        <ContentLoader
          speed={2}
          width={210}
          height={260}
          viewBox="0 0 210 260"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="50" y="0" rx="10" ry="10" width="150" height="91" />
          <rect x="50" y="105" rx="3" ry="3" width="150" height="15" />
          <rect x="50" y="127" rx="3" ry="3" width="93" height="15" />
          <rect x="50" y="149" rx="8" ry="8" width="80" height="24" />
          <rect x="168" y="143" rx="8" ry="8" width="32" height="32" />
        </ContentLoader>
      )}
    </>
  );
}

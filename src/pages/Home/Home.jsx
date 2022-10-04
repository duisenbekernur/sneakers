import React from "react";
import Card from "../../components/Card/Card";

export default function Home({
  items,
  cartItems,
  favouriteItems,
  searchValue,
  setSearchValue,
  onPlus,
  onFavourite,
  onChangeSearchInput,
  isLoading
}) {
  console.log(isLoading, 'home')
  return (
    <div className="content">
      <div className="contentTop">
        <h1>
          {searchValue ? `Поиск по запросу: "${searchValue}"` : `Все кроссовки`}
        </h1>
        <div className="search">
          <img src="/img/search.svg" alt="search" />
          <input
            value={searchValue}
            onChange={onChangeSearchInput}
            placeholder="Поиск..."
          />
          {searchValue && (
            <img
              onClick={() => setSearchValue("")}
              className="deleteSearchValue"
              src="/img/drawer-card-delete.svg"
              alt="del"
            />
          )}
        </div>
      </div>

      <div className="contentCards">
        {items
          .filter((elem) =>
            elem.name.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((elem, index) => (
            <Card
              key={index}
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

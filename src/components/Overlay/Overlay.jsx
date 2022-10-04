import React from "react";

export default function Overlay({ onClose, carts, onRemove }) {
  return (
    <div className="overlay">
      <div className="drawer">
        <div className="drawerHeader">
          <h2>Корзина</h2>
          <img
            onClick={onClose}
            src="/img/drawer-card-delete.svg"
            alt="delete"
          />
        </div>

        {carts.length === 0 ? (
          <center className="empty">
            <img src="/img/drawer-empty.png" />
            <h3>Корзина пустая</h3>
            <p>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
            <button onClick={onClose}>
              <img src="/img/btn-arrow.svg" alt="arrow" /> Вернуться назад
            </button>
          </center>
        ) : (
          <div>
            <div className="drawerCards">
              {carts.map((obj) => (
                <div className="drawerCard">
                  <img width={80} src={obj.imgUrl} />
                  <div className="drawerCardInfo">
                    <p>{obj.name}</p>
                    <span>{obj.price} руб.</span>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    src="/img/drawer-card-delete.svg"
                    alt="delete"
                  />
                </div>
              ))}
            </div>
            <ul className="drawerBottom">
              <li>
                <span>Итого:</span>
                <div></div>
                <b>21 178 руб.</b>
              </li>
              <li>
                <span>Налог 5%:</span>
                <div></div>
                <b>1074 руб.</b>
              </li>
              <button>
                Оформить заказ <img src="/img/btn-arrow.svg" alt="arrow" />
              </button>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

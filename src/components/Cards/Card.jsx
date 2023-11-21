import React from "react";
import "./Card.css";

const Card = ({ card, title, draggable, onDragStart }) => {
  return (
    <div
      className="cards_container"
      draggable={draggable}
      onDragStart={(e) => onDragStart(e)}
    >
      <div className="card">{title}</div>
      {/* <p>Card Number: {card.cardNumber}</p> */}
      {/* Add other card content here */}
    </div>
  );
};

export default Card;

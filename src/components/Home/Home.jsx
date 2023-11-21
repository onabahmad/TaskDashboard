import React, { useState, useEffect } from "react";
import "./Home.css";
import { IoAddSharp } from "react-icons/io5";
import { SlOptions } from "react-icons/sl";
import Card from "../Cards/Card";
import { Link } from "react-router-dom";

const Home = () => {
  const getInitialCards = (section) => {
    const storedCards = JSON.parse(localStorage.getItem(section)) || [];
    return storedCards;
  };

  const getInitialCardCount = () => {
    const storedCardCount = parseInt(localStorage.getItem("cardCount")) || 0;
    return storedCardCount;
  };
  const [notStartedCard, setNotStartedCard] = useState(() =>
    getInitialCards("notStarted")
  );
  const [inProgressCard, setInProgressCard] = useState(() =>
    getInitialCards("inProgress")
  );
  const [completedCards, setCompletedCards] = useState(() =>
    getInitialCards("completed")
  );
  const [cardCount, setCardCount] = useState(() => getInitialCardCount());

  useEffect(() => {
    localStorage.setItem("notStarted", JSON.stringify(notStartedCard));
  }, [notStartedCard]);

  useEffect(() => {
    localStorage.setItem("inProgress", JSON.stringify(inProgressCard));
  }, [inProgressCard]);

  useEffect(() => {
    localStorage.setItem("completed", JSON.stringify(completedCards));
  }, [completedCards]);

  useEffect(() => {
    localStorage.setItem("cardCount", cardCount.toString());
  }, [cardCount]);

  const handleGenerateCard = (section) => {
    const newCardCount = cardCount + 1;
    const newCard = {
      cardNumber: newCardCount,
    };

    switch (section) {
      case "notStarted":
        setNotStartedCard([...notStartedCard, newCard]);
        break;
      case "inProgress":
        setInProgressCard([...inProgressCard, newCard]);
        break;
      case "completed":
        setCompletedCards([...completedCards, newCard]);
        break;
      default:
        break;
    }

    setCardCount(newCardCount);
  };

  const handleDragStart = (e, card, section) => {
    e.dataTransfer.setData("card", JSON.stringify(card));
    e.dataTransfer.setData("section", section);
  };

  const handleDrop = (e, targetSection) => {
    e.preventDefault();

    const draggedCard = JSON.parse(e.dataTransfer.getData("card"));
    const sourceSection = e.dataTransfer.getData("section");
    // Removing the card from the source section based on cardNumber
    switch (sourceSection) {
      case "notStarted":
        setNotStartedCard(
          notStartedCard.filter(
            (card) => card.cardNumber !== draggedCard.cardNumber
          )
        );
        break;
      case "inProgress":
        setInProgressCard(
          inProgressCard.filter(
            (card) => card.cardNumber !== draggedCard.cardNumber
          )
        );
        break;
      case "completed":
        setCompletedCards(
          completedCards.filter(
            (card) => card.cardNumber !== draggedCard.cardNumber
          )
        );
        break;
      default:
        break;
    }

    // Adding the card to the target section
    switch (targetSection) {
      case "notStarted":
        setNotStartedCard([...notStartedCard, draggedCard]);
        break;
      case "inProgress":
        setInProgressCard([...inProgressCard, draggedCard]);
        break;
      case "completed":
        setCompletedCards([...completedCards, draggedCard]);
        break;
      default:
        break;
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  // Loading tasks from local storage
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || {};

  return (
    <div>
      <div className="App__Container">
        <div
          className="notStarted__Container"
          onDrop={(e) => handleDrop(e, "notStarted")}
          onDragOver={handleDragOver}
        >
          <div>
            <div className="status_cardNumber_addCard">
              <div className="status_cardNumber">
                <label className="notStarted_label" htmlFor="">
                  Not Started
                </label>
                <p> {notStartedCard.length}</p>
              </div>
              <div className="addCard_options">
                <SlOptions />
                <IoAddSharp
                  style={{ cursor: "pointer" }}
                  onClick={() => handleGenerateCard("notStarted")}
                />
              </div>
            </div>

            {notStartedCard.map((card) => (
              <Link
                key={card.cardNumber}
                to={`/task/${card.cardNumber}?status=notStarted`}
              >
                <Card
                  card={card}
                  title={
                    storedTasks[card.cardNumber]?.title ||
                    `Card ${[card.cardNumber]}`
                  }
                  draggable
                  onDragStart={(e) => handleDragStart(e, card, "notStarted")}
                />
              </Link>
            ))}
          </div>
          <button
            className="Add_button"
            onClick={() => handleGenerateCard("notStarted")}
          >
            + New
          </button>
        </div>

        <div
          className="inProgress__Container"
          onDrop={(e) => handleDrop(e, "inProgress")}
          onDragOver={handleDragOver}
        >
          <div>
            <div className="status_cardNumber_addCard">
              <div className="status_cardNumber">
                <label className="inProgress_label" htmlFor="">
                  In progress
                </label>
                <p> {inProgressCard.length}</p>
              </div>
              <div className="addCard_options">
                <SlOptions />
                <IoAddSharp
                  style={{ cursor: "pointer" }}
                  onClick={() => handleGenerateCard("inProgress")}
                />
              </div>
            </div>
            {inProgressCard.map((card) => (
              <Link
                key={card.cardNumber}
                to={`/task/${card.cardNumber}?status=inProgress`}
              >
                <Card
                  card={card}
                  draggable
                  title={
                    storedTasks[card.cardNumber]?.title ||
                    `Card ${[card.cardNumber]}`
                  }
                  onDragStart={(e) => handleDragStart(e, card, "inProgress")}
                />
              </Link>
            ))}
          </div>
          <button
            className="Add_button"
            onClick={() => handleGenerateCard("inProgress")}
          >
            + New
          </button>
        </div>

        <div
          className="completed__Container"
          onDrop={(e) => handleDrop(e, "completed")}
          onDragOver={handleDragOver}
        >
          <div>
            <div className="status_cardNumber_addCard">
              <div className="status_cardNumber">
                <label className="completed_label" htmlFor="">
                  Completed
                </label>
                <p> {completedCards.length}</p>
              </div>
              <div className="addCard_options">
                <SlOptions />
                <IoAddSharp
                  style={{ cursor: "pointer" }}
                  onClick={() => handleGenerateCard("completed")}
                />
              </div>
            </div>
            {completedCards.map((card) => (
              <Link
                key={card.cardNumber}
                to={`/task/${card.cardNumber}?status=completed`}
              >
                <Card
                  card={card}
                  draggable
                  title={
                    storedTasks[card.cardNumber]?.title ||
                    `Card ${[card.cardNumber]}`
                  }
                  onDragStart={(e) => handleDragStart(e, card, "completed")}
                />
              </Link>
            ))}
          </div>
          <button
            className="Add_button"
            onClick={() => handleGenerateCard("completed")}
          >
            + New
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

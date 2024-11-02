import { useEffect, useState } from "react";
import styles from "./CardContainer.module.css";
import Card from "../Card/Card";
import {
  addCard,
  addPinCard,
  deleteCard,
  deletePinCard,
  getAllCards,
  getAllPinCards,
  updateCard,
} from "../../Services/Service";

const CardContainer = () => {
  const [cards, setCards] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [pinCards, setPinCards] = useState([]);

  const cardsToShow = [
    ...pinCards.filter((pinCard) =>
      pinCard.text.toLowerCase().includes(searchValue)
    ),
    ...cards.filter(
      (card) =>
        card.text.toLowerCase().includes(searchValue) &&
        !pinCards.includes(card)
    ),
  ];

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const allCards = await getAllCards();
        const pinnedIds = await getAllPinCards();

        const pinnedCards = pinnedIds
          .map((id) => allCards.find((card) => card.id === id))
          .filter((card) => card !== undefined);

        console.log(pinnedCards);
        setCards(allCards);
        setPinCards(pinnedCards);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchCards();
  }, []);

  function add() {
    let newCard = {
      id: generateUniqueID(),
      text: "Add your text",
      color: "Green",
    };
    setCards([...cards, newCard]);
    addCard(newCard);
  }

  function delete1(id) {
    const cardToDelete = cards.find((i) => i.id === id);

    setCards((prevCards) => prevCards.filter((i) => i.id !== id));

    if (cardToDelete && pinCards.some((pinCard) => pinCard.id === id)) {
      setPinCards((prevPinCards) => prevPinCards.filter((i) => i.id !== id));
      deletePinCard(id);
    }

    deleteCard(id);
  }

  function update(id, field) {
    const updatedCards = cards.map((i) =>
      i.id === id ? { ...i, ...field } : i
    );
    setCards(updatedCards);
  
    const updatedPinCards = pinCards.map((p) =>
      updatedCards.find((i) => i.id === p.id) || p
    );
  
    setPinCards(updatedPinCards);
    updateCard(id, field);
  }
  

  function pinCard(cardId) {
    console.log(cardId);
    console.log(cards);

    let c = cards.filter((i) => i.id === cardId)[0];
    console.log(c);
    setPinCards([...cards.filter((i) => i.id === cardId), ...pinCards]);
    console.log(pinCards);
    addPinCard(cardId);
  }

  function rePinCard(cardId) {
    setPinCards(pinCards.filter((card) => card.id != cardId));
    deletePinCard(cardId);
  }

  function generateUniqueID() {
    return (
      Math.random().toString(36).substring(2) +
      new Date().getTime().toString(36)
    );
  }

  return (
    <div>
      <input
        className={styles.search}
        onChange={(e) => setSearchValue(e.target.value.toLowerCase())}
        placeholder="Enter text to search"
      ></input>
      <div className={styles.cardContainer}>
        {cardsToShow.map((c) => (
          <Card
            key={c.id}
            id={c.id}
            text1={c.text}
            color1={c.color}
            deleteCardF={delete1}
            updateF={update}
            pinCardF={pinCard}
            rePinCardF={rePinCard}
            isPinned={pinCards.includes(c)}
          ></Card>
        ))}
        <div className={styles.plus} onClick={() => add()}>
          +
        </div>
      </div>
    </div>
  );
};
export default CardContainer;

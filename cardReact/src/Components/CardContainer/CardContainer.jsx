import { useEffect, useState } from "react";
import styles from "./CardContainer.module.css";
import Card from "../Card/Card";
import { IoMdAdd } from "react-icons/io";
import {
  addCard,
  deleteCard,
  getAllCards,
  updateCard,
} from "../../Services/Service";

const CardContainer = () => {
  const [cards, setCards] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  
  const cardsToShow=cards.filter((card) =>
    card.text.toLowerCase().includes(searchValue))

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const data = await getAllCards();
        setCards(data);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchCards();
  }, []);

  function add() {
    let newCard = {
      id: -1,
      text: "Add your text",
      color: "Green",
    };
    setCards([...cards, newCard]);
    addCard(newCard);
  }

  function delete1(id) {
    setCards(cards.filter((i) => i.id !== id));
    deleteCard(id);
  }

  function update(id, field) {
    const updatedCards = cards.map((i) =>
      i.id === id ? { ...i, ...field } : i
    );
    setCards(updatedCards);
    updateCard(id, field);
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

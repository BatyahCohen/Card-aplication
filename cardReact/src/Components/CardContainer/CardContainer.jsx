import { useEffect, useState } from "react";
import styles from "./CardContainer.module.css";
import Card from "../Card/Card";
import { IoMdAdd } from "react-icons/io";
import { addCard, deleteCard, getAllCards } from "../../Services/Service";

const CardContainer = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCards(getAllCards());
  }, []);

  function generateUniqueID() {
    return (
      Math.random().toString(36).substring(2) +
      new Date().getTime().toString(36)
    );
  }

  function add() {
    let newCard = {
      id: generateUniqueID(),
      text: "Add your text",
      color: "Green",
    };
    setCards([...cards, newCard]);
    addCard();
  }

  function delete1(id) {
    setCards(cards.filter((i) => i.id !== id));
    deleteCard(id);
  }

  return (
    <div className={styles.cardContainer}>
      <div className={styles.innerContainer}>
        {cards.map((c) => (
          <Card
            key={c.id}
            id={c.id}
            text1={c.text}
            color1={c.color}
            deleteCardF={delete1}
          ></Card>
        ))}{" "}
        <IoMdAdd className={styles.IoMdAdd} onClick={() => add()} />
      </div>
    </div>
  );
};
export default CardContainer;

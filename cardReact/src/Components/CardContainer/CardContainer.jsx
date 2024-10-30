import { useEffect, useState } from "react";
import styles from "./CardContainer.module.css";
import Card from "../Card/Card";
import { IoMdAdd } from "react-icons/io";
import { addCard, deleteCard, getAllCards } from "../../Services/Service";

const CardContainer = () => {
  const [cards, setCards] = useState([]);

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
      id:-1,
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

  return (
    <div className={styles.cardContainer}> 
        {cards.map((c) => (
          <Card
            key={c.id}
            id={c.id}
            text1={c.text}
            color1={c.color}
            deleteCardF={delete1}
          ></Card>
        ))}{" "}
        <div className={styles.plus} onClick={() => add()}>+</div>
    </div>
  );
};
export default CardContainer;

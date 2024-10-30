import { useEffect, useState } from "react";
import { VscCircleLarge } from "react-icons/vsc";
import { RiDeleteBinLine } from "react-icons/ri";

import styles from "./Card.module.css";
import { updateCard } from "../../Services/Service";

const Card = ({ id, text1, color1, deleteCardF }) => {
  const [text, setText] = useState();
  const [color, setColor] = useState();
  const [show, setShow] = useState(false);
  const [updateTextShow, setUpdateTextShow] = useState(false);

  useEffect(() => {
    setText(text1);
    setColor(color1);
  }, []);

  let colors = ["Green", "Lightblue", "Orange", "Pink"];

  function deleteCard() {
    deleteCardF(id);
  }

  function update(field) {
    updateCard(id, field);
  }

  return (
    <div className={`${styles.card} ${styles[`background${color}`]}`}>
      {updateTextShow && (
        <input
          type="text"
          onChange={(e) => {
            const newText = e.target.value;
            setText(newText);
            update({ text: newText });
          }}
          value={text}
          onBlur={() => setUpdateTextShow(false)}
        ></input>
      )}
      {!updateTextShow && (
        <div className={styles.text} onClick={() => setUpdateTextShow(true)}>
          {text}
        </div>
      )}
      <div className={styles.footerCard}>
        <VscCircleLarge
          className={styles.VscCircleLarge}
          onClick={() => setShow(true)}
        />
        <RiDeleteBinLine
          className={styles.RiDeleteBinLine}
          onClick={() => deleteCard()}
        />
      </div>
      {show && (
        <div className={styles.colorsButtons}>
          {colors.map((c, i) => (
            <button
              key={i}
              onClick={() => {
                setColor(c);
                update({ color: c });
                setShow(false);
              }}
              className={styles[`background${c}`]}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
};
export default Card;

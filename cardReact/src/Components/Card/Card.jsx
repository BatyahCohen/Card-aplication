import { useEffect, useState } from "react";
import { VscCircleLarge } from "react-icons/vsc";
import { RiDeleteBinLine } from "react-icons/ri";

import styles from "./Card.module.css";

const Card = ({ text1, color1 }) => {
  const [text, setText] = useState();
  const [color, setColor] = useState();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setText(text1);
    setColor(color1);
  }, []);

  let colors = ["Green", "Lightblue", "Orange", "Pink"];

  return (
    <div className={`${styles.card} ${styles[`background${color}`]}`}>
      <input
        type="text"
        onChange={(e) => setText(e.target.value)}
        value={text}
      ></input>

      <div className={styles.footerCard}>
        <VscCircleLarge onClick={() => setShow(true)} />
        <RiDeleteBinLine />
      </div>
      {show && (
        <div className={styles.colorsButtons}>
          {colors.map((c, i) => (
            <button
              key={i}
              onClick={() => {
                setColor(c);
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

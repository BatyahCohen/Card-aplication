import {useState } from "react";
import styles from "./CardContainer.module.css";
import Card from "../Card/Card";
import { IoMdAdd } from "react-icons/io";


const CardContainer = () => {

const [cards,setCards]=useState([{id:1,text:"AAA",color:"Green"},
           {id:2,text:"BBB",color:"Lightblue"},
           {id:3,text:"CCC",color:"Orange"},
           {id:4,text:"DDD",color:"Pink"}])

  return (
    <div className={styles.cardContainer}>
      <div className={styles.innerContainer}>
        {cards.map((c)=>(
          <Card key={c.id} text1={c.text} color1={c.color}></Card>
        ))}
      </div>   
      <IoMdAdd className={styles.IoMdAdd}/> 
    </div>
  );
};
export default CardContainer;

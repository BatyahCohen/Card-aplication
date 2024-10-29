import { useEffect, useState } from "react";
import styles from "./Products.module.css";
import { getProducts } from "../../Services/utils";

const Products = ({ type }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const p = await getProducts(type);
      setProducts(p);
    };

    fetchProducts();
  }, [type]);

  if (products === null) {
    return <div>loading...</div>; 
  }

  return (
    <div className={styles.Products}>
      {products.map((p, index) => (
        <div key={index} className={styles.card}>
          <h2 className={styles.title}>{p.title}</h2>
          <img src={p.image} className={styles.image} />
          <div className={styles.price}>₪{p.price}</div>
          <p className={styles.description}>{p.description}</p>
        </div>
      ))}
    </div>
  );
};
export default Products;

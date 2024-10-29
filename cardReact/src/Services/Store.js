export function getProductsFromServer(type) {
  if (type === "books") return fetch("http://localhost:3001/books");

  else return fetch(`https://fakestoreapi.com/products/category/${type}`);
}

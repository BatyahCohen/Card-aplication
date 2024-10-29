import { getProductsFromServer } from "./Store";

export async function getProducts(type) {
  let products=[]
  let now = new Date();

  let productTime = new Date(JSON.parse(localStorage.getItem(type + "UpdateTime")));

  if (productTime == null || (now - productTime) / (1000 * 60) > 1) {
    console.log("havnt local storage!:   ")

    await getProductsFromServer(type)
      .then((res) => res.json())
      .then((data) => {
       products=data;
      });

    localStorage.setItem(type+"UpdateTime", JSON.stringify(now));
    localStorage.setItem(type, JSON.stringify(products));
    return products
  }
  else{
    return JSON.parse(localStorage.getItem(type))
  }
}

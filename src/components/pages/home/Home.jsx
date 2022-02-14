/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect} from "react";
import { fireDb,} from "../../../firebase/firebaseconfig";
import "./home.css";
import {
  query,
  collection,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { ProdContext } from "../prodcontext/ProductContext";

function Home() {
  const [products, setProducts] = useContext(ProdContext);


  useEffect(() => {
    const q = query(collection(fireDb, "products"));
    const unSub = onSnapshot(q, (QuerySnapshot) => {
      let productArray = [];
      QuerySnapshot.forEach((doc) => {
        productArray.push({ ...doc.data(), id: doc.id });
      });
      setProducts(productArray);
    });
    return () => unSub();
  }, [doc]);



  return (
    <div className="home">
      {products.map((product) => (
        <tr key={product.id}>
          <td></td>
          <img src={product.url} alt="nothing to show" />
          <h1>{product.pName}</h1>
          <h4> {product.desc}</h4>
          <h4> {product.price}</h4>
          <h4>{product.stock}</h4>
        </tr>
      ))}
    </div>
  );
}

export default Home;

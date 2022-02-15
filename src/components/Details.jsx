import { doc, getDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { fireDb } from "../firebase/firebaseconfig";
import { useParams } from "react-router";
import "./Detail.css"
function Details() {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    getDoc(doc(fireDb, `products`, id)).then((snapshot) => {
      if (snapshot.exists) {
        setProduct({ ...snapshot.data(), id: doc.id });
      } else {
        console.log("no product found");
      }
    });
  }, [id]);

  console.log(product);

  return (
    <div className="grey">
      <div className="product">
       <div className="img">
          <img src={product.url} alt="no pic found" />
       </div>
        <div className="text">
          <h3>{product.pName} </h3>
        <h3>{product.price} </h3>
        <h3>{product.stock} </h3>
        <h3>{product.desc} </h3>
        <h3>{id}</h3>
        </div>
      </div>
    </div>
  );
}

export default Details;

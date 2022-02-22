/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from "react";
import Products from "./Products";
import { ProdContext } from "../prodcontext/ProductContext";
import {
  query,
  collection,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { fireDb, fs } from "../../../firebase/firebaseconfig";
import { UserContext } from "../../dasboard/dashboardcomponents/usercontext/UserProvider";
const Product = () => {
  let [products, setProducts] = useContext(ProdContext);
  const [user, setUser] = useContext(UserContext)

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
  console.log(products);
  const handleDelete = async (id) => {
    await deleteDoc(doc(fireDb, "products", id), {
      userName: user.userName,
    });
  };
  return (
    <div className="prod">
      {products.map((product) => (
        <Products
          pName={product.pName}
          desc={product.desc}
          url={product.url}
          price={product.price}
          stock={product.stock}
          quantity={product.quantity}
          handleDelete={handleDelete}
          product={product}
          like={product.like}
          dislike={product.dislike}
          key={product.id}
        />
      ))}
    </div>
  );
};

export default Product;

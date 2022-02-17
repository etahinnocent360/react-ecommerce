/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
} from "firebase/firestore";
import React, { useEffect, useState, useContext } from "react";
import { fireDb } from "../firebase/firebaseconfig";
import { ProdContext } from "./pages/prodcontext/ProductContext";
import "./Store.css";
import List from "react-virtualized/dist/commonjs/List";
import { CartContext } from "./pages/prodcontext/CartProvider";
import { FaCartPlus, FaEye, FaPlus, FaPlusSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoIosAdd }from 'react-icons/io'

function ProductStore() {
  const [products, setProducts] = useContext(ProdContext);
  const [carts, setCarts] = useContext(CartContext);
  useEffect(() => {
    const q = query(collection(fireDb, "cart"));
    const unSub = onSnapshot(q, (QuerySnapshot) => {
      let cartArray = [];
      QuerySnapshot.forEach((doc) => {
        cartArray.push({ ...doc.data(), id: doc.id });
      });
      setCarts(cartArray);
    });
    return () => unSub();
  }, [doc]);
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

  const addtocart = async (item) => {
    carts.map((i) => {
      if (i.id === item.id) {
        i.cart = true;
      }
    });

    await addDoc(collection(fireDb, `cart`), item, { merge: true, item: item });
  };

  return (
    <div className="store">
      <div className="prodGalary">
        {products.map((product, id) => (
          <div key={product.id} className="cart">
            <img src={product.url} alt="nothing to show" />
            <h3>Name: {product.pName}</h3>
            <h4 className="price">${product.price}</h4>
             <IoIosAdd onClick={() => addtocart(product)} className="add"/>
            <div className="buttons">
              <h4 className="desc">Desc: {product.desc}</h4>
              <h4 className="stock">Stock: {product.stock}</h4>
              <div className="icons">
                <Link to={`/detail/${product.id}`}>
                  <FaEye className="view" />
                </Link>
              </div>
             
            </div>
          </div>
        ))}
      </div>
      <div className="sidebar">
        <div className="category">
          {products.map((product) => (
            <div key={product.id} className="cart">
              <img src={product.url} alt="nothing to show" />
              <div className="ditail">
                <h4>Name: {product.pName}</h4>
                <h5>Desc: {product.desc}</h5>
                <h5 className="price">${product.price}</h5>
                <h5>Stock: {product.stock}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductStore;

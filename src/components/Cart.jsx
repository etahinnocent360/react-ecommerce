/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/scope */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from "react";
import { fireDb } from "../firebase/firebaseconfig";
import {
  query,
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { FiMinus, FiPlus, FiTrash } from "react-icons/fi";
import { CartContext } from "./pages/prodcontext/CartProvider";
import "../components/Store.css";

function Cart() {
  const [carts, setCarts] = useContext(CartContext);
  const [quantity, setQuantity] = useState();

  useEffect(() => {
    const q = query(collection(fireDb, "cart"));
    const unSub = onSnapshot(q, (QuerySnapshot) => {
      let productArray = [];
      QuerySnapshot.forEach((doc) => {
        productArray.push({ ...doc.data(), id: doc.id });
      });
      setCarts(productArray, [{}]);
    });
    return () => unSub();
  }, [doc]);

  const handleDelete = async (id) => {
    await deleteDoc(doc(fireDb, "cart", id), { merge: true });
  };

  //handle update

  const increaseCart = async (id, quantity) => {
    const cartRef = doc(fireDb, "cart", id);
    const newQuantitty = {
      quantity: quantity + 1,
    };
    await updateDoc(cartRef, newQuantitty);
  };

  const decreaseCart = async (id, quantity) => {
    const cartRef = doc(fireDb, "cart", id);
    const newQuantitty = {
      quantity: quantity - 1,
    };
    await updateDoc(cartRef, newQuantitty);
  };

  function total() {
    let x = 0;
    carts.map((i) => {
      x += i.price * i.quantity;
    });
    return x;
  }
  console.log(carts);

  return (
    <div className="cart-all">
    <div className="cart-items">
      <table>
        <thead>
          <tr>
            <th>Index</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {carts.map((cart, index) => (
            <tr key={cart.id} className="flex">
              <td>{index + 1}</td>
              <td className="descImg">
                <img src={cart.url} alt="nothing to show" />
                <h5>{cart.desc} </h5>
              </td>
              <td>{cart.pName}</td>
              <td>${cart.price}</td>
              <td className="price">
                <FiMinus
                  onClick={() => {
                    decreaseCart(cart.id, cart.quantity);
                  }}
                  className=""
                />
                <div> {cart.quantity}</div>
                <FiPlus
                  onClick={() => {
                    increaseCart(cart.id, cart.quantity);
                  }}
                />
              </td>
              <td>
                <FiTrash
                  className="remove"
                  onClick={() => handleDelete(cart.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="leftSide">
        <h2 className="summary">Order Summary</h2>
        <div className="flex-items">
         <h4>items{carts.length}</h4>
         <h4>${total()}</h4>
        </div>
        <h3>Shipping</h3>
      </div>
    </div>
    </div>
  );
}

export default Cart;

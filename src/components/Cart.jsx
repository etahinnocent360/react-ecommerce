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
import { useAuth } from "./auth/AuthProvider";
import UseMounted from "./pages/mount/UseMounted";


function Cart() {
  const [carts, setCarts] = useContext(CartContext);
  // const [quantity, setQuantity] = useState();
  const {currentUser} = useAuth()
  const mounted = UseMounted()
  useEffect(() => {
    const q = query(collection(fireDb, `cart${mounted.current && currentUser.email}`));
    const unSub = onSnapshot(q, (QuerySnapshot) => {
      let productArray = [];
      QuerySnapshot.forEach((doc) => {
        productArray.push({ ...doc.data(), id: doc.id });
      });
      setCarts(productArray);
    });
    return () => unSub();
  }, [doc, currentUser]);

  const handleDelete = async (id) => {
    await deleteDoc(doc(fireDb, `cart${mounted.current && currentUser.email}`, id), { merge: true });
  };

  //handle update

  const increaseCart = async (id, quantity) => {
    const cartRef = doc(fireDb, `cart${mounted.current && currentUser.email}`, id);
    const newQuantitty = {
      quantity: quantity + 1,
    };
    await updateDoc(cartRef, newQuantitty);
  };

  const decreaseCart = async (id, quantity) => {
    const cartRef = doc(fireDb, `cart${mounted.current && currentUser.email}`, id);
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
        <div className="top">
          <h5>Cart</h5>
          <h5>{carts.length} items</h5>
        </div>
        <div className="table">
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
                <td className="nums">{index + 1}</td>
                <td className="descImg">
                  <img src={cart.url} alt="nothing to show" />
                  {/* <h5>{cart.desc} </h5> */}
                </td>
                <td>{cart.pName}</td>
                <td className="nums">${cart.price}</td>
                <td className="price">
                  <FiMinus
                    onClick={() => {
                      decreaseCart(cart.id, cart.quantity);
                    }}
                    className="qty"
                  />
                  <div> {cart.quantity}</div>
                  <FiPlus
                    onClick={() => {
                      increaseCart(cart.id, cart.quantity);
                    }}
                  className="qty"/>
                </td>
                <td>
                  <FiTrash
                    className="trash"
                    onClick={() => handleDelete(cart.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        <div className="leftSide">
          <h2 className="summary">Order Summary</h2>
          <hr />
          <div className="flex-items">
            <h4 className="left">Items{carts.length}</h4>
            <h4 className="right">${total()}</h4>
          </div>
          <h4 className="left shipping">Shipping</h4>
          <input type="number" placeholder="standard shipping $50" />
          <h4 className="promo">Prom</h4>
          <input type="number" placeholder="promo code here" />
          <button className="apply">Apply</button>
          <hr />
          <div className="total-flex">
            <h4>Total cost</h4>
            <h4 className="right">${total()}</h4>
          </div>
          <button className="check-out">Check out</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;

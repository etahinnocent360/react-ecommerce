/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/scope */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from "react";
import {fireDb} from "../firebase/firebaseconfig";
import Button from '@material-ui/core/Button'
import {collection, deleteDoc, doc, onSnapshot, query, updateDoc,} from "firebase/firestore";
import {FiMinus, FiPlus, FiTrash} from "react-icons/fi";
import {CartContext} from "./pages/prodcontext/CartProvider";
import "../components/Store.css";
import {useAuth} from "./auth/AuthProvider";
import UseMounted from "./pages/mount/UseMounted";
import {Input, MenuItemOption, SelectField, useToast} from "@chakra-ui/react";
import axios from "axios";
import {useParams} from "react-router";


function Cart() {
  const {_id} = useParams()
  const params = new URLSearchParams(_id);
  const [carts, setCarts] = useContext(CartContext);
  let [total_amount, setTotal_amount] = useState(0)
  const [return_url, setReturn_url] = useState()
  // const [quantity, setQuantity] = useState();
  const [currency, setCurrency] = useState()
  const {currentUser} = useAuth()
  const mounted = UseMounted()
  const toast = useToast()
  useEffect(() => {
    const q = query(collection(fireDb, `cart${mounted.current && currentUser?.email}`));
    const unSub = onSnapshot(q, (QuerySnapshot) => {
      let productArray = [];
      QuerySnapshot.forEach((doc) => {
        productArray.push({...doc.data(), id: doc.id});
      });
      setCarts(productArray);
    });
    return () => unSub();
  }, [doc, currentUser]);

  const handleDelete = async (id) => {
    await deleteDoc(doc(fireDb, `cart${mounted.current && currentUser?.email}`, id), {merge: true})
        .then(() => {
          toast({
            description: "deleted",
            status: "success",
            duration: 5000,
            isClosable: true
          })
        }).catch(() => {
          toast({
            description: "some thing went wrong",
            status: "error",
            duration: 5000,
            isClosable: true
          })
        });
  };

  const increaseCart = async (id, quantity) => {
    const cartRef = doc(fireDb, `cart${mounted.current && currentUser?.email}`, id);
    const newQuantitty = {
      quantity: quantity + 1,
    };
    await updateDoc(cartRef, newQuantitty);
  };

  const decreaseCart = async (id, quantity) => {
    const cartRef = doc(fireDb, `cart${mounted.current && currentUser?.email}`, id);
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

  const initiate = async (e, param) => {
    e.preventDefault()
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/initialize`, {
          total_amount: total_amount,
          currency:currency
        }
    ).then(res => {
      console.log(res.data)
        window.location.replace(`/payunit/${res.data._id}`)
    }).catch(error => {
      toast({
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true
      })
    })
  }

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
                      <img src={cart.url} alt="nothing to show"/>
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
          <form className="leftSide" onSubmit={initiate}>
            <h2 className="summary">Order Summary</h2>
            <hr/>
            <div className="flex-items">
              <h4 className="left">Items{carts.length}</h4>
              <h4 className="right">${total()}</h4>
            </div>
            <h4 className="left shipping">Shipping</h4>
            <Input variant={'outlined'} type="number" placeholder="standard shipping $50"/>
            <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
              <option>USD</option>
              <option>XAF</option>
              <option>euro</option>
              <option>Bp</option>
            </select>
            <h4 className="promo">Promo</h4>
            <Input variant={'outlined'} type="number" placeholder="promo code here"/>
            <hr/>
            <div className="total-flex">
              {/*<h4>Total cost</h4>*/}
              {carts.map((i) => (
                  <h4 className="right" value={total_amount += i.price * i.quantity}
                      onChange={(e) => setTotal_amount(e.target.value)}></h4>
              ))}

            </div>
            <Button variant="contained" color={'primary'} className="check-out" type='submit'>Check
              out</Button>
          </form>
        </div>
      </div>
  );
}

export default Cart;

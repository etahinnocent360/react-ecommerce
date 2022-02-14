/* eslint-disable react-hooks/exhaustive-deps */
import { collection, doc,query,  onSnapshot, } from 'firebase/firestore';
import React, {useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { fireDb } from './firebase/firebaseconfig';
import {BsCart2} from  "react-icons/bs"
import { CartContext } from './components/pages/prodcontext/CartProvider';
import "../src/NavBar.css"
function Navbar(props) {
	 const [carts, setCarts] = useContext(CartContext);


 useEffect(() => {
    const q = query(collection(fireDb, "cart"));
    const unSub = onSnapshot(q, (QuerySnapshot) => {
      let cart = [];
      QuerySnapshot.forEach((doc) => {
        cart.push({ ...doc.data(), id: doc.id });
      });
      setCarts(cart);
    });
    return () => unSub();
  }, [doc]);

  return (
    <div className='navBar'>
	    <h4><BsCart2/><h6>{carts.length}</h6></h4>
      <ul>
	      <li>
		      <Link to={"/dashboard"}>
			      dashboard
		      </Link>
	      </li>
      </ul>
    </div>
  );
}

export default Navbar;

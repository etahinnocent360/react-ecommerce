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
      <ul>
	      <li>
		      <Link to={"/dashboard"} className='link'>
			      dashboard
		      </Link>
	      </li>
        <li>
		      <Link to={"/store"} className='link'>
			      Store
		      </Link>
	      </li>
        <li>
		      <Link to={"/about"} className='link'>
			      About
		      </Link>
	      </li>
        <li>
		      <Link to={"/settings"} className='link'>
			      Profile
		      </Link>
	      </li>
      </ul>
      <Link to={"/cart"} className='link'>
        <h4 className='flex-cart'><BsCart2/><h6 className='red'>{carts.length}</h6></h4>
      </Link>
	    
    </div>
  );
}

export default Navbar;

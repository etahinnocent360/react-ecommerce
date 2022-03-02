/* eslint-disable react-hooks/exhaustive-deps */
import { collection, doc, query, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fireDb } from "./firebase/firebaseconfig";
import { BsCart2 } from "react-icons/bs";
import { CartContext } from "./components/pages/prodcontext/CartProvider";
import "../src/NavBar.css";
import { useAuth } from "./components/auth/AuthProvider";
import UseMounted from "./components/pages/mount/UseMounted";
function Navbar(props) {
  const [carts, setCarts] = useContext(CartContext);
  const { currentUser } = useAuth();
  const { logOut } = useAuth();
  const mounted = UseMounted();
  useEffect(() => {
    const q = query(
      collection(fireDb, `cart${mounted.current && currentUser?.email}`)
    );
    const unSub = onSnapshot(q, (QuerySnapshot) => {
      let cart = [];
      QuerySnapshot.forEach((doc) => {
        cart.push({ ...doc.data(), id: doc.id });
      });
      setCarts(cart);
    });
    return () => unSub();
  }, [doc, currentUser]);

  return (
    <div className="navBar">
      <ul>
        <li>
          <Link to={"/"} className="link">
            Home
          </Link>
        </li>
        {currentUser && (
          <li>
            <Link to={"/store"} className="link">
              Store
            </Link>
          </li>
        )}
        {currentUser && (
          <li>
            <Link to={"/about"} className="link">
              About
            </Link>
          </li>
        )}
        {currentUser && (
          <li>
            <Link to={"/settings"} className="link">
              Profile
            </Link>
          </li>
        )}
        {currentUser && (
          <li>
            <Link
              to={"/logOut"}
              className="link"
              onClick={(e) => {
                e.preventDefault();
                logOut();
                window.location.replace("/login");
              }}
            >
              Logout
            </Link>
          </li>
        )}

        {!currentUser && (
          <li>
            <Link to={"/register"} className="link">
              Register
            </Link>{" "}
          </li>
        )}

        {!currentUser && (
          <li>
            <Link to={"/login"} className="link">
              Login
            </Link>
          </li>
        )}
      </ul>
      {currentUser &&  <Link to={"/dashboard/profile"} className="link">
        Admin
      </Link>}

      {currentUser && (
        <Link to={"/cart"} className="link">
          <span className="flex-cart">
            <BsCart2 />
            <h6 className="red">{carts.length}</h6>
          </span>
        </Link>
      )}
    </div>
  );
}

export default Navbar;

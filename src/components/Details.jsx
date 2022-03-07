/* eslint-disable react-hooks/exhaustive-deps */
import {
  doc,
  getDoc,
  collection,
  query,
  onSnapshot,
  updateDoc,
  increment,
} from "firebase/firestore";
import React, { useState, useEffect, useContext } from "react";
import { fireDb } from "../firebase/firebaseconfig";
import { useParams } from "react-router";
import { FaThumbsDown } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import "./Detail.css";
import ReactStars from "react-rating-stars-component";
import { ProdContext } from "./pages/prodcontext/ProductContext";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

function Details() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  let [products, setProducts] = useContext(ProdContext);
  const toast = useToast()
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

  useEffect(() => {
    getDoc(doc(fireDb, `products`, id)).then((snapshot) => {
      if (snapshot.exists) {
        setProduct({ ...snapshot.data(), id: doc.id });
      } else {
        console.log("no product found");
      }
    });
  }, [id]);

  const createLike = async (like) => {
    const likeRef = doc(fireDb, "products", id);
    await updateDoc(likeRef, {
      like: increment(1),
    }).then(() =>{

        if (like < 1e3) return like;
        if (like >= 1e3 && like < 1e6) return +(like / 1e3).toFixed(2) + "K+";
        if (like >= 1e6 && like < 1e9) return +(like / 1e6).toFixed(2) + "M+";
        if (like >= 1e9 && like < 1e12) return +(like / 1e9).toFixed(2) + "B+";
        if (like >= 1e12) return +(like / 1e12).toFixed(2) + "T+"
        toast({
            description: "you liked this product please refresh to see changes",
            status:"success",
            duration: 5000,
            isClosable:true
          })
    }).catch(() =>{
        toast({
            description: "there was an error like not added",
            status:"success",
            duration: 5000,
            isClosable:true
          })
    });
  };
  //   const  createLike = async (id, like) => {
  //   const productRef = doc(fireDb, `products`, id);
  //   const newLike = {
  //     like: like + 1,
  //   };
  //   await updateDoc(productRef, newLike);
  // };

  const disLike = async () => {
    const dislikeRef = doc(fireDb, "products", id);
    await updateDoc(dislikeRef, {
      dislike: increment(1),
    }).then(() =>{
        toast({
            description: "you disliked this product please refresh to see changes",
            status:"success",
            duration: 5000,
            isClosable:true
          })
    }).catch(() =>{
        toast({
            description: "there was an error dislike not added",
            status:"success",
            duration: 5000,
            isClosable:true
          })
    });;
  };

  return (
    <div className="grey">
      <div className="product" key={product.id}>
        <div className="img">
          <img src={product.url} alt="no pic found" />
        </div>
        <div className="text">
          <div className="flex-text">
            <div className="top">
              <h3>{product.pName} </h3>
              <ReactStars size={40} />
              <h3 className="price">${product.price} </h3>
              <h3>{product.desc} </h3>
            </div>
            <hr />
            <div className="absolute"></div>
            <div className="bottom">
              <div className="qty">
                <h2>QTY</h2>
                <div className="number">
                  <IoIosRemove /> {product.quantity}
                  <IoIosAdd />
                </div>
              </div>
              <div className="but-like">
                <div className="like">
                  <FcLike
                    onClick={() => {
                      createLike(product.id, product.like);
                    }}
                  />
                  <div className="up">{product.like}</div>
                </div>
                <div className="dislike">
                  <FaThumbsDown onClick={() => disLike()} />
                  <div className="up right">{product.dislike}</div>
                </div>
              </div>
           <Link to={"/store"}><button><AiOutlineArrowLeft className="left"/>Back to store </button></Link> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;

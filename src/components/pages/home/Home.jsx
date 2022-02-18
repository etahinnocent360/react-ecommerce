/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react";
import { fireDb } from "../../../firebase/firebaseconfig";
import "./home.css";
import { query, collection, onSnapshot, doc } from "firebase/firestore";
import { ProdContext } from "../prodcontext/ProductContext";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { FaThumbsDown } from "react-icons/fa";
import TypewriterComponent from "typewriter-effect";

function Home() {
  const [products, setProducts] = useContext(ProdContext);

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

  return (
    <div className="home-main">
      <div className="absolute">
      </div>
      <div className="home">
        <div className="top">
          <div className="left-side">
            <div className="text">
              <h3 className="welcome">welcome</h3>
              <h2 className="creativity">
                Exploration leads <span>creativity</span> and innovation
              </h2>
              <h5>Discover more products and inspirations</h5>
              <Link className="link" to={"/store"}>
                <button>
                  Shop now
                  <AiOutlineArrowRight />{" "}
                </button>
              </Link>
            </div>
            <div className="img">
              <img src="img/wow.webp" alt="" />
            </div>
          </div>
          <div className="right-side">
            <img src="img/boy3.png" alt="" />
            <img className="girl" src="img/kid3.jpg" alt="" />
           <div className="type">
               <TypewriterComponent
             onInit={(write)=>{
               write
               .typeString('hello I am Etah Wendy Ebitoh')
               .pauseFor(5000)
               .deleteAll()
               .typeString('A fashion designer with')
               .pauseFor(5000)
               .deleteAll()
               .typeString('great test for high quality designs')
               .pauseFor(5000)
               .deleteAll()
               .typeString('With that welcome to wendy designs an a big thank you for trusting us')
               .start()
             }}
             />
           </div>
          </div>
        </div>
        <div className="home-slice">
          {products.slice(0, 4).map((product) => (
            <tr key={product.id} className="flex-5">
              <img src={product.url} alt="nothing to show" />
              <div className="all">
                <div className="nums">
                  <h4>Price: ${product.price}</h4>
                  <h4>Stock: {product.stock}</h4>
                </div>
                <div className="others">
                  <h3>Name: {product.pName}</h3>
                <h4>Desc: {product.desc}</h4>
                </div>
                <div className="reactions">
                  <div className="like">
                    <FcLike />
                    <h3 className="like-up">{product.like} </h3>
                  </div>
                  <div className="dislike">
                    <FaThumbsDown />
                    <h3 className="dislike-up">{product.dislike} </h3>
                  </div>
                </div>
              </div>
            </tr>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;

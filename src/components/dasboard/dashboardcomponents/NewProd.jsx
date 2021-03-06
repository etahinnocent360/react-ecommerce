/* eslint-disable no-unused-vars */
import React, { useState, useContext,} from "react";
import { ProdContext } from "../../pages/prodcontext/ProductContext";
import { fireDb, fs } from "../../../firebase/firebaseconfig";
import { addDoc, collection, Timestamp, } from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { chakra, useToast, Progress} from "@chakra-ui/react";

function NewProd() {
  const toast = useToast()
  const [pName, setPName] = useState("");

  const [price, setPrice] = useState();
  const [stock, setStock] = useState();
  const [desc, setDesc] = useState("");
  const [like, setLike] = useState(0)
  const [dislike, setDisLike] = useState(0)
  const [quantity, setQuantity] = useState(1)
  let [img, setImg] = useState();
  const [progress, setProgress] = useState(0);
  const [product, setProduct] = useContext(ProdContext);

  const addProd = async (e) => {
    e.preventDefault();
    setImg(e.target.value)
  };
  const handleUpload = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      img = (e.target.files[0])
    }
  };

  const upload = () => {
    if (!img) return;
    const storageRef = ref(fs, `/files/${img.name}`);
    const uploadTask = uploadBytesResumable(storageRef, img);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => {
        console.log(error);
      },
      () =>
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
         addDoc(collection(fireDb, "products"), {
      url:url,
       pName: pName,
      price: price,
      stock: stock,
      desc: desc,
      quantity:quantity,
      like:like,
      dislike:dislike,
    }).then(() =>{
        toast({
            description: "upload successful",
            status:"success",
            duration: 5000,
            isClosable:true
          })
    }).catch(() =>{
        toast({
            description: "oh no some thing went wrong",
            status:"error",
            duration: 5000,
            isClosable:true
          })
    })
        })
    );
  };
  return (
    <div>
      <form className="create" onSubmit={addProd}>
        <img className="create-img" src="/img/cool.jpg" alt="" />
        <div className="label">
          <label></label>
          <input
            type="text"
            placeholder="product name"
            value={pName}
            onChange={(e) => setPName(e.target.value)}
          />
        </div>
        <div className="label">
          <label></label>
          <input
            type="number"
            placeholder="product price in USD"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="label">
          <label></label>
          <input
            type="text"
            placeholder="product description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className="label">
          <label></label>
          <input
            type="number"
            placeholder="product in stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
        <div className="label">
          <input
            type="file"
            placeholder="product name"
            // value={url}
            onChange={handleUpload}
            className="btn-3"
          />
          <h3>uploaded {progress} % </h3>
          <Progress hasStripe value={64} ></Progress>
        </div>
        <input type="number" value={quantity} onChange={setQuantity} className="qty"/>
        <button type="submit" onClick={upload}>
          Create
        </button>
      </form>
    </div>
  );
}

export default NewProd;

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {useState, useContext, useEffect} from "react";
import { UserContext } from "./usercontext/UserProvider";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import {collection, onSnapshot, query, doc, deleteDoc} from "firebase/firestore";
import { fireDb } from "../../../firebase/firebaseconfig";
import {useToast} from "@chakra-ui/react";

const Users = () => {
  const [users, setUsers] = useContext(UserContext)
    const toast = useToast()
   useEffect(() => {
    const q = query(collection(fireDb, `users`));
    const unSub = onSnapshot(q, (QuerySnapshot) => {
      let productArray = [];
      QuerySnapshot.forEach((doc) => {
        productArray.push({ ...doc.data(), id: doc.id });
      });
      setUsers(productArray);
    });
    return () => unSub();
  }, [doc]);

    const handleDelete = async (uid) => {
        await deleteDoc(doc(fireDb, `users`, uid)
        ).then(()=>{
            toast({
                description: "deleted",
                status:"success",
                duration: 5000,
                isClosable:true
            })
        }).catch(() =>{
            toast({
                description: "some thing went wrong",
                status:"error",
                duration: 5000,
                isClosable:true
            })
        });
    };
  console.log(users)
  return (
    <div className="users">
      <table className="table">
        <thead>
          <tr>
            <th>Profile</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
            {users.map(user =>(
              <tr key={user.id} >
      <td>
          {user.url?<img className='admin-img' src={user?.url} alt="no profile to show" />:
              <img className='admin-img' src="/img/admin.png" alt="no profile to show" />
          }
            </td>
            <td>{user.name} </td>
            <td>{user.email} </td>
            <td>{user.number} </td>
            <td className="icons">
              <AiOutlineDelete className="danger" onClick={handleDelete}/>
              <AiOutlineEye className="view-eye" />
            </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;

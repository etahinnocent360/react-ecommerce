/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {useState, useContext, useEffect} from "react";
import { UserContext } from "./usercontext/UserProvider";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { collection, onSnapshot, query ,doc} from "firebase/firestore";
import { fireDb } from "../../../firebase/firebaseconfig";

const Users = () => {
  const [users, setUsers] = useContext(UserContext)
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
           <img
                className="admin-img"
                src={user.url}
                alt="no pic"
              />
            </td>
            <td>{user.name} </td>
            <td>{user.email} </td>
            <td>{user.number} </td>
            <td className="icons">
              <AiOutlineDelete className="danger" />
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

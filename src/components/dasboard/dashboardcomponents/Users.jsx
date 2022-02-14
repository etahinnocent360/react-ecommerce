/* eslint-disable no-unused-vars */
import React, {useState, useContext} from "react";
import { UserContext } from "./usercontext/UserProvider";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";

const Users = () => {
  const [users, setUsers] = useContext(UserContext)
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
                src={user.profile}
                alt="no profile to show"
              />
            </td>
            <td>{user.name} </td>
            <td>{user.email} </td>
            <td>{user.number} </td>
            <td>
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

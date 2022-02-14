/* eslint-disable no-unused-vars */
import React from "react";
import { VscDebugStackframe, VscGitPullRequestCreate } from "react-icons/vsc";
import { BsAppIndicator, BsCalendar, BsGraphUp } from "react-icons/bs";
import { BiCog, BiUserCircle } from "react-icons/bi";
import { FaProductHunt } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { Link, Routes, Route } from "react-router-dom";
import "./Board.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li className="nav-items">
          <VscDebugStackframe className="icons"/>
          <Link className="item" to="">
            Dashboard
          </Link>
        </li>
        <li className="nav-items">
          <BsGraphUp className="icons"/>
          <Link className="item" to="sales">
            Sales stats
          </Link>
        </li>
        <li className="nav-items">
          <BsCalendar className="icons"/>
          <Link className="item" to="calender">
            Calender
          </Link>
        </li>
        <li className="nav-items">
          <BsAppIndicator className="icons"/>
          <Link className="item" to="orders">
            Orders
          </Link>
        </li>
        <li className="nav-items">
          <BiCog className="icons"/>
          <Link className="item" to="settings">
            Settings
          </Link>
        </li>
        <li className="nav-items">
          <BiUserCircle className="icons"/>
          <Link className="item" to="users">
            Users
          </Link>
        </li>
      </ul>
      <hr />
      <ul>
        <li className="nav-items2">
          <VscGitPullRequestCreate className="icons"/>
          <Link className="item" to="create">
            New product
          </Link>
        </li>
        <li className="nav-items">
          <FaProductHunt className="icons"/>
          <Link className="item" to="products">
            All products
          </Link>
        </li>
        <li className="nav-items">
          <IoIosLogOut className="icons"/>
          <Link className="item" to="/">
            Logout
          </Link>
        </li>
        <li className="nav-items">
          <CgProfile className="icons"/>
          <Link className="item" to="profile">
            Profile
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;

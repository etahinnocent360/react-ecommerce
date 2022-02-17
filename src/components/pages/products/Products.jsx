/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-unused-vars */

import React, { useState, useContext } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaMinus, FaPlus, FaRegEdit } from "react-icons/fa";
import "../../dasboard/dashboardcomponents/Board.css";

function Products({
  pName,
  desc,
  url,
  price,
  stock,
  handleDelete,
  product,
  handleClick,
}) {
  return (
    <div className="product-cart">
      <table>
        <tr className="cart">
          <td>
            <img src={url} alt="" />
          </td>

          <td>
            <h3>{pName} </h3>
          </td>

          <td>
            <h3 className="nums">{price} </h3>
          </td>

          <td>
            <h3>{desc} </h3>
          </td>
          <td>
            <h3 className="nums">{stock} </h3>
          </td>
          <td>
            <FaRegEdit className="icons edit" />
            <AiOutlineDelete
              onClick={() => handleDelete(product.id)}
              className="icons danger"
            />
          </td>
        </tr>
      </table>
    </div>
  );
}

export default Products;

/* eslint-disable no-sequences */
import React, {createContext, useState} from 'react';
export const CartContext = createContext()

export const CartProvider = (props) => {
	 const [cart, setCart] = useState([
	{
    quantity:0
  }
	 ])
  return (
  <CartContext.Provider value = {[cart, setCart]}>
	 {props.children}
  </CartContext.Provider>
  )
}


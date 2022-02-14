/* eslint-disable no-sequences */
import React, {createContext, useState} from 'react';
export const ProdContext = createContext()

export const ProductProvider = (props) => {
	 const [products, setProducts] = useState([
	
	 ])
  return (
  <ProdContext.Provider value = {[products, setProducts]}>
	 {props.children}
  </ProdContext.Provider>
  )
}

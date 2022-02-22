/* eslint-disable no-unused-vars */
import React, {useContext, createContext, useEffect, useState} from 'react';
import { auth } from '../../firebase/firebaseconfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';

 const UserAuthContext = createContext({
	 currentUser:null,
	 register :() =>Promise,
	 login :() =>Promise,
	 logOut :() =>Promise,
	 googleSignIn:() =>Promise
 })
 export const useAuth = () =>useContext(UserAuthContext)


export default  function AuthProvider({children}){
	const [currentUser, setCurrentUser] = useState(null)
	useEffect(()=>{
		let unSubscript = onAuthStateChanged(auth, user=>{
			setCurrentUser(user)
		})
		return()=>{
			unSubscript()
		}
	// eslint-disable-next-line no-undef
	},[])
	//register user
	function register( email, password){
		return createUserWithEmailAndPassword(auth, email, password)
	}
	//login user
	function login(email,password){
		return signInWithEmailAndPassword(auth, email, password)
	}
	//googlesign in
	function googleSignIn(){
		const provider = new GoogleAuthProvider()
		return signInWithPopup(auth, provider)
	}
	//logout
	function logOut(){
		return signOut(auth)
	}
	const value ={
		currentUser,
		register,
		login,
		logOut,
		googleSignIn
	}
return<UserAuthContext.Provider value={value}>{children} </UserAuthContext.Provider>
}



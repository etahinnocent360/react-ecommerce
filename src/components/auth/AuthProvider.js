/* eslint-disable no-unused-vars */
import React, {useContext, createContext, useEffect, useState} from 'react';
import { auth, fireDb } from '../../firebase/firebaseconfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, confirmPasswordReset} from 'firebase/auth';
import { addDoc, collection,doc,setDoc, updateDoc } from 'firebase/firestore';
import { isAdmin } from '@firebase/util';

 const UserAuthContext = createContext({
	 currentUser:null,
	 register :() =>Promise,
	 login :() =>Promise,
	 googleSignIn:() =>Promise,
	 forgotPassword :() =>Promise,
	 resetPassword :()=>Promise,
	 logOut :() =>Promise,
	
 })
 export const useAuth = () =>useContext(UserAuthContext)


export default  function AuthProvider({children}){
	const [currentUser, setCurrentUser] = useState(null)
	const [isAdmin, setIsAdmin] = useState(Boolean)
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
	function register ( email, password,){
		return createUserWithEmailAndPassword(auth, email, password)
	.then((cred) =>{
			if(cred.user.email || !isAdmin){
                      setDoc( doc(fireDb, `users/${cred.user.uid}`),{
			uid:cred.user.uid,
			name:cred.user.displayName,
			email:cred.user.email,
			url:cred.user.photoURL,
			number:cred.user.phoneNumber,
			isAdmin
			}, {merge:true})
			}else if(doc){
			setIsAdmin(doc(fireDb, `users/${cred.user.uid}`),{
			id:cred.user.uid,
			name:cred.user.displayName,
			email:cred.user.email,
			url:cred.user.photoURL,
			number:cred.user.phoneNumber,
			isAdmin
			}, {merge:false})
			
			}
		})
	}
	//login user
	function login(email,password){
		return signInWithEmailAndPassword(auth, email, password)
	}
	//google sign in
	function googleSignIn(){
		const provider = new GoogleAuthProvider()
		return signInWithPopup(auth, provider,)
		
		.then((cred, email) =>{
			if(cred.user.email || !isAdmin){
                      setDoc( doc(fireDb, `users/${cred.user.uid}`),{
			uid:cred.user.uid,
			name:cred.user.displayName,
			email:cred.user.email,
			url:cred.user.photoURL,
			number:cred.user.phoneNumber,
			isAdmin
			}, {merge:true})
			}else if(doc){
			setIsAdmin(doc(fireDb, `users/${cred.user.uid}`),{
			id:cred.user.uid,
			name:cred.user.displayName,
			email:cred.user.email,
			url:cred.user.photoURL,
			number:cred.user.phoneNumber,
			isAdmin
			}, {merge:false})
			
			}
		})
	}
	//forgot password
	function forgotPassword(email){
		return sendPasswordResetEmail(auth, email, {
			url:'http://localhost:3000/login'
		})
	}
	//reset password
	function resetPassword(oobcode, newPassword){
		return confirmPasswordReset(auth, oobcode, newPassword)
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
		googleSignIn,
		forgotPassword,
		resetPassword,
	}
return<UserAuthContext.Provider value={value}>{children} </UserAuthContext.Provider>
}



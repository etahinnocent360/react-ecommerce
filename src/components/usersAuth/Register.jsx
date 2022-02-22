import React, {useState, useRef, useEffect} from 'react';
import { Link, useNavigate} from 'react-router-dom';
import './Userauth.css'
import {chakra, useToast, isLoading} from '@chakra-ui/react'
import { auth } from '../../firebase/firebaseconfig';
import { useAuth } from '../auth/AuthProvider';
import UseMounted from '../pages/mount/UseMounted';

function Register() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmiting, setIsSubmiting] = useState(false)
  const toast = useToast()
 const {register} = useAuth()
 const mounted = UseMounted()
  return (
     <div className='register'>
      <div className="absolute">
      </div>
    <div className="form-div">
      <div className="left">
      <chakra.form className='form' onSubmit={async(e) =>{
        e.preventDefault()
        if(!email || !password){
          toast({
            description: "please provide you user infor",
            status:"error",
            duration: 5000,
            isClosable:true
          })
        }
        setIsSubmiting(true)
        register(email, password)
        .then((res) => console.log(res))
        .catch((error) => {console.log(error.message)
         toast({
            description: error.message,
            status:"error",
            duration: 5000,
            isClosable:true
          })}).finally(() => setIsSubmiting(false))
      }}>
        <h3>Register</h3>
	{/* <input type="text" placeholder='User name' value={username} onChange={(e) => setUsername(e.target.value)}/> */}
        <input type="email" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder='password' value={password} onChange={(e) =>mounted.current && setPassword(e.target.value)} />
       <div className="flex-buttons">
          <button type='submit' isLoading={isSubmiting}>Register</button>
        <button className="google">Login with google</button>
       </div>
        <div className="flex">
          <Link to={'/login'} className='link'>Login</Link>
        </div>
      </chakra.form>
      </div>
      <div className="right">
	<div className="absolute">
      </div>
        <h2>Welcome to wendy design<span>your satisfaction is our priority</span></h2>
      </div>
    </div>
    </div>
  );
}

export default Register;

import React from 'react';
import { Link } from 'react-router-dom';
import './Userauth.css'

function Register() {
  return (
     <div className='register'>
      <div className="absolute">
      </div>
    <div className="form-div">
      <div className="left">
      <form className='form'>
        <h3>Register</h3>
	<input type="text" placeholder='User name'/>
        <input type="email" placeholder='email'/>
        <input type="password" placeholder='password' />
       <div className="flex-buttons">
          <button>Register</button>
        <button className="google">Login with google</button>
       </div>
        <div className="flex">
          <Link to={'/login'} className='link'>Login</Link>
        </div>
      </form>
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

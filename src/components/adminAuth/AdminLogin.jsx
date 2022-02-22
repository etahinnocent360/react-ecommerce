import React from 'react';
import { Link } from 'react-router-dom';
import "./Admin.css"

function AdminLogin() {
  return (
       <div className='login'>
      <div className="absolute">
      </div>
    <div className="form-div">
      <div className="left">
      <form className='form'>
        <h3>Login</h3>
        <input type="email" placeholder='email'/>
        <input type="password" placeholder='password' />
       <div className="flex-buttons">
          <button>Login</button>
        <button className="google">Login with google</button>
       </div>
        <div className="flex">
          <Link to={'/admin-register'} className='link'>Register</Link>
        <button className='password-reset'>Forgot password?</button>
        </div>
      </form>
      </div>
      <div className="right">
        <h2>Welcome to the admin login<span>  page take control and to</span>
        <span>great things</span></h2>
      </div>
    </div>
    </div>
  );
}

export default AdminLogin;

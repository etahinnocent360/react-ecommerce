/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './Userauth.css'

function UsersAuth() {
const initialValues = {};
  const [formValues, setFormValues] = useState(initialValues);
  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formError).length === 0 && isSubmit) {
    }
  }, [formError]);

  const validate = (values) => {
    const errors = {};
    const regx = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.userName) {
      errors.userName = "User name is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regx.test(values.email)) {
      errors.email = "please provide a valid email address";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 7) {
      errors.password = "password must be at least 7 characters long";
    }
else{
}
    return errors;
  };


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
          <Link to={'/register'} className='link'>Register</Link>
        <button className='password-reset'>Forgot password?</button>
        </div>
      </form>
      </div>
      <div className="right">
        <h2>Ready to start? <span>join now and experience more</span></h2>
      </div>
    </div>
    </div>
  );
}

export default UsersAuth;

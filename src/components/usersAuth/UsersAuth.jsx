/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';

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
    // window.location.replace("/")
}
    return errors;
  };


  return (
    <div>
      {Object.keys(formError).length === 0 && isSubmit ? (
        <div className="ui success">logged in successfully</div>
      ) : (
        <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
      )}
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-h2">Login form</h2>
        <div className="field">
          <label>
            User name:
            <input
              type="text"
              placeholder="user name"
              value={formValues.userName}
              onChange={handleChange}
              name="userName"
            />
          </label>
          <p className="p-error">{formError.userName}</p>
        </div>
        <div className="field">
          <label>
            Email:
            <input
              type="text"
              placeholder="email"
              value={formValues.email}
              onChange={handleChange}
              name="email"
            />
          </label>
          <p className="p-error">{formError.email}</p>
        </div>
        <div className="field">
          <label>
            Password:
            <input
              type="password"
              placeholder="password"
              value={formValues.password}
              onChange={handleChange}
              name="password"
            />
          </label>
          <p className="p-error">{formError.password}</p>
        </div>
        <button type="submit" className="button">Login</button>
      </form>
    </div>
  );
}

export default UsersAuth;

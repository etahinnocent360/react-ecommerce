/* eslint-disable react-hooks/exhaustive-deps */
import { useToast } from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate,useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import UseMounted from "../pages/mount/UseMounted";
import "./Userauth.css";


function UsersAuth() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const toast = useToast();
  const { login, googleSignIn } = useAuth();
 const mounted = UseMounted()
 const location = useLocation()
 const from =location.state?.from?.pathname || '/'
 console.log(mounted, location)
  return (
    <div className="login">
      <div className="absolute"></div>
      <div className="form-div">
        <div className="left">
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
              if (!email || !password) {
                toast({
                  description: "please provide you user infor",
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                });
              }
              setIsSubmiting(true);
              login(email, password)
                .then((res) => {
                      toast({
                    description: "login successful",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                  });
                  navigate(from, {replace:true})
                })
                .catch((error) => {
                  console.log(error.message);
                  toast({
                    description: error.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                  });
                })
                .finally(() => setIsSubmiting(false))
            }}
          >
            <h3>Login</h3>
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex-buttons">
              <button type="submit" >
                Login
              </button>
   
            </div>
            <div className="flex">
              <Link to={"/register"} className="link">
                Register
              </Link>
              <button className="password-reset"><Link to={'/forgot-password'} className="link">Forgot password?</Link></button>
            </div>
          </form>
        </div>
        <div className="right">
          <h2>
            Ready to start? <span>join now and experience more</span>
          </h2>
                     <button
                className="google"
                onClick={() =>
                  googleSignIn()
                    .then((user) => {console.log(user)
                      toast({
                    description: "login successful",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                  });
                  navigate(from, {replace:true})
                    })
                    .catch((error) => {console.log(error)
                      toast({
                    description: error.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                  })})
                }
              >
                <FaGoogle className="icon"/>
                google <span>SignIn </span>
              </button>
              
        </div>
      </div>
    </div>
  );
}

export default UsersAuth;

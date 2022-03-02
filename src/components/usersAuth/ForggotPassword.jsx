import { chakra, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import "./Userauth.css";

function ForggotPassword() {
  const [email, setEmail] = useState('')
  const {forgotPassword} = useAuth()
  const toast = useToast()
  return (
    <div className="login">
      <div className="absolute"></div>
      <div className="form-div">
        <div className="left">
          <chakra.form className="form" onSubmit={async e =>{
            e.preventDefault()
            forgotPassword(email)
            .then(res =>{
              console.log(res)
                  toast({
                  description: "please check you email for the reset link",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                });
            }).catch(error =>{
              console.log(error.message)
                  toast({
                  description: error.message,
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                });
            })
          }} >
            <input value={email} type="email" placeholder="email" onChange={(e) =>setEmail(e.target.value)} />
            <div className="flex-buttons">
              <button type="submit">Submit</button>
            </div>
          </chakra.form>
        </div>
        <div className="right"></div>
      </div>
    </div>
  );
}

export default ForggotPassword;

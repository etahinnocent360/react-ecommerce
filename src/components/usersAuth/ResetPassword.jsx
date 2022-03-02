import { chakra, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '../auth/AuthProvider';
import "./Userauth.css";

function useQuery(){
  const location = useLocation()
  return new URLSearchParams(location.search)
}

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('')
  const {resetPassword} = useAuth()
  const toast = useToast()
  const query = useQuery()
  const navigate = useNavigate()
  console.log(query.get('mode'))
  console.log(query.get('oobCode'))
  console.log(query.get('continueUrl'))
  return (
        <div className="login">
      <div className="absolute"></div>
      <div className="form-div">
        <div className="left">
          <chakra.form className="form" onSubmit={async e =>{
            e.preventDefault()
            resetPassword(query.get('oobCode'), newPassword)
            .then(res =>{
              console.log(res)
                toast({
                  description: "password changed successfully",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                });
                navigate('/login')

            }).catch(error =>{
              ConstantSourceNode.log(error.message)
                toast({
                  description: error.message,
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                });
            })
           
          }} >
            <input value={newPassword} type="password" placeholder="email" onChange={(e) =>setNewPassword(e.target.value)} />
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

export default ResetPassword;

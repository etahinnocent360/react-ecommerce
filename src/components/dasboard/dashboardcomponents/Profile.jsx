import React from 'react';
import {useAuth} from "../../auth/AuthProvider";

function Profile() {
    const  {currentUser} = useAuth()
  return (

      <div className='content-profile'>
          <div className="profile">
              {currentUser?.photoURL?<img className='admin-img' src={currentUser?.photoURL} alt="no profile to show" />:
                  <img className='admin-img' src="/img/admin.png" alt="no profile to show" />
              }

          </div>

          <div className="infor">
              <h3>Name: {currentUser?.displayName}</h3>
              <h3>Email: {currentUser?.email}</h3>
              <h3>Number: {currentUser?.phoneNumber}</h3>

              <h3>Joint on: {currentUser?.metadata.creationTime}</h3>
              <h3>User id: {currentUser?.uid}</h3>
          </div>
      </div>
  );
}

export default Profile;

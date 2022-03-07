import React from 'react';
import './Board.css'
import {useAuth} from "../../auth/AuthProvider";
function Rightbar() {
    const {currentUser} = useAuth()
  return <div className='right'>
	  <div className="admin-profile">
          {currentUser?.photoURL?<img className='admin-img' src={currentUser?.photoURL} alt="no profile to show" />:
              <img className='admin-img' src="/img/admin.png" alt="no profile to show" />
          }
      <h2>Admin</h2>
      <h6>Profession</h6>
    </div>
  </div>;
}

export default Rightbar;

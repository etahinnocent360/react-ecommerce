import React from 'react';
import './Board.css'

function Rightbar() {
  return <div className='right'>
	  <div className="admin-profile">
      <img className='admin-img' src="/img/admin.png" alt="no profile to show" />
      <h2>Admin</h2>
      <h6>Profession</h6>
    </div>
  </div>;
}

export default Rightbar;

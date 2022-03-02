import React from 'react';

function NotAdmin() {
  return (
    <div>
      <div className="only-admin">
	      This route is meant for admin only please make sure you have admin privileges to visit this route
      </div>
    </div>
  );
}

export default NotAdmin;

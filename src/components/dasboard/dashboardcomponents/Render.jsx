import React from 'react';
import './Board.css'
import Settings from './Settings';
import { Link, Routes, Route } from 'react-router-dom';
import Users from './Users';
import SalesStats from './SalesStats';
import Profile from './Profile'
import Logout from '../../adminAuth/Logout';
import Orders from './Orders';
import Calender from './Calender';
import NewProd from './NewProd';
import AllProds from './AllProds';

function Render() {
  return (
    <div className='render'>
      <Routes>
        <Route path ="settings" element={ <Settings/>} />
        <Route path ="users" element={  <Users/> } />
        <Route path ="sales" element={  <SalesStats/> } />
        <Route path ="profile" element={  <Profile/> } />
         <Route path ="orders" element={  <Orders/> } />
          <Route path ="calender" element={  <Calender/> } />
          <Route path ="create" element={  <NewProd/> } />
           <Route path ="products" element={  <AllProds/> } />
      </Routes>
    </div>
  );
}

export default Render;

import React from 'react';
import { FaBars } from 'react-icons/fa';
import Render from './dashboardcomponents/Render';
import Rightbar from './dashboardcomponents/Rightbar';
import Sidebar from './dashboardcomponents/Sidebar';

function CreateProducts() {
  return (
    <div className="container">
      <div className="dashnav">
        <FaBars className='bars'/>
      </div>
    <div className='dashboard'>
      <Sidebar className='sidebar'/>
      <Render className='render' />
      <Rightbar/>
    </div>
    </div>
  );
}

export default CreateProducts;

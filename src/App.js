/* eslint-disable no-func-assign */
import Home from './components/pages/home/Home';
import { BrowserRouter, pathname} from 'react-router-dom';
import {Route, Routes,} from 'react-router'
import './App.css';
import UsersAuth from './components/usersAuth/UsersAuth';
import CreateProducts from './components/dasboard/CreateProducts';
import Users from './components/dasboard/dashboardcomponents/Users';
import Settings from './components/dasboard/dashboardcomponents/Settings';
import SalesStats from './components/dasboard/dashboardcomponents/SalesStats';
import Logout from './components/adminAuth/Logout';
import Profile from './components/dasboard/dashboardcomponents/Profile';
import Orders from './components/dasboard/dashboardcomponents/Orders';
import Calender from './components/dasboard/dashboardcomponents/Calender';
import NewProd from './components/dasboard/dashboardcomponents/NewProd';
import AllProds from './components/dasboard/dashboardcomponents/AllProds';
import Cart from './components/Cart';
import ProductStore from './components/ProductStore';
import Navbar from './Navbar';
import Details from './components/Details';
function App({location}) {
  return (
    <div className="App">
      {/* {location.pathname !=="/dashboard" && <Navbar/>} */}
  <BrowserRouter>
  <Navbar/>
  <Routes>
      <Route exact path="/dashboard/" element={<CreateProducts/>} >.
     <Route path="/dashboard/settings" element={<Settings/>} />
     <Route path="/dashboard/users" element={<Users/>} />
     <Route path="/dashboard/sales" element={<SalesStats/>} />
     <Route path="/dashboard/logout" element={<Logout/>} />
     <Route path="/dashboard/profile" element={<Profile/>} />
     <Route path="/dashboard/orders" element={<Orders/>} />
     <Route path="/dashboard/calender" element={<Calender/>} />
     <Route path="/dashboard/create" element={<NewProd/>} />
     <Route path="/dashboard/products" element={<AllProds/>} />
    </Route>
    <Route path="/" element = { <Home/>} />
    <Route path="/cart" element={<Cart/>} />
    <Route path="/store" element={<ProductStore/>}/>
    <Route path="/login" element = {<UsersAuth/>} />
    <Route path="/detail/:id" element={<Details/>}/>
  </Routes>
  </BrowserRouter>
    </div>
  );
}
export default App;

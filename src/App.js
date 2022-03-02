/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-func-assign */
import Home from './components/pages/home/Home';
import RequireAuth from './components/usersAuth/RequireAuth';
import { BrowserRouter, useLocation, useNavigate, Navigate} from 'react-router-dom';
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
import Register from './components/usersAuth/Register';
import { useAuth } from './components/auth/AuthProvider';
import NotAdmin from './components/pages/NotAdmin';
import ForggotPassword from './components/usersAuth/ForggotPassword';
import ResetPassword from './components/usersAuth/ResetPassword'
import { useContext, useEffect } from 'react';
import { collection, doc, onSnapshot, query } from 'firebase/firestore';
import { fireDb } from './firebase/firebaseconfig';
import { UserContext } from './components/dasboard/dashboardcomponents/usercontext/UserProvider';

function App() {
  const {currentUser} = useAuth()
    const [user, setUser] = useContext(UserContext)
  const location = useLocation
    useEffect(() => {
    const q = query(collection(fireDb, "users"));
    const unSub = onSnapshot(q, (QuerySnapshot) => {
      let productArray = [];
      QuerySnapshot.forEach((doc) => {
        productArray.push({ ...doc.data(), id: doc.id });
      });
      setUser(productArray);
    });
    return () => unSub();
  }, [doc]);
console.log(user[0])

  return (
    <div className="App">
  <BrowserRouter>
  {/* <Navbar/> */}
   {location.path !=="/dashboard/" && <Navbar/>}
  <Routes>
    <Route exact path="/dashboard/" element={currentUser?<CreateProducts/>:<NotAdmin/> ||!currentUser?<UsersAuth/>:<NotAdmin/> }>
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
    <Route  element={<RequireAuth/>}>
      
    </Route>
    <Route path="/" element = { <Home/>} />
    <Route  path="/adminonly" element={<NotAdmin/>}/>
    <Route path="/cart" element={currentUser?<Cart/>:<UsersAuth/>} />
    <Route path="/store" element={currentUser?<ProductStore/>:<UsersAuth/>}/>
    <Route path="/detail/:id" element={currentUser?<Details/>:<UsersAuth/>}/>
    <Route path="/register" element={currentUser?<Home/>:<Register/>}/>
    <Route path="/login" element = {currentUser?<Home/>:<UsersAuth/>} />
    <Route path="/forgot-password" element={currentUser?<Home/>:<ForggotPassword/>}/>
    <Route path="/reset-password" element={currentUser?<Home/>:<ResetPassword/>}/>
  </Routes>
  </BrowserRouter>
    </div>
  );
}
export default App;


import './App.css'
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Routes, Route,Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import { fetchInterceptor } from './midddleware/interceptor'; 
import ProtectedRoute from './midddleware/protectedRoute';
import TopNavBar from './components/topnav';

const Login = lazy(() => import('./page/login'));
const DashBoard = lazy(() => import('./page/dashBoard'));
const SignUp = lazy(() => import('./page/signUp'));

fetchInterceptor();
const App = () => {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [user, setUser] = useState([]);
   useEffect(() => {
      const items= localStorage.getItem("hespoAuth");
      if (items && items.length > 0) {
         setIsLoggedIn(true)
         let _user = localStorage.getItem("hespoUserInfo")
         setUser(JSON.parse(_user|| '{}'))
      } 
   }, []);

   const logout  =  ()=>{
      setIsLoggedIn(false)
   }
   const setLogins  =  ()=>{
      setIsLoggedIn(true)
   }
  return (
     <>  
        {/* <TopNavBar isLoggedIn={isLoggedIn}/> */}
        <NavBar isLoggedIn={isLoggedIn} logout = {logout}/>
        <Suspense fallback={<div className="container">Loading...</div>}>
           <Routes>
              <Route element={<ProtectedRoute condition={!isLoggedIn}  redirectTo='/dashboard' />}>
                  <Route path="/login" element={<Login  setLogins = {setLogins} />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/dashboard" element={<DashBoard />} />
               </Route>
               <Route element={<ProtectedRoute condition={isLoggedIn} redirectTo='/login' />}>
                  {/* <Route path="/dashboard" element={<DashBoard />} /> */}
                  <Route path="/" element={<DashBoard />} />
               </Route>
              <Route path="*" element={(()=>{return (<>NO MATCH</>)})()} />
           </Routes>
        </Suspense>
     </>
  );
 
}

export default App

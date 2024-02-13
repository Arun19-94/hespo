import { NavLink, Navigate } from 'react-router-dom';
import './components.css';
import HomeIcon  from '@mui/icons-material/Home';

const NavBar = ({isLoggedIn, logout}:any) => {
   if (!isLoggedIn) {
      return null;
   }
 return (
    <nav>
       <ul>
          <li>
            <HomeIcon >Filled</HomeIcon > <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <HomeIcon >Filled</HomeIcon ><NavLink to="/login">login</NavLink>
          </li>
          <li onClick={()=>logOuts(logout)}>
            <HomeIcon >Filled</HomeIcon >logout
          </li>
          <li>
            <HomeIcon >Filled</HomeIcon ><NavLink to="/signUp">SignUp</NavLink>
          </li>
       </ul>
    </nav>
 );
};

const logOuts = (logOut: Function)=>{
   localStorage.removeItem('hespoAuth');
   localStorage.removeItem("hespoUserInfo");
   logOut();
}

export default NavBar;
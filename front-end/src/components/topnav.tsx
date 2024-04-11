import { NavLink } from "react-router-dom";
import "./components.css";
import HomeIcon from "@mui/icons-material/Home";

const TopNavBar = ({isLoggedIn}: ISLog) => {
  if (!isLoggedIn) {
    return null;
  } else {
    return (
      <>
      
        <div className="topnav"> 
              <div className="header"> <HomeIcon >Filled</HomeIcon ></div>
              <div className="header"> <HomeIcon >Filled</HomeIcon > <NavLink to="/">Home1</NavLink></div>
              <div className="header"> <HomeIcon >Filled</HomeIcon > <NavLink to="/">Home2</NavLink></div>
              <div className="header"> <HomeIcon >Filled</HomeIcon > <NavLink to="/">Home3</NavLink></div>
              <div className="header"> <HomeIcon >Filled</HomeIcon > <NavLink to="/">profile</NavLink></div>
        </div>
      </>
    );
  }
  
};
interface ISLog {
  isLoggedIn: boolean
}


export default TopNavBar;

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./Nav.scss";
import Dropdown from 'react-bootstrap/Dropdown';
import { DropdownButton, NavDropdown } from "react-bootstrap";
import { UserContext } from "../Context/UserContext";
import { useContext, useEffect, useState } from "react";
const Nav = () => {
  const {logout,user} = useContext(UserContext)
  const history = useHistory()
  const [hideNav, sethideNav] = useState(false);
  const [role , setRole]= useState('');
  useEffect(()=>{
    if(window.location.pathname === "/login"||window.location.pathname === "/login/sv"|| window.location.pathname === "/register"||window.location.pathname === "/login/gv"){
      sethideNav(true);
    }
    else{
      sethideNav(false)
    }
    setRole(localStorage.getItem("role"));
    // console.log(hideNav);
    // console.log(window.location.pathname)
  },[window.location.pathname])
  const handleLogout=()=>{
    // sessionStorage.removeItem("key");
    // sessionStorage.removeItem("login");
    logout();
    history.push("/login");
  }
  return (
    <>
    {hideNav === false && 
    <nav className="navbar sticky-top nav-top" style={{ backgroundColor: "#e3f2fd" }}>
      <div className="container-fluid">
        <a href="#/" className="navbar-brand">
         <b>QuizTest</b>
        </a>
        <div>
          
        <DropdownButton variant="" style={{backgroundColor:"white"}}
          id="dropdown-basic-button" className="noCaret"
          title={<span className="d-flex align-items-center"><img className="userInfo mr-2" src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png" alt="" />
          &nbsp;&nbsp;<span>
          <div className="d-flex flex-column">
              <div className="text-start"><span style={{ color: "gray", fontSize: ".8rem" }}>{+role===1? "giảng viên":"sinh viên"}: DH52005692</span></div>
              <div>{user.email}</div>
            </div>  
          </span></span>}
         >
     
          <Dropdown.Item onClick={()=>handleLogout()}>Đăng Xuất</Dropdown.Item>
        </DropdownButton>
        {/* <Dropdown style={{width:"17rem"}} className="behind-header">
          <Dropdown.Toggle variant="" style={{backgroundColor:"#e3f2fd"}} id="dropdown-basic">
          <div className="input-group flex-nowrap float-end">
            <span className="input-group-text" id="addon-wrapping"><img className="userInfo" src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png" alt="" /></span>
            <span className="input-group-text">
              <div className="flex-column">
                <div className="text-start"><span style={{color:"gray", fontSize:".8rem"}}>sinh viên: DH52005692</span></div>
                <div>{user.email}</div>
                </div>
            </span>
        </div>
          </Dropdown.Toggle>
          
          <Dropdown.Menu className="w-75 ">
            <Dropdown.Item className="behind-header" onClick={()=>handleLogout()}>Đăng xuất</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> */}
        
        
      
      </div>
      </div>
    </nav>
    }
    </> 
  );
};
export default Nav;

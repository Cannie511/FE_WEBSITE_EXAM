import "./TeacherNav.scss"
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const TeacherNav = (props)=>{
    const [hideNav, sethideNav] = useState(false);
    const [mobileNav, setMobileNav] = useState(false);
    useEffect(()=>{
    let Role = localStorage.getItem("role");
    if(window.location.pathname === "/login" || window.location.pathname === "/login/sv" || 
        window.location.pathname === "/register" || window.location.pathname === "/login/gv"){
        sethideNav(true);
      }
      else{
        if(+Role === 1){
            sethideNav(false)
        }
        if(+Role === 2){
            sethideNav(true)
        }
      }
    // console.log(hideNav);
    // console.log(window.location.pathname)
  },[window.location.pathname, hideNav])
    return(
        hideNav === false &&
        <>
          <button className="btn btn-primary position-absolute d-block d-sm-none m-1 menubtn text-center" onClick={()=>setMobileNav(true)}>
          <FontAwesomeIcon icon="fa-solid fa-bars" />
          </button>
            <div className="teacher-nav col-12">
            
                <ul className={mobileNav===true?"show":""}>
                <button className="btn btn-danger m-1 d-block d-sm-none menubtn" onClick={()=>setMobileNav(false)}>
                  <FontAwesomeIcon icon="fa-solid fa-xmark" />
                </button>
                    <li onClick={()=>setMobileNav(false)}><NavLink to="/Teacher/new-test" ><FontAwesomeIcon icon="fa-solid fa-square-plus" /> &nbsp;Tạo Đề Thi</NavLink></li>
                    <li onClick={()=>setMobileNav(false)}><NavLink to="/Teacher/test"><FontAwesomeIcon icon="fa-solid fa-rectangle-list" /> &nbsp;Đề Thi</NavLink></li>
                </ul>
            </div>
        </>
    )
}
export default TeacherNav;
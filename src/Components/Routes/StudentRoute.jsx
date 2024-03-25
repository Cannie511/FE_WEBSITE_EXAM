import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import {
  Route,
  useHistory
} from "react-router-dom/cjs/react-router-dom.min";

const StudentRoute = (props)=>{
  const {login} = useContext(UserContext);
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(false);
  if(localStorage.getItem("role")){
    let roleRoute = localStorage.getItem("role");
    if(+roleRoute !== 2 ){
        history.push("/Teacher/new-test");
    }
}
  useEffect(()=>{
    if (localStorage.getItem("email")) {
      login(localStorage.getItem("email"));
      // setIsLogin(true)
    }
    else{
      history.push(`/login/sv`);
      // setIsLogin(false);
    }
    
  },[])
  
    return(
      <>
        <Route path={props.path} exact>{props.children}</Route>
      </>
    )
}
export default StudentRoute;
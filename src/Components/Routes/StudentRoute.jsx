import { useContext, useEffect } from "react";
import { UserContext } from "../Context/UserContext";
import {
  Route,
  useHistory
} from "react-router-dom/cjs/react-router-dom.min";

const StudentRoute = (props)=>{
  const {login} = useContext(UserContext);
  const history = useHistory();
  if(localStorage.getItem("role")){
    let roleRoute = localStorage.getItem("role");
    if(+roleRoute !== 2 ){
        history.push("/Teacher/new-test");
    }
}
  useEffect(()=>{
   
    if (localStorage.getItem("email")) {
      login(localStorage.getItem("email"));
    }
    else{
      history.push(`/login/`);
    }
  },[])
  
    return(
      <>
        <Route path={props.path} exact>{props.children}</Route>
      </>
    )
}
export default StudentRoute;
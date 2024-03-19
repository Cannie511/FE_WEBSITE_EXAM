import { useContext, useEffect } from "react";
import { UserContext } from "../Context/UserContext";
import {
  Switch,
  Route,
  useHistory, useParams
} from "react-router-dom/cjs/react-router-dom.min";

const PrivateRoute = (props)=>{
  const {login} = useContext(UserContext);
  const history = useHistory();
  const {rolename} = useParams();
  useEffect(()=>{
    if (localStorage.getItem("email")) {
      login(localStorage.getItem("email"));
    }
    else{
      history.push(`/login/sv`);
    }
  },[])
  
    return(
      <>
        <Route path={props.path} exact>{props.children}</Route>
      </>
    )
}
export default PrivateRoute;
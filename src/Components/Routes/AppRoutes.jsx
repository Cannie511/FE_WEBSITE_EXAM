import {
    Switch,
    Route,
    useHistory,
  } from "react-router-dom/cjs/react-router-dom.min";
import Login from "../login/Login";
import Register from "../Register/Register";
import TestComponent from "../TestComponent/TestComponent";
import SearchIDTest from "../SearchIDTest/SearchIDTest";
import Mark from "../Mark/Mark";
import { useContext, useEffect, useState } from "react";
import PrivateRoute from "./PrivateRoute";
import TeacherNav from "../Teacher/TeacherNav";
import TestList from "../TestList/TestList";
import TestPage from "../TestPage/TestPage";
import TeacherRoute from "./TeacherRoute";
import StudentRoute from "./StudentRoute";
import { UserContext } from "../Context/UserContext";
import NotFound from "../404NotFound/NotFound";
import TestDetail from "../TestDetail/TestDetail";
const AppRoutes = (props)=>{
    const history = useHistory()
    const {user} = useContext(UserContext);
    const [logined, setLogined]=useState(false);
    const [role, setRole] = useState(localStorage.getItem("role"));
    useEffect(()=>{
        // if(!role){
        //   history.push("/login");
        // }
    },[logined])
    return(
        <>
        <TeacherNav/>
        <Switch>
        <Route path="/login/" exact>
            <Login login={props.setIsSession} routeCheck={setLogined}/>
          </Route>
          <Route path="/login/:rolename" exact>
            <Login login={props.setIsSession} routeCheck={setLogined}/>
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <StudentRoute path="/IdTest/:id" exact>
            <TestComponent
                nop={props.nop}
                listQues={props.listQues}
                handleGetAnswer={props.handleGetAnswer}
                listIdTest={props.listIdTest}
                setQuesNoShuf={props.setQuesNoShuf}
                setKey={props.setKey}
              />
          </StudentRoute>
          <StudentRoute path="/IdTest">
            <SearchIDTest startStatus={props.setStart} />
          </StudentRoute>
          <StudentRoute path="/your-mark">
            <Mark
                mark={props.point}
                countTrue={props.matchQues}
                totalQues={props.length}
                start={props.setStart}
                sv={user.email}
                subTest={""}
              />
          </StudentRoute>
          <StudentRoute path="/" exact>
            <SearchIDTest startStatus={props.setStart} />
          </StudentRoute>
          <TeacherRoute path="/" exact>
            <TestList/>
          </TeacherRoute>
          {/* <PrivateRoute path="/Teacher" exact>
          </PrivateRoute> */}
          <TeacherRoute path="/Teacher/new-test" exact>
           <TestList/>
          </TeacherRoute>
          <TeacherRoute path="/teacher/test" exact>
            <TestPage/>
          </TeacherRoute>
          <TeacherRoute path="/Teacher/test/detail/:id" exact>
            <TestDetail/>
          </TeacherRoute>
          <Route path="*" exact>
            <NotFound/>
          </Route>
          
        </Switch>
        
        </>
    )
}
export default AppRoutes
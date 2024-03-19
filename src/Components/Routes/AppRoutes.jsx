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
    import { UserContext } from "../Context/UserContext";
import { useContext, useEffect, useState } from "react";
import PrivateRoute from "./PrivateRoute";
import TeacherNav from "../Teacher/TeacherNav";
import TestList from "../TestList/TestList";
import BanList from "../BanList/BanList";

const AppRoutes = (props)=>{
    const history = useHistory()
    const [logined, setLogined]=useState(false);
    const handleRedirect = () => {
      setTimeout(() => {
        history.push("/IdTest")
      }, 1000);
    }; 
    
    useEffect(()=>{

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
          <PrivateRoute path="/IdTest/:id" exact>
          <TestComponent
              nop={props.nop}
              listQues={props.listQues}
              handleGetAnswer={props.handleGetAnswer}
              listIdTest={props.listIdTest}
            />
            
          </PrivateRoute>
          <PrivateRoute path="/IdTest">
                <SearchIDTest startStatus={props.setStart} />
               
          </PrivateRoute>
          <PrivateRoute path="/your-mark">
          <Mark
              mark={props.point}
              countTrue={props.matchQues}
              totalQues={props.length}
              start={props.setStart}
              sv={"Nguyễn Châu Phúc Cảnh"}
              subTest={""}
            />
          </PrivateRoute>
          <PrivateRoute path="/Teacher" exact>
           
          </PrivateRoute>
          <PrivateRoute path="/Teacher/new-test" exact>
           <TestList/>
          </PrivateRoute>
          <PrivateRoute path="/Teacher/banned" exact>
           <BanList/>
          </PrivateRoute>
          <PrivateRoute path="/" exact>
            <div className="container text-center mt-3  ">
              {props.isLoading === false ? (
                <button className="btn btn-primary " onClick={handleRedirect}>
                  Nhấn vào để qua trang nhập mã bài thi
                </button>
              ) : (
                <button
                  className="btn btn-primary "
                  disabled
                  onClick={props.handleRedirect}
                >
                  Đang chuyển trang vui lòng chờ...
                </button>
              )}
            </div>
          </PrivateRoute>   
          {/* </>
          } */}
          <Route path="*" exact>
            <div
              className="container d-flex justify-content-center align-items-center "
              style={{ height: "30rem" }}
            >
              <h1>404 Not Found</h1>
            </div>
          </Route>
        </Switch>
        </>
    )
}
export default AppRoutes
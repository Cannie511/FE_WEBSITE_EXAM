import { useContext, useEffect, useState } from "react"
import {UserContext} from "../Context/UserContext";
import "./Login.scss"
import {apiLogin} from "../../services/APIServices"
import { useHistory,useParams } from "react-router-dom/cjs/react-router-dom.min";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from "react-toastify";

const Login =(props)=>{
    const history = useHistory();
    let {rolename} = useParams();
    const [switchbtn, setSwitchbtn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')
    const {login} = useContext(UserContext);
    const [auth, setAuth] = useState(JSON.stringify(false));
    const [validUsername, setValidUsername] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    const [pending, setPending] = useState(false);
    const handleChangeRole = (name) =>{
        history.push(`/login/${name}`)
    }
    
    const handleLoginWithStudent =async(event)=>{
        props.login(true)
        event.preventDefault()
        // console.log(user);
        setPending(true);
        if(!username){
            setValidUsername(false);
            setPending(false);
        }
        else setValidUsername(true)
        if(!password){
            setValidPassword(false)
            setPending(false);
        }
        else setValidPassword(true)
        if(username && password){
            try {
                let res = await apiLogin(username, password);
                // console.log("check login: ",res.status);
                if(res && res.data && res.status === 200){
                    login(username);
                    setPending(false);
                    localStorage.setItem("email", username);
                    localStorage.setItem("login",JSON.stringify(true));
                    localStorage.setItem("role",2);
                    localStorage.setItem("token",res.data.token);
                    toast("xin chào "+ username);
                    history.push("/IdTest");
                    
                }
            } catch (error) {
                // console.log(error.response);
                setValidUsername(false)
                setPending(false);
            }
        }
        else {
            history.push("/login/sv");
        };
    }
    const handleLoginWithTeacher = async(event)=>{
        props.login(true)
        event.preventDefault()
        // console.log(user);
        // history.push("/Teacher")
        setPending(true);
        if(!username){
            setValidUsername(false)
            setPending(false);
        }
        else setValidUsername(true)
        if(!password){
            setValidPassword(false)
            setPending(false);
        }
       
        if(username && password){
            try {
                let res = await apiLogin(username, password);
                // console.log("check login: ",res.status);
                if(res && res.data && res.status === 200){
                    login(username);
                    setPending(false);
                    localStorage.setItem("email", username);
                    localStorage.setItem("login",JSON.stringify(true));
                    localStorage.setItem("role",1);
                    localStorage.setItem("token",res.data.token);
                    history.push("/Teacher/new-test");
                    
                }
            } catch (error) {
                // console.log(error.response);
                setValidUsername(false)
                setPending(false);
            }
        }
        else {
            history.push("/login/gv");
        };
    }
    const handleRegister =()=>{
        history.push("/register")
    }
    // const handleSwitchBtn =()=>{
    //     setSwitchbtn(!switchbtn)
    // }
    useEffect(()=>{
        let authen = localStorage.getItem("login");
        let role = localStorage.getItem("role")
        // console.log("session: ", authen);
        if(authen === null) setAuth(false)
        else setAuth(true);
        if(password!==''||username!==''){
            setValidPassword(true);
            setValidUsername(true);
        }
        if(auth === true){
            // console.log("check auth:" , auth)
            if(+role === 1){
                history.push("/Teacher/new-test");
            }
            if(+role === 2){
                history.push("/IdTest");
            }
           
        } 
        props.login(false)
        // console.log("role: ",rolename)
    },[window.location.pathname,auth, password, username])
    return(
        auth === false && (
            <>
        <div className="container login">
            <div className="row">
                <div className="col-6 py-5 d-sm-block d-none">
                    <div className="logo">
                        QuizTest
                    </div>
                    <div className="slogan">
                        Sức Trẻ - Trí Tuệ - Ước Vọng
                    </div>
                </div>
                <div className="col-12 col-sm-6 ">
                    <div className="form-container col-12 col-sm-7 py-3 px-2">
                    {rolename === "gv" ?
                        (
                            <form onSubmit={(event)=>handleLoginWithTeacher(event)}>
                            <div className="logo-sm d-sm-none d-block">
                                QuizTest
                            </div>
                        <div className="container col-12">
                        <div className="text-center text-sm-start">
                            <h2 >Giảng Viên</h2>
                            </div>
                            <hr />
                            <div> 
                                <label htmlFor="username"  style={{color:"gray"}}>Mã Giảng Viên (eve.holt@reqres.in)</label>
                                <input type="text" id="username" value={username} onChange={(event)=>setUsername(event.target.value)} 
                                className={validUsername === true ? "form-control":"form-control is-invalid"} placeholder="Tên đăng nhập"/>
                            </div>
                            <div className="mt-3">
                                <label htmlFor="password" style={{color:"gray"}}>Mật khẩu</label>
                                <input type="password" id="password" value={password} onChange={(event)=>setPassword(event.target.value)} 
                                className={validPassword === true ? "form-control":"form-control is-invalid"} placeholder="Mật khẩu"/>
                            </div>
                            <div className="mt-3 text-center">
                                <button className="btn btn-success" disabled={pending?true:false} onClick={(event)=>handleLoginWithTeacher(event)}>
                                    Đăng Nhập {pending && <FontAwesomeIcon icon="fa-solid fa-spinner fa-spin-pulse fa-spin-reverse" spin/>}  
                                </button>
                            </div>
                            
                            <hr />
                            <div className="mt-3 text-center">
                            <button className="btn btn-danger w-75" onClick={()=>handleChangeRole("sv")}>Đăng Nhập Với Sinh Viên</button>
                            </div>
                        </div>
                        
                    </form>
                    ):(
                        <form onSubmit={(event)=>handleLoginWithStudent(event)}>
                             <div className="logo-sm d-sm-none d-block">
                                QuizTest
                            </div>
                        <div className="container col-12">
                            <div className="text-center text-sm-start">
                            <h2 >Sinh Viên</h2>
                            </div>
                            <hr />
                            <div> 
                                <label htmlFor="username" style={{color:"gray"}}>Tên đăng nhập (eve.holt@reqres.in)</label>
                                <input type="text" id="username" value={username} onChange={(event)=>setUsername(event.target.value)} 
                                className={validUsername === true ? "form-control":"form-control is-invalid"} placeholder="Tên đăng nhập"/>
                            </div>
                            <div className="mt-3">
                                <label htmlFor="password" style={{color:"gray"}}>Mật khẩu</label>
                                <input type="password" id="password"  value={password} onChange={(event)=>setPassword(event.target.value)} 
                                className={validPassword === true ? "form-control":"form-control is-invalid"} placeholder="Mật khẩu"/>
                            </div>
                            <div className="mt-3 text-center">
                                <button className="btn btn-success" onClick={handleLoginWithStudent} disabled={pending?true:false}>
                                Đăng Nhập {pending && <FontAwesomeIcon icon="fa-solid fa-spinner fa-spin-pulse fa-spin-reverse" spin/>}  
                                    </button>
                            </div>
                            <hr />
                            <div className="mt-3 text-center">
                                <button type="button" className="btn btn-primary w-75" onClick={handleRegister}>Đăng Ký Tài Khoản</button>
                            </div>
                            
                                <div className="mt-3 text-center">
                                    <button className="btn btn-danger w-75" onClick={()=>handleChangeRole("gv")}>Đăng Nhập Với Giảng Viên</button>
                                </div>
                            
                            {/* <div class="form-check form-switch" onClick={()=>handleSwitchBtn()}>
                            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" />
                            
                            </div> */}
                        </div>
                        
                    </form>
                    )}
                    
                    </div>
                </div>
            </div>
        </div></>
        
    )
    )
}
export default Login

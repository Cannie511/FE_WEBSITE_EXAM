import { useEffect, useState } from "react"
import "./Register.scss"
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { apiRegister } from "../../services/APIServices";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Register =(props)=>{
    const history = useHistory();
    const {rolename} = useParams();
    //handle input value
    const [username, setUsername] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [password, setPassword] = useState();
    const [reEnter, setReEnter] = useState();
    //validate
    const [validusername, setValidUsername] = useState(false);
    const [validfirstName, setValidFirstName] = useState(false);
    const [validlastName, setValidLastName] = useState(false);
    const [validpassword, setValidPassword] = useState(false);
    const [validreEnter, setValidReEnter] = useState(false);
    const [requirePass, setRequirePassword] = useState(false);
    //exist email
    const [isExist, setIsExist] = useState(false);
    //pending
    const [pending, setPending] = useState(false);
    const handleRegister = async()=>{
        if(!username){
            setValidUsername(true)
        }
        if(!firstName){
            setValidFirstName(true)
        }
        if(!lastName){
            setValidLastName(true)
        }
        if(!password || password.length < 6){
            setValidPassword(true)
            setRequirePassword(true)
        }
        if(!reEnter){
            setValidReEnter(true)
        }
        if(password !== reEnter){
            setValidReEnter(true)
        }
        if(username && password && password.length >=6 && firstName && lastName && password === reEnter){
            setPending(true)
            try {
                const name = firstName + ' ' + lastName;
                let res = await apiRegister(name, username, password);
                if(res && res.status === 200){
                    toast.success("Đăng ký tài khoản thành công");
                    history.push("/login/sv");
                }
                else{
                    setValidUsername(true);
                    setIsExist(true);
                }
                setPending(false)
                console.log(res.status);
            } catch (error) {
                setValidUsername(true);
                setIsExist(true);
                setPending(false)
            }
        }
    }
    const handleBack = ()=>{
        window.history.back();
    }
    useEffect(()=>{
        if(username){
            setValidUsername(false);
            setIsExist(false);
        }
        if(firstName){
            setValidFirstName(false)
        }
        if(lastName){
            setValidLastName(false)
        }
        if(password){
            setValidPassword(false)
            setRequirePassword(false)
        }
        if(reEnter){
            setValidReEnter(false)
        }
        // sessionStorage.removeItem("key");
    },[username, password, firstName, lastName, reEnter])
    return(
        <div className="container register">
            <div className="row">
            <div className="col-6 py-5 d-md-block d-none">
                    <div className="logo">
                        QuizTest
                    </div>
                    <div className="slogan">
                        Sức Trẻ - Trí Tuệ - Ước Vọng
                    </div>
            </div>
                <div className="col-12 col-sm-6">
                    <div className="form-container col-12 col-sm-7 py-3 px-2">
                        <form action="">
                            <div className="logo-sm d-sm-none d-block">
                                QuizTest
                            </div>
                            <div className="container">
                                <div className="row ">
                                <h3>Đăng Ký Tài Khoản Sinh Viên</h3>
                                <hr />
                                <div className="mt-3 col-3"> 
                                    <label htmlFor="username" style={{color:"gray"}}>Họ</label>
                                    <input type="text" id="username" value={firstName} onChange={(event)=>setFirstName(event.target.value)} 
                                    className={validfirstName === true? "form-control is-invalid":"form-control"} placeholder="Họ"/>
                                </div>
                                <div className="mt-3 col-9"> 
                                    <label htmlFor="username" style={{color:"gray"}}>Tên</label>
                                    <input type="text" id="username" value={lastName} onChange={(event)=>setLastName(event.target.value)} 
                                    className={validlastName === true? "form-control is-invalid":"form-control"} placeholder="Tên và Tên Lót"/>
                                </div>
                                <div className="mt-3 col-12"> 
                                    <label htmlFor="username" style={{color:"gray"}}>Tên Đăng Nhập</label>
                                    <input type="text" id="username" value={username} onChange={(event)=>setUsername(event.target.value)} 
                                    className={validusername === true? "form-control is-invalid":"form-control"} placeholder="Tên đăng nhập"/>
                                </div>
                                {isExist === true &&
                                <div className="text-center mt-1" style={{color:"red"}}>Email này tồn tại</div>
                                }
                                <div className="mt-3 col-6">
                                    <label htmlFor="password" style={{color:"gray"}}>Mật khẩu</label>
                                    <input type="password" id="password" value={password} onChange={(event)=>setPassword(event.target.value)} 
                                    className={validpassword === true? "form-control is-invalid":"form-control"} placeholder="Mật khẩu"/>
                                </div>
                                <div className="mt-3 col-6">
                                    <label htmlFor="password" style={{color:"gray"}}>Nhập Lại Mật khẩu</label>
                                    <input type="password" id="reenter" value={reEnter} onChange={(event)=>setReEnter(event.target.value)} 
                                    className={validreEnter === true? "form-control is-invalid":"form-control"} placeholder="Xác Nhận Mật khẩu"/>
                                </div>
                                {requirePass === true &&
                                    <div className="text-center mt-1" style={{color:"red"}}>Mật khẩu phải chứa tối thiểu 6 ký tự</div>
                                }
                                <div className="mt-3 text-center">
                                    <button type="button" className="btn btn-success w-100" disabled={pending === true ? true:false} onClick={()=>handleRegister()}>Đăng Ký Mới {pending === true ? <Loading/>:<FontAwesomeIcon icon="fa-solid fa-user-plus" />}</button>
                                </div>
                                <hr className="mt-3" />
                                <div className="mt-3 text-center">
                                    <span>Đã có tài khoản? 
                                        &nbsp;<Link className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" to="/login/sv">Đăng nhập</Link></span>
                                </div>
                                </div>
                            </div>
                        </form> 
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register

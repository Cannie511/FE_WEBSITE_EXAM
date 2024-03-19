import { useEffect, useState } from "react"
import "./Register.scss"
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
const Register =(props)=>{
    const history = useHistory();
    const {rolename} = useParams();
    const handleRegister =()=>{

    }
    const handleBack = ()=>{
        window.history.back();
    }
    useEffect(()=>{
        sessionStorage.removeItem("key");
    },[])
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
                                    <input type="text" id="username" className="form-control" placeholder="Họ"/>
                                </div>
                                <div className="mt-3 col-9"> 
                                    <label htmlFor="username" style={{color:"gray"}}>Tên</label>
                                    <input type="text" id="username" className="form-control" placeholder="Tên và Tên Lót"/>
                                </div>
                                <div className="mt-3 col-12"> 
                                    <label htmlFor="username" style={{color:"gray"}}>Tên Đăng Nhập</label>
                                    <input type="text" id="username" className="form-control" placeholder="Tên đăng nhập"/>
                                </div>
                                <div className="mt-3 col-6">
                                    <label htmlFor="password" style={{color:"gray"}}>Mật khẩu</label>
                                    <input type="password" id="password" className="form-control" placeholder="Mật khẩu"/>
                                </div>
                                <div className="mt-3 col-6">
                                    <label htmlFor="password" style={{color:"gray"}}>Nhập Lại Mật khẩu</label>
                                    <input type="password" id="reenter" className="form-control" placeholder="Xác Nhận Mật khẩu"/>
                                </div>
                                <div className="mt-3 text-center">
                                    <button className="btn btn-success w-100" onClick={handleRegister}>Đăng Ký Mới</button>
                                </div>
                                <hr className="mt-3" />
                                <div className="mt-3 text-center">
                                    <span>Đã có tài khoản? 
                                        <Link className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" to="/login/sv">Đăng nhập</Link></span>
                                    {/* <button className="btn btn-link w-75">Đăng nhập</button> */}
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

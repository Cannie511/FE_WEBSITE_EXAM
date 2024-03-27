import { useContext, useEffect } from "react"
import "../Mark/Mark.scss"
import { UserContext } from "../Context/UserContext"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Mark = (props)=>{
    const {testname} =useContext(UserContext);
    const history = useHistory();
    useEffect(()=>{
        props.start(false);
    },[]);
    const backToIndex = ()=>{
        history.push("/IdTest");
    }
    return(
        <div className="container mark-container d-flex justify-content-center">
            <div className="col-12 col-sm-6" >
                <div className="mark" style={{backgroundColor:props.mark >= 5 ? "#90EE90":"#ee2e08ce"}}>
                    <div className="text-center p-3">
                        <h1>ĐIỂM CỦA BẠN:</h1>
                    </div>
                    <div className="container px-3">
                        {/* <div>
                            <b>Sinh Viên: </b>{props.sv}
                        </div>
                        <div>
                            <b>Bài thi: </b>{testname}
                        </div>
                        <div>
                            <b>Số câu đúng: </b>{props.countTrue}/{props.totalQues}
                        </div>
                        <div>
                            <b>Điểm: </b> <h1>{props.mark}</h1>
                        </div>
                        <div>
                            <b>Đánh Giá: </b>{props.mark >=5 ? "Đạt":"Không Đạt"}
                        </div> */}
                        <div className="row">
                            <div className="col-4"><strong>sinh viên: </strong></div>
                            <div className="col-8">{props.sv}</div>
                            <div className="col-4"><strong>Bài Thi: </strong></div>
                            <div className="col-8">{testname}</div>
                            <div className="col-4"><strong>số câu đúng: </strong></div>
                            <div className="col-8">{props.countTrue}/{props.totalQues}</div>
                            <div className="col-4"><strong>Đánh giá: </strong></div>
                            <div className="col-8">{props.mark >=5 ? "Đạt":"Không Đạt"}</div>
                            <div className="col-12 text-center"><strong>Số điểm:</strong></div>
                            <div className="col-12 text-center"><h1 style={{fontSize:"2.5rem"}}><strong>{props.mark}</strong></h1></div>
                        </div>
                        <div className="container my-2">
                            <button className="btn btn-warning w-100" onClick={()=>backToIndex()}><FontAwesomeIcon icon="fa-solid fa-house-chimney" /> <b>Quay lại trang chủ</b></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Mark
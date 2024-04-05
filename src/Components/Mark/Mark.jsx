import { useContext, useEffect, useState } from "react"
import "../Mark/Mark.scss"
import { UserContext } from "../Context/UserContext"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { apiSaveMark } from "../../services/APIServices";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
const Mark = (props)=>{
    const {testname} = useContext(UserContext);
    const [idExam, setIdExam] = useState();
    const [idUser, setIdUser] = useState();
    const [pending, setPending] = useState(false);
    const history = useHistory();
    const saveMark = async(count, mark, exam, user) =>{
        setPending(true);
        let res = await apiSaveMark(count, mark, exam, user);
        if(res && res.status === 200){
            toast.success("Nộp bài thành công");
            if(sessionStorage.getItem("dethi_id")) sessionStorage.removeItem("dethi_id");
            setPending(false);
        }
    }
    useEffect(()=>{
        props.start(false);
        if(sessionStorage.getItem("dethi_id")) setIdExam(+sessionStorage.getItem("dethi_id"));
        if(localStorage.getItem("token")) setIdUser(+localStorage.getItem("token"))
        if(idExam && idUser && props.mark && props.countTrue){
            saveMark( props.countTrue, props.mark, idExam,idUser);
        }
    },[idExam, idUser]);
    const backToIndex = ()=>{
        history.push("/IdTest");
        window.location.reload();
    }
    return(
        <div className="container mark-container d-flex justify-content-center">
            <div className="col-12 col-sm-6" >
                <div className="mark" style={pending ? {backgroundColor:"white"} : {backgroundColor:props.mark >= 5 ? "#90EE90":"#ee2e08ce"}}>
                    <div className="text-center p-3">
                        <h1>ĐIỂM CỦA BẠN:</h1>
                    </div>
                    <div className="container px-3">
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
                            <div className="col-12 text-center"><h1 style={{fontSize:"2.5rem"}}><strong>{pending ? <Spinner animation="border" style={{color:"#6C7EE1"}}/>: props.mark}</strong></h1></div>
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
import { useContext, useEffect } from "react"
import "../Mark/Mark.scss"
import { UserContext } from "../Context/UserContext"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
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
                <div className="mark" style={{backgroundColor:props.mark >= 5 ? "#90EE90":"#FF4500"}}>
                    <div className="text-center p-3">
                        <h1>ĐIỂM CỦA BẠN:</h1>
                    </div>
                    <div className="container p-3">
                        <div>
                            <b>Sinh Viên: </b>{props.sv}
                        </div>
                        <div>
                            <b>Bài thi: </b>{testname}
                        </div>
                        <div>
                            <b>Số câu đúng: </b>{props.countTrue}/{props.totalQues}
                        </div>
                        <div>
                            <b>Điểm: </b>{props.mark}
                        </div>
                        <div>
                            <b>Đánh Giá: </b>{props.mark >=5 ? "Đạt":"Không Đạt"}
                        </div>
                        <div className="container mt-1">
                            <button className="btn btn-primary w-100" onClick={()=>backToIndex()}>Quay lại trang chủ</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Mark
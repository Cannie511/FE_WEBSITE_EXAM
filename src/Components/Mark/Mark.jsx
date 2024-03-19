import { useEffect } from "react"
import "../Mark/Mark.scss"

const Mark = (props)=>{
    useEffect(()=>{
        props.start(false);
    },[])
    return(
        <div className="container mark-container d-flex justify-content-center">
            <div className="col-12 col-sm-6" >
                <div className="mark" style={{backgroundColor:props.mark >= 5 ? "#90EE90":"#FF4500"}}>
                    <div className="text-center p-3">
                    <h1>ĐIỂM CỦA BẠN:</h1>
                    </div>
                <div className="p-3">
                    <div>
                        <b>Sinh Viên: </b>{props.sv}
                    </div>
                    <div>
                        <b>Bài thi: </b>{props.subTest}
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
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Mark
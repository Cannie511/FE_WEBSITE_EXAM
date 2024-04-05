import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import "./NewTest.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from "react";
const NewTest =(props)=>{
    const history = useHistory();
   
    const handleDetailExam = (id)=>{
        history.push(`/Teacher/test/detail/${id}`);
    }
    return(<>
            <div className="col-sm-3 container card my-2 mx-sm-3" onClick={()=>handleDetailExam(props.item.id)}>
                <div className="card-body">
                    <div className=" content-test col-11 float-start d-flex flex-column justify-content-center">
                        <div className="row my-1" ><div style={{fontSize:".8rem"}}>Môn Thi:</div><div className="col-12 sub-name"><b>{props.item.tendethi}</b></div></div>
                            <div className="row mt-2">
                                <div className="col-6">Câu hỏi: {props.item.soluongcauhoi}</div>
                                <div className="col-6"><FontAwesomeIcon icon="fa-solid fa-clock" style={{color: "#a9bd60",}} size="lg"/> : 60p</div>
                            </div> 
                            <div className="row mt-1" >
                                <div className="col-6"><FontAwesomeIcon icon="fa-solid fa-circle-check" size="lg" style={{color: "#49ee5c",}} /> : {props.item.ketqua_count}</div>
                                <div className="col-6">{+props.item.trangthai===0?<span className="badge rounded-pill text-bg-warning">Bản Nháp</span>:<span className="badge rounded-pill text-bg-success">Công Khai</span>}</div>
                            </div> 
                    </div> 
                </div>
            </div>
    </>)
}
export default NewTest
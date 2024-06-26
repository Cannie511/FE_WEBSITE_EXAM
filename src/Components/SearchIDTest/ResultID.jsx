import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ResultID = (props)=>{
    const history = useHistory();
    const handleGoTest =(id)=>{
        history.push(`/IdTest/${id}`);
    }
    return(
        <>
        <div className="card container m-auto mt-2" key={props.item.id}>
            <div className="card-body row p-2 ">
                <div className="col-9">
                    <b>Môn: {props.item.tendethi}</b><br />
                    <sub>thời gian: {props.item.thoigianthi}p</sub><br />
                    <sub>Số câu hỏi: {props.item.soluongcauhoi} câu</sub><br />
                    {/* <sub>Số lần làm: 1</sub>  */}
                </div>
                <div className="col-3 d-flex align-items-center justify-content-end">
                    <button className="btn btn-success float-end" onClick={()=>handleGoTest(props.item.id)}><FontAwesomeIcon icon="fa-solid fa-door-open" /></button>
                </div>
            </div>
        </div>
        </>
    )
}
export default ResultID
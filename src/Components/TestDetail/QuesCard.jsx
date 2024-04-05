import { UserContext } from "../Context/UserContext";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { apiDeleteQuestion, apiGetDetailExamForStu } from "../../services/APIServices";
import { toast } from "react-toastify";
import { Button, Modal } from 'react-bootstrap';
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Loading from "../Loading/Loading";
const QuesCard = (props) =>{
    let {id} = useParams();
    const [listQues, setListQues] = useState([]);
    const [isEdited, setEdited] = useState(false);
    const [showModal, setShowModal]= useState(false);
    const [pending, setPending]= useState(false);
    const [status, setStatus] = useState();
    const handleEdit =()=>{
        setEdited(true);
    }
    const handleGetListQues = async()=>{
        let res = await apiGetDetailExamForStu(id);
        console.log(res)
        if(res && res.data){
            setListQues(res.data.cauhoi);
            setStatus(res.data.trangthai);
        }
        
    }
    useEffect(()=>{
        handleGetListQues();
    },[])
    const handleEditQues=(noidung, a,b,c,d,dapan, id,idcauhoi)=>{
        props.title(noidung);
        props.choiceA(a);
        props.choiceB(b);
        props.choiceC(c);
        props.choiceD(d);
        props.trueChoice(dapan);
        props.idCauhoi(idcauhoi)
        props.quesId(id)
        props.form(true);
        props.editbtn(true);
    }
    const handleDeleteQues =async(id)=>{
        try {
            let user_id = +localStorage.getItem("token");
            if(user_id && id){
                let deleteArray = listQues.filter(x=>x.id!==id);
                setListQues(deleteArray);
                let res = await apiDeleteQuestion(id, user_id);
                if(res && res.status === 200){
                    toast.success("Đã xóa câu hỏi")
                }
                else{
                    toast.error("Không xóa được");
                }
            }
        } catch (error) {
            console.log(error);
            toast.error("Đã xảy ra lỗi");
        }
        
    }
    return (
        <>
            { listQues && listQues.length > 0 && listQues.map((item, index)=>{
                return(
                    <>
                        <div key={index} className="col-sm-5 col-12 mx-sm-2 card my-1 mx-sm-4">
                            <div className="card-body row p-2">
                                <div className="col-9"><strong>Câu {index +1}: {item.noidung}</strong></div>
                                {+status === 0 &&
                                <div className="col-3">
                                    <button className="btn btn-link" onClick={()=>handleEditQues(item.noidung, item.dap_an_a, item.dap_an_b, item.dap_an_c,item.dap_an_d, item.dap_an_dung, index+1, item.id)}><FontAwesomeIcon  icon="fas fa-edit" style={{color: "#74C0FC",cursor:"pointer"}}/></button>
                                    <button className="btn btn-link" onClick={()=>handleDeleteQues(item.id)}><FontAwesomeIcon icon="fas fa-trash-alt" style={{color: "#e52437",}} /></button>
                                </div>}
                               
                                    {item.dap_an_dung === "A" ? <strong>Câu A: {item.dap_an_a}</strong>:<span>Câu A: {item.dap_an_a}</span>}<br />
                                    {item.dap_an_dung === "B" ? <strong>Câu B: {item.dap_an_b}</strong>:<span>Câu B: {item.dap_an_b}</span>}<br />
                                    {item.dap_an_dung === "C" ? <strong>Câu C: {item.dap_an_c}</strong>:<span>Câu C: {item.dap_an_c}</span>}<br />
                                    {item.dap_an_dung === "D" ? <strong>Câu D: {item.dap_an_d}</strong>:<span>Câu D: {item.dap_an_d}</span>}<br />
                            
                                
                            </div>
                        </div>
                    </>
                )
            })}
            {listQues.length === 0 && <div className="container px-4">Chưa có câu hỏi nào...</div>}
            <Modal show={showModal} onHide={()=>setShowModal(false)} backdrop="static" keyboard={false} centered>
                <Modal.Header closeButton>
                <Modal.Title>Thông báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                Bạn có chắc chắc muốn xóa đề thi <b></b> không ?
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={()=>setShowModal(false)}>
                    Hủy
                </Button>
                <Button variant="success" disabled={pending?true:false}>Đồng ý {pending && <Loading/>}</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default QuesCard
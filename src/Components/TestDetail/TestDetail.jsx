import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"
import "./TestDetail.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  useEffect, useState } from "react";
import { Accordion, Button, Modal } from 'react-bootstrap';
import QuesCard from "./QuesCard";
import { apiAddNewQuesToExam, apiDeleteDraftExam, apiEditDraftExam, apiEditQuestion, apiGetDetailExamForStu, apiGetListMarkExam } from "../../services/APIServices";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";
import AddQuestion from "../AddQuestion/AddQuestion";
const TestDetail = ()=>{
    const history = useHistory()
    const {id} = useParams();
    const [showQues, setShowQues] = useState(false);
    const [isEdited, setIsEdited] = useState(false);
    const [status, setStatus] = useState();
    const [testName, setTestName]=useState();
    const [time, setTime]=useState();
    const [countQues, setCountQues]=useState()
    const [listQues, setListQues] = useState([])
    const [userId, setUserId]=useState(+localStorage.getItem("token"));
    const [id_cauhoi, setIdCauhoi]=useState();
    const [listMark, setListMark]=useState([]);
    const [pendingListMark, setPendingMark]=useState(false);
    // const [flagEdit, setFlagEdit] = useState(false);
    // Modal
    const [noti, setNoti]=useState();
    const [showModal, setShowModal]=useState(false);
    const [pending, setPending]=useState(false);
    // form add new
    const [form, showForm]=useState(false)
    const [title, setTitle] = useState('');
    const [trueChoice, setTrueChoice] = useState('A');
    const [choiceA, setChoiceA] = useState('')
    const [choiceB, setChoiceB] = useState('')
    const [choiceC, setChoiceC] = useState('')
    const [choiceD, setChoiceD] = useState('')
    const [quesId, setQuesId]=useState();
    const [editBtn, setEditBtn]=useState(false)
    const getDetailExam = async()=>{
        let res = await apiGetDetailExamForStu(id);
        if(res && res.data){
            setStatus(res.data.trangthai)
            setTestName(res.data.tendethi);
            setTime(res.data.thoigianthi)
            setCountQues(res.data.soluongcauhoi)
            setListQues(res.data.cauhoi)
        }
    }
    const getMarkListExam = async()=>{
        setPendingMark(true)
        let res = await apiGetListMarkExam(id, userId);
        if(res && res.data){
            setListMark(res.data.ketqua)
            setPendingMark(false);
        }
    }
    const handleDeleteExam = async(userId, Id)=>{
        try {
            setPending(true);
            let res = await apiDeleteDraftExam(userId, Id);
            if(res && res.status === 200){
                toast.success(`Đã xóa ${testName} thành công!`);
                history.push("/Teacher/test");
                setPending(false)
                setShowModal(false)
            }
            else{
                toast.error("Xóa đề thi thất bại")
            }
        } catch (error) {
            console.log(error)
            toast.error("Lỗi kết nối đến máy chủ")
        }
    }
    const handleEditExam = async ()=>{
        try {
            let user_id = +localStorage.getItem("token");
            let res = await apiEditDraftExam(id, testName, time, user_id);
            if(res && res.status === 200){
                
                toast.success("Thay đổi thành công")
                setIsEdited(false)
            }
            else {
                toast.error("Thay đổi thất bại")
                setIsEdited(false)
            }
        } catch (error) {
            console.log(error)
            toast.error("Đã có lỗi xảy ra")
            setIsEdited(false)
        }
    }
    const handleEditQues = async()=>{
        try {
            setPending(true)
            if(title && choiceA && choiceB && choiceC && choiceD && trueChoice&&id_cauhoi){
                setPending(true)
                let user_id = +localStorage.getItem("token");
                let res =  await apiEditQuestion(user_id, title, choiceA, choiceB, choiceC, choiceD, trueChoice, id_cauhoi)
                if(res && res.status === 200){
                    toast.success("Thay đổi thành công");
                    let flag = false;
                    let res = await apiGetDetailExamForStu(id);
                    if(res && res.data){
                        setPending(false)
                        let array = res.data.cauhoi
                        setListQues(array)
                        setTitle('')
                        setChoiceA('')
                        setChoiceB('')
                        setChoiceC('')
                        setChoiceD('')
                        setIdCauhoi()
                        setPending(false)
                        setEditBtn(false);
                    }
                    
                }
                else{ toast.error("Thay đổi thất bại")
                setPending(false)}
            }
        } catch (error) {
            console.log(error);
            toast.error("Đã có lỗi xảy ra")
            setPending(false)
        }
        
    }
    const handleAddNewQues = async()=>{
        try {
            setPending(true)
            if(title && choiceA && choiceB && choiceC && choiceD && trueChoice){
                let res = await apiAddNewQuesToExam(title,choiceA,choiceB,choiceC,choiceD,trueChoice,id);
                if(res && res.status===200){
                    let obj = {
                        noidung: title,
                        dap_an_a: choiceA,
                        dap_an_b:choiceB,
                        dap_an_c:choiceC,
                        dap_an_d: choiceD,
                        dap_an_dung: trueChoice
                    }
                    let addtemp = [...listQues];
                    setListQues([...addtemp,obj]);
                    setPending(false)
                    toast.success("Đã thêm 1 câu hỏi mới")
                }
                else {
                    setPending(false)
                    toast.success("Thêm mới thất bại")
                }
            }
        } catch (error) {
            console.log(error);
            toast.success("Đã có lỗi xảy ra");
        }
    }
    const handleModal = (mode) =>{
        setNoti(mode);
        setShowModal(true);
    }
    useEffect(()=>{
        getDetailExam()
        getMarkListExam()
    },[])
    return(
        <>
        <div className="container mt-3 mt-sm-1 px-md-5" >
            <div className="row">
                <div className="col-1"></div>
                <div className="col-12 col-sm-11 py-5 py-sm-3">
                    <div className="container detail-test" key={1}>
                        <div className="row px-sm-2 py-3">
                            <div>
                                <h5>Đề thi: <span style={{color:"green"}}>{id}</span>&nbsp;{+status === 0 ? <span className="badge rounded-pill text-bg-warning">Bản nháp</span>:<span className="badge rounded-pill text-bg-success">Công Khai</span>}
                                {+status === 0 &&<>
                                {isEdited === true ? 
                                <>&nbsp;<button className="btn btn-success" style={{"--bs-btn-font-size":".75rem"}} onClick={()=>handleEditExam()}><FontAwesomeIcon icon="fa-solid fa-circle-check"/> xác nhận</button></>
                                : 
                                <button className="btn btn-link" onClick={()=>setIsEdited(true)}><FontAwesomeIcon icon="fas fa-edit" style={{color: "#74C0FC",}} /></button>
                                }
                                {+status === 0 && 
                                <>
                                    <button className="btn btn-link" onClick={()=>handleModal(1)}><FontAwesomeIcon icon="fas fa-trash-alt" style={{color: "#e52437",}} /></button>
                                    <button className="btn btn-link" onClick={()=>handleModal(2)}><FontAwesomeIcon icon="fa-solid fa-circle-check"style={{color: "green",}}  /></button>
                                </>
                                }
                                </>
                                }
                                </h5>
                            </div>
                            <div className="container">
                                <div className="row col-sm-6 py-1">
                                    <div className="col-sm-4 col-5">
                                    <strong>Môn thi: </strong>
                                    </div>
                                    <div className="col-sm-8 col-7">
                                    {isEdited === true ? <><input type="text" value={testName} onChange={(event)=>setTestName(event.target.value)} className="form-control" /></>
                                    :
                                    <><strong> {testName}</strong></>
                                    }
                                    </div>
                                </div>
                                <div className="row col-sm-6 py-1">
                                    <div className="col-sm-4 col-5">
                                    <strong>Thời gian: </strong>
                                    </div>
                                    <div className="col-sm-8 col-7">
                                    {isEdited === true ? <><input type="number" value={time} onChange={(event)=>setTime(event.target.value)} className="form-control" /></>
                                    :
                                    <><strong> {time} phút</strong></>
                                    }
                                    </div>
                                </div>
                                <div className="row col-sm-6 py-1">
                                    <div className="col-sm-4 col-5">
                                    <strong>Số lượng câu hỏi: </strong>
                                    </div>
                                    <div className="col-sm-8 col-7">
                                    <strong> {countQues} câu</strong>
                                    </div>
                                </div>
                                <hr />
                                <div className="row col-sm-12 py-1">
                                    <Accordion defaultActiveKey="0"  style={{ border: 'none' }}>
                                    <Accordion.Item eventKey="1">

                                        <Accordion.Header className="col-sm-3 " onClick={()=>setShowQues(!showQues)}>
                                            {showQues === false ? 
                                                <>
                                                <FontAwesomeIcon icon="fas fa-eye" />&nbsp; Xem câu hỏi . . . 
                                                </> :<>
                                                <FontAwesomeIcon icon="fas fa-eye-slash" />&nbsp; Ẩn câu hỏi
                                                </>
                                            }
                                        </Accordion.Header>
                                        <Accordion.Body>
                                        
                                        <div className="row">
                                            {+status === 0 &&
                                            <div className="row my-3">
                                                <div className="col-12">
                                                    {form ? <button className="btn btn-danger " onClick={()=>showForm(false)}><FontAwesomeIcon icon="fa-solid fa-circle-minus" /></button> :
                                                     <button className="btn btn-success " onClick={()=>showForm(true)}><FontAwesomeIcon icon="fa-solid fa-circle-plus" /></button>}
                                                     {form &&
                                                        <div className="container ques col-12 my-1 py-3 px-3 px-sm-5">
                                                        <div className="row">
                                                            <div className="col-sm-8 col-12">
                                                                <b>Câu hỏi số {quesId}:</b>
                                                                <textarea type="text" value={title} onChange={(event)=>setTitle(event.target.value)} className="form-control" placeholder="nội dung câu hỏi"/>
                                                            </div>
                                                            <div className="col-6 col-sm-4">
                                                                <b>Đáp án đúng:</b>
                                                                <select className="form-select" value={trueChoice} onChange={(event)=>setTrueChoice(event.target.value)}>
                                                                    <option defaultValue={true} value="A">A</option>
                                                                    <option value="B">B</option>
                                                                    <option value="C">C</option>
                                                                    <option value="D">D</option>
                                                                </select>
                                                                
                                                            </div>
                                                        </div>
                                                        <div className="row my-2">
                                                            <div className="col-12 d-flex align-items-center">
                                                                <label htmlFor="" className="col-sm-2 col-3">Câu A:</label>
                                                                <input type="text" value={choiceA} onChange={(event)=>setChoiceA(event.target.value)} 
                                                                className="form-control " placeholder="Đáp án A"/>
                                                            </div>
                                                        </div>
                                                        <div className="row my-2">
                                                            <div className="col-12 d-flex align-items-center">
                                                                <label htmlFor="" className="col-sm-2 col-3">Câu B:</label>
                                                                <input type="text" value={choiceB} onChange={(event)=>setChoiceB(event.target.value)} className="form-control " placeholder="Đáp án B"/>
                                                            </div>
                                                        </div>
                                                        <div className="row my-2">
                                                            <div className="col-12 d-flex align-items-center">
                                                                <label htmlFor="" className="col-sm-2 col-3">Câu C:</label>
                                                                <input type="text" value={choiceC} onChange={(event)=>setChoiceC(event.target.value)} className="form-control " placeholder="Đáp án C"/>
                                                            </div>
                                                        </div>
                                                        <div className="row my-2">
                                                            <div className="col-12 d-flex align-items-center">
                                                                <label htmlFor="" className="col-sm-2 col-3">Câu D:</label>
                                                                <input type="text" value={choiceD} onChange={(event)=>setChoiceD(event.target.value)} className="form-control " placeholder="Đáp án D"/>
                                                            </div>
                                                            
                                                        </div>
                                                        {editBtn ? 
                                                        <div className="row my-2">
                                                            <button className="btn btn-success" disabled={pending ? true : false} onClick={()=>handleEditQues()}>Lưu {pending && <Loading/>}</button>
                                                        </div>
                                                        :
                                                        <div className="row my-2">
                                                            <button className="btn btn-success" disabled={pending ? true : false} onClick={()=>handleAddNewQues()}>Thêm mới {pending && <Loading/>}</button>
                                                        </div>
                                                        }
                                                        
                                                    </div>
                                                    }
                                                </div>
                                            </div>
                                            }
                                            {pending === true ? <div><Loading/></div>:
                                            <QuesCard 
                                            list={listQues} 
                                            title={setTitle}
                                            choiceA={setChoiceA}
                                            choiceB={setChoiceB}
                                            choiceC={setChoiceC}
                                            choiceD={setChoiceD}
                                            trueChoice={setTrueChoice}
                                            quesId={setQuesId}
                                            idCauhoi={setIdCauhoi}
                                            form={showForm}
                                            editbtn={setEditBtn}
                                            />}
                                        </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    </Accordion>
                                </div>
                                <hr />
                                {+status === 1 &&
                                <>
                                <div className="mt-3">
                                    <h2>Danh Sách Sinh Viên Đã Nộp</h2>
                                </div>
                                <div className="container mt-3">
                                    <div className="row">
                                    <table className="table table-hover pointer col-12">
                                        <thead>
                                            <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Họ & Tên</th>
                                            <th className="text-center" scope="col">Số điểm</th>
                                            </tr>
                                        </thead>
                                        <tbody className="table-group-divider">
                                            {pendingListMark && 
                                            <tr>
                                                <td colSpan={3} className="text-center"><Loading/></td>
                                            </tr>
                                            }
                                            {!pendingListMark && listMark && listMark.length > 0 && listMark.map((item, index)=>{
                                                return(
                                                    <tr>
                                                        <th scope="row">{index+1}</th>
                                                        <td>{item.name}</td>
                                                        {item.sodiem > 5 ?
                                                        <td className="text-center" style={{color:"green"}}><b>{item.sodiem}</b></td>:
                                                        <td className="text-center" style={{color:"red"}}><b>{item.sodiem}</b></td>
                                                        }
                                                        
                                                    </tr>
                                                )
                                            })}
                                            {listMark.length===0 && 
                                                <tr>
                                                    <td colSpan={3} className="text-center"> <FontAwesomeIcon icon="fa-solid fa-clipboard-list" />Chưa có sinh viên nộp bài...</td>
                                                </tr>
                                            }
                                            
                                        </tbody>
                                    </table>
                                    </div>
                                </div> 
                                </>
                                }                             
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Modal show={showModal} onHide={()=>setShowModal(false)} backdrop="static" keyboard={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Thông báo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {+noti === 1 && <>Bạn có chắc chắc muốn xóa đề thi <b>{testName}</b> không ?</>}
            {+noti === 2 && <>Xác nhận công khai đề thi <b>{testName}</b> ? Sau khi công khai sẽ không thể thay đổi</>}                  
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setShowModal(false)}>
            Hủy
          </Button>
          <Button variant={+noti===1 ? "danger":"success"} onClick={()=>handleDeleteExam(userId, id)} disabled={pending?true:false}>Đồng ý {pending && <Loading/>}</Button>
        </Modal.Footer>
      </Modal>
        </>
    )
}
export default TestDetail
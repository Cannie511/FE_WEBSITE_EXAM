import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import "../AddQuestion/AddQuestion.scss";
import { Button, Modal } from 'react-bootstrap';
import NewQues from "./NewQues";
import { apiAddDraftExam, apiAddPublicExam } from "../../services/APIServices";
import Loading from "../Loading/Loading";
const AddNewTest = ()=>{
    const [countQues, setCountQues] = useState(0);
    const [TestName ,setTestName] = useState('')
    const [time, setTime] = useState(0);
    const [listNewQues, setListNewQues] = useState([]);
    const [title, setTitle] = useState('');
    const [trueChoice, setTrueChoice] = useState('A');
    const [choiceA, setChoiceA] = useState('')
    const [choiceB, setChoiceB] = useState('')
    const [choiceC, setChoiceC] = useState('')
    const [choiceD, setChoiceD] = useState('')
    // validator
    const [validTitle, setValidTitle] = useState(false);
    const [validA, setValidA] = useState(false)
    const [validB, setValidB] = useState(false)
    const [validC, setValidC] = useState(false)
    const [validD, setValidD] = useState(false)
    // Modal
    const [showModal, setShowModal]=useState(false);
    const [pending, setPending]=useState(false);
    const handleAddNewQues = async ()=>{
        if(!title) setValidTitle(true);
        if(!choiceA) setValidA(true);
        if(!choiceB) setValidB(true);
        if(!choiceC) setValidC(true);
        if(!choiceD) setValidD(true);
        let count = countQues;
        if(title!=='' && trueChoice!=='' && choiceA!=='' && choiceB!=='' && choiceC!=='' && choiceD!==''){
            let Question = {};
            count++;
            await setCountQues(count);
            Question = {
                id:+countQues+1,
                noidung: title,
                dap_an_dung: trueChoice,
                dap_an_a: choiceA,
                dap_an_b: choiceB,
                dap_an_c: choiceC,
                dap_an_d: choiceD
            }
            console.log("check ques: ", Question);
            const addTemp = [...listNewQues];
            if(Question!==null){
                console.log("check list: ", listNewQues);
                setListNewQues([...addTemp, Question]);
                setTitle('')
                setChoiceA('')
                setChoiceB('')
                setChoiceC('')
                setChoiceD('')
            }
        }
        // window.scrollTo({
        //     top: document.documentElement.scrollHeight,
        //     behavior: 'smooth'
        // });
    }
    const addDraftTest = async() =>{
        if(listNewQues.length>0 && TestName && time && countQues){
            try {
                let user_id = +localStorage.getItem("token");
                let res = await apiAddDraftExam(TestName, +time, +countQues,user_id, 1, listNewQues);
                console.log("check add: ", res.data)
                if(res.status === 200){
                    toast.success("Lưu nháp đề thi thành công")
                }
                else toast.error("Lưu nháp đề thi thất bại")
            } catch (error) {
                console.log("check err: ", error)
                toast.error("Có Lỗi khi thêm")
            }
        }
        else {
            toast.error("Vui lòng nhập đủ các thông tin")
        }
    }
    const addPublicTest = async()=>{
        if(listNewQues.length>0 && TestName && time && countQues){
            try {
                let user_id = +localStorage.getItem("token");
                let res = await apiAddPublicExam(TestName, +time, +countQues,user_id, 1, listNewQues);
                console.log("check add: ", res.data)
                if(res.status === 200){
                    toast.success("Công khai đề thi thành công")
                }
                else toast.error("Công khai đề thi thất bại")
            } catch (error) {
                console.log("check err: ", error)
                toast.error("Đã có lỗi xảy ra")
            }
            
        }
    }
    const handleDeleteNewQues = (id)=>{
        let deleteArray = listNewQues.filter(x=>x.id!==id);
        setListNewQues(deleteArray);
        setCountQues(countQues-1);
    }
    const handleCheckConfirm = ()=>{
        if(!TestName)
            toast.error("Tên đề thi không được trống")
        else if(listNewQues.length===0)
            toast.error("chưa có câu hỏi nào để thêm")
        else
            setShowModal(true)
    }
    useEffect(()=>{
        setValidTitle(false);
        setValidA(false);
        setValidB(false);
        setValidC(false);
        setValidD(false);
    },[title, choiceA, choiceB, choiceC, choiceD]);

    return(
        <>
            <form>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 px-2">
                            <div className="row">
                            <div className="titlte"><h2><strong>Thêm Bài Thi Mới:</strong></h2></div>
                            <div className="form-group col-12 my-2">
                                <label htmlFor="Subname">Tên Môn Thi:</label>
                                <input id="Subname" value={TestName} onChange={(event)=>setTestName(event.target.value)} className="form-control" placeholder="Tên môn thi..."/>
                            </div>
                            <div className="row">
                                <div className="form-group col-6 ">
                                    <label htmlFor="Subname">Thời lượng: (phút)</label>
                                    <input type="number" id="Subname" value={time} onChange={(event)=>setTime(event.target.value)} 
                                    className="form-control" placeholder="thời gian"/>
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="Subname">Số lượng câu hỏi:</label>
                                    {/* <input type="number" id="Subname" value={countQues} onChange={(event)=>setCountQues(event.target.value)} 
                                    className="form-control" placeholder="Số lượng"/> */}
                                    <h4 className="form-control">{countQues}</h4>
                                </div>
                                
                            </div>
                            
                            <div className="form-group col-12">
                            <div className="container ques col-12 my-1 py-3 px-3 px-sm-5">
                                <div className="row">
                                    <div className="col-sm-8 col-12">
                                        <b>Câu hỏi số {countQues+1}:</b>
                                        <textarea type="text" value={title} onChange={(event)=>setTitle(event.target.value)} className={validTitle ? "form-control is-invalid":"form-control "} placeholder="nội dung câu hỏi"/>
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
                                        className={validA===true ? "form-control is-invalid":"form-control "} placeholder="Đáp án A"/>
                                    </div>
                                </div>
                                <div className="row my-2">
                                    <div className="col-12 d-flex align-items-center">
                                        <label htmlFor="" className="col-sm-2 col-3">Câu B:</label>
                                        <input type="text" value={choiceB} onChange={(event)=>setChoiceB(event.target.value)} 
                                        className={validB ? "form-control is-invalid":"form-control "} placeholder="Đáp án B"/>
                                    </div>
                                </div>
                                <div className="row my-2">
                                    <div className="col-12 d-flex align-items-center">
                                        <label htmlFor="" className="col-sm-2 col-3">Câu C:</label>
                                        <input type="text" value={choiceC} onChange={(event)=>setChoiceC(event.target.value)} 
                                        className={validC ? "form-control is-invalid":"form-control "} placeholder="Đáp án C"/>
                                    </div>
                                </div>
                                <div className="row my-2">
                                    <div className="col-12 d-flex align-items-center">
                                        <label htmlFor="" className="col-sm-2 col-3">Câu D:</label>
                                        <input type="text" value={choiceD} onChange={(event)=>setChoiceD(event.target.value)} 
                                        className={validD ? "form-control is-invalid":"form-control "} placeholder="Đáp án D"/>
                                    </div>
                                    <div className="col-5 text-end">

                                    </div>
                                </div>
                            </div>
                            </div>  
                            <div className="form-group col-12 my-2 gx-5 text-center" >
                                
                                <button type="button" className="btn btn-warning col-12 mx-sm-3 col-sm-5 my-1 my-sm-0" onClick={()=>addDraftTest()}><FontAwesomeIcon icon="fa-solid fa-floppy-disk" /> Lưu Nháp</button>
                                <button type="button" className="btn btn-success col-12 col-sm-5 mx-sm-3" onClick={()=>handleAddNewQues()}><FontAwesomeIcon icon="fa-solid fa-circle-plus" /> Thêm 1 câu hỏi</button>  
                                <button type="button" className="btn btn-primary col-sm-11 col-12 my-2" onClick={()=>handleCheckConfirm()}><FontAwesomeIcon icon="fa-solid fa-circle-check" /> Xác Nhận Tạo Mới</button>
                            </div>
                            
                            </div>
                        </div>
                        <div className="col-sm-6 col-12">
                            <div className="list-ques p-3" >
                                <h3>Đề thi: {TestName}</h3>
                                
                                <div className="row justify-content-center">
                                    <div className="information-card col-5 mx-2">
                                        <strong className="d-sm-block d-none">thời lượng: {+time} phút</strong>
                                        <div className="d-sm-none d-block"> <strong>thời lượng:</strong></div>
                                        <div className="d-sm-none d-block">{+time} phút</div>
                                    </div>
                                    <div className="information-card col-5">
                                        <strong className="d-sm-block d-none">Số câu hỏi: {+countQues} câu</strong>
                                        <div className="d-sm-none d-block"> <strong>Số câu hỏi:</strong></div>
                                        <div className="d-sm-none d-block">{+countQues} câu</div>
                                    </div>
                                    <div className="col-12">
                                    {listNewQues && listNewQues.length > 0 && listNewQues.map((item, index)=>{
                                        return(
                                            <>
                                                <NewQues index={index} item={item} delete={handleDeleteNewQues}/>
                                            </>
                                        )
                                    })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <Modal show={showModal} onHide={()=>setShowModal(false)} backdrop="static" keyboard={false} centered>
                <Modal.Header closeButton>
                <Modal.Title>Thông báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                Xác nhận công khai đề thi <b>{TestName}</b> ? Sau khi công khai sẽ không thể thay đổi          
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>setShowModal(false)}>
                    Hủy
                    </Button>
                <Button variant="success" onClick={()=>addPublicTest()} disabled={pending?true:false}>Xác nhận công khai {pending && <Loading/>}</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default AddNewTest
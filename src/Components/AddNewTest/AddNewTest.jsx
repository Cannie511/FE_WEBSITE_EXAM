import { useState } from "react"
import AddQuestion from "../AddQuestion/AddQuestion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  } from "react-toastify";
const AddNewTest = ()=>{
    const [countQues, setCountQues] = useState(0);
    const handleAddNewQues = async ()=>{
        let count = countQues;
        count++;
        await setCountQues(count);
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    }
    return(
        <>
            <form>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="row">
                            <div className="titlte"><h2><strong>Thêm Bài Thi Mới:</strong></h2></div>
                            <div className="form-group col-12 col-sm-6 my-2">
                                <label htmlFor="Subname">Tên Môn Thi:</label>
                                <input id="Subname" className="form-control" placeholder="Tên môn thi..."/>
                            </div>
                            <div className="form-group col-sm-2 col-6 my-2">
                                <label htmlFor="Subname">Số lượng câu hỏi:</label>
                                <input type="number" id="Subname" value={countQues} onChange={(event)=>setCountQues(event.target.value)} className="form-control" placeholder="Số lượng câu hỏi"/>
                            </div>
                            <div className="form-group col-sm-8 col-12 my-2">
                                <label htmlFor="Subname">Ghi chú</label>
                                <input id="Subname" className="form-control" placeholder="Ghi chú..."/>
                            </div>
                            <div className="form-group col-12 my-2">
                            {
                                (() => {
                                const listNewQues = [];
                                for (let i = 0; i < countQues; i++) {
                                    listNewQues.push(<div className="form-group col-12 my-2" key={i}><AddQuestion index={i}/></div>);
                                }
                                console.log(listNewQues);
                                return listNewQues;
                                })()
                            }
                            </div>
                            <div className="form-group col-sm-8 col-12 my-2">
                                <button type="button" className="btn btn-success col-12 col-sm-3 float-sm-end" onClick={()=>handleAddNewQues()}><FontAwesomeIcon icon="fa-solid fa-circle-plus" /> Thêm câu hỏi mới</button>
                                <button className="btn btn-primary col-12 col-sm-3 float-end mx-sm-2 my-1 my-sm-0">Xác Nhận Tạo Mới</button>
                                
                            </div>
                            
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            
        </>
    )
}
export default AddNewTest
import "./AddQuestion.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const AddQuestion = (props)=>{
    const handleDeleteQues =(id)=>{
        props.onDelete(id);
    }
    return(
        <div className="container ques col-12 my-1 py-3 px-3 px-sm-5">
            <div className="row">
                <div className="col-sm-9 col-12">
                    <b>Câu hỏi số {props.index+1}: key: {props.index}</b>
                    <textarea type="text" className="form-control" placeholder="nội dung câu hỏi"/>
                </div>
                <div className="col-6 col-sm-2 ">
                    <b>Đáp án đúng:</b>
                    <select className="form-select">
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                    </select>
                    
                </div>
                <div className="col-1 mt-4">
                <button type="button" className="btn btn-danger d-none d-sm-block" onClick={()=>handleDeleteQues(props.index)}><FontAwesomeIcon icon="fa-solid fa-minus" /></button>
                </div>
            </div>
            <div className="row my-2">
                <div className="col-sm-7 col-12 d-flex align-items-center">
                    <label htmlFor="" className="col-sm-2 col-3">Câu A:</label>
                    <input type="text" className="form-control " placeholder="Đáp án A"/>
                </div>
            </div>
            <div className="row my-2">
                <div className="col-sm-7 col-12 d-flex align-items-center">
                    <label htmlFor="" className="col-sm-2 col-3">Câu B:</label>
                    <input type="text" className="form-control " placeholder="Đáp án B"/>
                </div>
            </div>
            <div className="row my-2">
                <div className="col-sm-7 col-12 d-flex align-items-center">
                    <label htmlFor="" className="col-sm-2 col-3">Câu C:</label>
                    <input type="text" className="form-control " placeholder="Đáp án C"/>
                </div>
            </div>
            <div className="row my-2">
                <div className="col-sm-7 col-12 d-flex align-items-center">
                    <label htmlFor="" className="col-sm-2 col-3">Câu D:</label>
                    <input type="text" className="form-control " placeholder="Đáp án D"/>
                </div>
                <div className="col-5 text-end">

                </div>
            </div>
            <button className="btn btn-danger col-12 d-block d-sm-none">Xóa câu hỏi</button>
        </div>
    )
}
export default AddQuestion
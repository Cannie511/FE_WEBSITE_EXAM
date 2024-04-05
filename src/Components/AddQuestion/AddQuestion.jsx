import { useEffect, useState } from "react";
import "./AddQuestion.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const AddQuestion = (props)=>{
    const [title, setTitle] = useState('');
    const [trueChoice, setTrueChoice] = useState('A');
    const [choiceA, setChoiceA] = useState('')
    const [choiceB, setChoiceB] = useState('')
    const [choiceC, setChoiceC] = useState('')
    const [choiceD, setChoiceD] = useState('')
    useEffect(()=>{
        if(title && trueChoice && choiceA && choiceB && choiceC && choiceD){
            
        }
    },[title,trueChoice,choiceA,choiceB,choiceC,choiceD])
   
    return(
        <div className="container ques col-12 my-1 py-3 px-3 px-sm-5">
            <div className="row">
                <div className="col-sm-8 col-12">
                    <b>Câu hỏi số {props.index+1}:</b>
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
                <div className="col-5 text-end">

                </div>
            </div>
        </div>
    )
}
export default AddQuestion
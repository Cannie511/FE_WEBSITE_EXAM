import { useEffect, useState } from "react";
import "./Question.scss";

const Question =(props)=>{
    const [selectedAns, setSelectedAns] = useState("");
    const idQues = props.item.id
    useEffect(()=>{
        if(selectedAns && selectedAns!==""){
            props.selected({id: idQues, ans: selectedAns});
        }
        // console.log(idQues);
        // console.log(selectedAns);
    },[selectedAns])
    return(
        <div className="p-3" >
        <div className=" question container p-3">
            <div className="question-title">
                <b>Câu {props.stt+1}: {props.item.title}</b>
            </div>
            <div className="question-answer"> 
            <div className="form-check">
                <input className="form-check-input" type="radio" name={props.item.id} value="A" onClick={(event)=>setSelectedAns(event.target.value)}/>
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                A. {props.item.A}.
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name={props.item.id} value="B" onClick={(event)=>setSelectedAns(event.target.value)}/>
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                B. {props.item.B}.
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name={props.item.id} value="C" onClick={(event)=>setSelectedAns(event.target.value)}/>
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                C. {props.item.C}.
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name={props.item.id} value="D" onClick={(event)=>setSelectedAns(event.target.value)}/>
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                D. {props.item.D}.
                </label>
            </div>
            </div>
        </div>
        </div>
    );
}
export default Question;
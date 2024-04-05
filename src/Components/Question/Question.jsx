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
                <b>Câu {props.stt+1}: {props.item.noidung}</b>
            </div>
            <div className="question-answer"> 
            <div className="form-check">
                <input className="form-check-input" type="radio" name={props.item.id} value="A" onClick={(event)=>setSelectedAns(event.target.value)}/>
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                A. {props.item.dap_an_a}.
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name={props.item.id} value="B" onClick={(event)=>setSelectedAns(event.target.value)}/>
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                B. {props.item.dap_an_b}.
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name={props.item.id} value="C" onClick={(event)=>setSelectedAns(event.target.value)}/>
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                C. {props.item.dap_an_c}.
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name={props.item.id} value="D" onClick={(event)=>setSelectedAns(event.target.value)}/>
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                D. {props.item.dap_an_d}.
                </label>
            </div>
            </div>
        </div>
        </div>
    );
}
export default Question;
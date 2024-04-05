import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const NewQues = (props)=>{
    const handleDeleteQues = (id)=>{
        props.delete(id);
    }
    return(
        <>
            <div className="ques-card py-2 me-auto px-3 my-2 mx-auto">
                <div className="col-12 row">    
                    <div className="col-sm-10 col-8">
                        <b>Câu {+props.index+1}: {props.item.noidung}</b>
                    </div>
                    <div className="col-sm-2 col-4 row" >
                        
                        <div className="col-3"><FontAwesomeIcon onClick={()=>handleDeleteQues(props.item.id)} icon="fas fa-trash-alt" style={{color: "#e52437",cursor:"pointer"}} /></div>
                    </div>
                </div>
                <div className="col-12">
                    {props.item.dap_an_dung === 'A' ? <b>Câu A: {props.item.dap_an_a}</b>:<span>Câu A: {props.item.dap_an_a}</span>}
                </div>
                <div className="col-12">
                    {props.item.dap_an_dung === 'B' ? <b>Câu B: {props.item.dap_an_b}</b>:<span>Câu B: {props.item.dap_an_b}</span>}
                </div>
                <div className="col-12">
                    {props.item.dap_an_dung === 'C' ? <b>Câu C: {props.item.dap_an_c}</b>:<span>Câu C: {props.item.dap_an_c}</span>}
                </div>
                <div className="col-12">
                    {props.item.dap_an_dung === 'D' ? <b>Câu D: {props.item.dap_an_d}</b>:<span>Câu D: {props.item.dap_an_d}</span>}
                </div>
            </div>
        </>
    )
}
export default NewQues
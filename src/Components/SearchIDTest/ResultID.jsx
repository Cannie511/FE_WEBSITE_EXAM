import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

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
                    <b>Môn: {props.item.name}</b><br />
                    <sub>thời gian: 60p</sub> 
                </div>
                <div className="col-3 py-1">
                    <button className="btn btn-success float-end" onClick={()=>handleGoTest(props.item.id)}>thi</button>
                </div>
            </div>
        </div>
        </>
    )
}
export default ResultID
import { useEffect, useState } from "react";
import "./SearchIDTest.scss";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const SearchIDTest =(props)=>{
    const history = useHistory();
    const [listIdTest, setListIdTest] = useState([
        { id: "TDH202024", name: "Toán Lớp 3" },
        { id: "TDH202023", name: "Lý Lớp 7" },
        { id: "TDH202022", name: "Hóa Lớp 11" },
        { id: "TDH202021", name: "Địa Lớp 12" },
      ]);
    const [idTest, setIdTest] = useState('');
    const [noReq, setNoReq] = useState(false);
    const handleTestID =(event)=>{
        event.preventDefault();
        if(listIdTest.find(x=>x.id === idTest)){
            history.push(`/IdTest/${idTest}`);
        }
        else{
            setNoReq(true)
        }
    }
    useEffect(()=>{
        if(idTest===''){
            setNoReq(false);
        }
        
        props.startStatus(false);
        window.history.pushState(null, null,  window.location.href);
        window.addEventListener('popstate', function (event){
            window.history.pushState(null, document.title,  window.location.href);
        });
    },[idTest])
    return(
        <>
        <form onSubmit={(event)=>handleTestID(event)}>
        <div className="searchIDtest container text-center d-flex justify-content-center gap-1 align-items-center flex-column" style={{height:"30rem"}}>
            <div className="col-sm-6 col-12">
            <div><h2 style={{color: 'gray'}}>Nhập mã bài thi tại đây:</h2></div>
                <div className="input-group">

                    <input style={{border:"1px solid black"}} onChange={(event)=>setIdTest(event.target.value)} value={idTest} type="text" className="form-control" placeholder="Mã bài thi, Ví dụ: TDH202024." aria-label=""/>
                    <button className="btn btn-outline-secondary" onClick={(event)=>handleTestID(event)} type="submit">Vào phòng thi</button>
                
                </div>
                <div>{noReq === true && <i style={{color:"red"}}>Không tìm thấy bài thi</i>}</div>
            </div>
        </div>
        </form>
        </>
        
    )
}
export default SearchIDTest;
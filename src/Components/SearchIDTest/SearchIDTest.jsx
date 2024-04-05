import { useEffect, useState } from "react";
import "./SearchIDTest.scss";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ResultID from "./ResultID";
import { apiGetAllExamForStu } from "../../services/APIServices"
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";

const SearchIDTest = (props)=>{
    const history = useHistory();
    // const [listIdTest, setListIdTest] = useState([
    //     { id: "TDH202024", name: "Toán Lớp 3" },
    //     { id: "TDH202023", name: "Lý Lớp 7" },
    //     { id: "TDH202022", name: "Hóa Lớp 11" },
    //     { id: "TDH202021", name: "Địa Lớp 12" },
    //     { id: "ABC", name: "Văn Lớp 8" },
    //     { id: "ACS", name: "Sinh Lớp 9" },
    //   ]);
    const [listIdTest, setListIdTest] = useState([]);
    const [pending, setPending] = useState(false);
    const [idTest, setIdTest] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [noReq, setNoReq] = useState(false);
    const getListExam = async () => {
        setPending(true)
        try {
            let res = await apiGetAllExamForStu();
            if (res && res.data !== null) {
                let data = await res&&res.data ? res.data : [];
                setListIdTest(data);
                // console.log("data: ",data);
                // console.log("check temp: ", listIdTest);
                setPending(false);
                
            } else {
                toast.error("Có lỗi trong quá trình tải đề thi!");
            }
        } catch (error) {
            toast.error("Có lỗi trong quá trình tải đề thi!");
        }
    }
    const search =async (idTest) => {
        const results = await listIdTest.filter((item) =>
          item.tendethi.toLowerCase().includes(idTest.toLowerCase())
          
        );
        setSearchResults(results);
    };
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
        if(listIdTest.length === 0){
            getListExam();
        }
        // console.log(listIdTest)
        if(listIdTest!==null){
            search(idTest);
            props.startStatus(false);
            window.history.pushState(null, null,  window.location.href);
            window.addEventListener('popstate', function (event){
                window.history.pushState(null, document.title,  window.location.href);
            });
        }
        
        
    },[idTest]);
    return(
        <>
        <form onSubmit={(event)=>handleTestID(event)}>
        <div className="searchIDtest container text-center d-flex justify-content-center mt-3 align-items-center flex-column">
            <div className="col-sm-6 col-12">
                <div><h2 style={{color: 'gray'}}>Nhập tên bài thi tại đây:</h2></div>
                <div className="input-group">
                    <input style={{border:"1px solid black"}} onChange={(event)=>setIdTest(event.target.value)} value={idTest} type="text" className="form-control" 
                    placeholder="Tên bài thi..." aria-label=""/>
                    <button className="btn btn-outline-secondary"><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /></button>
                </div>
                {/* <div>{noReq === true && <i style={{color:"red"}}>Không tìm thấy bài thi</i>}</div> */}
            </div>
        </div>
        </form>
        <div className="result container mt-3 " >
            <div className="row d-flex justify-content-center" key={"&hca"}>
                <div className="col-12 col-sm-6">
                {pending && <div className="text-center"><FontAwesomeIcon icon="fa-solid fa-spinner" size="3x" style={{color: "#74C0FC",}} spinPulse/></div>}
                {!idTest && listIdTest && listIdTest.length > 0
                    && listIdTest.map((item=>{
                        return(
                            <>
                                <ResultID item={item}/>
                            </>
                        )
                    }))
                }
                {idTest && searchResults && searchResults.length > 0
                    && searchResults.map((item=>{
                        return(
                            <>
                                <ResultID item={item}/>
                            </>
                        )
                    }))
                }
                    
                </div>
            </div>
        </div>
        </>
        
    )
}
export default SearchIDTest;
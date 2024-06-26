import NewTest from "../NewTest/NewTest"
import { UserContext } from "../Context/UserContext"
import { useContext, useEffect, useState } from "react"
import { apiGetExamOfTeacher } from "../../services/APIServices";
import { Spinner } from "react-bootstrap";
const TestPage = (props)=>{
    const [listIdTest, setListIdTest]=useState([]);
    const [userId, setUserId] = useState();
    const [pending, setPending] = useState(false);
    const getExamById = async(id)=>{
        setPending(true);
        if(id){
            let res = await apiGetExamOfTeacher(id);
            if(res && res.data){
                setListIdTest(res.data);
                console.log("check exam: ",res);
                setPending(false);
            }
        }
    }
    useEffect(()=>{
        if(!userId){
            if(localStorage.getItem("token")){
                setUserId(+localStorage.getItem("token"))
            }
        }
        if(userId){
            getExamById(userId)
        }
        
    },[userId])
    return (
        <div className="container py-3 px-md-5">
            <div className="row">
                <div className="col-1"></div>
                <div className="col-12 col-sm-11 py-5 py-sm-3"  >
                
                    <div className="container" key={1}>
                    <div className="titlte"><h2><strong>Danh Sách Bài Thi:</strong></h2></div>
                        <div className="row gx-0">
                        {pending && <Spinner animation="border" variant="info" />}
                            {!pending && listIdTest && listIdTest.length>0 && listIdTest.map((item)=>{
                                return(
                                    <NewTest key={item.id} item={item}/>
                                )
                            })}
                            {listIdTest.length === 0 && <div className="mt-3 px-3"><b>Chưa có bài thi nào được tạo</b></div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TestPage;
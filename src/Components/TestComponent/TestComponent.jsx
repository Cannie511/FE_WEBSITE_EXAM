import Header from "../Header/Header"
import Timer from "../Timer/Timer"
import ListQues from "../Question/ListQues"
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../Context/UserContext"
import { apiGetDetailExamForStu, apiGetKeyExam } from "../../services/APIServices"

const TestComponent =(props)=>{
    const [startTest, setStartTest]=useState(false);
    const [testName, setTestName] = useState('');
    const [time, setTime] = useState(0);
    let {id}=useParams();
    let name = JSON.parse(localStorage.getItem("listIdTest")).find(x=>+x.id===+id) || '';
    const history = useHistory();
    const [listQues, setListQues] = useState([]);
    let tempQues = [];
    let tempTime = 0;
    const getDetailExam = async() => {
      let res = await apiGetDetailExamForStu(id);
        if(res && res.data){
          tempQues = res.data.cauhoi;
          tempTime = res.data.thoigianthi;
          sessionStorage.setItem("dethi_id", res.data.id);
          // console.log("time: ", tempTime)
          if(tempQues.length!==0){
            setTime(tempTime);
            setListQues(tempQues);
          }
        }
    }
    const getKey = async()=>{
      let res = await apiGetKeyExam(id);
      if(res && res.data){
        props.setKey(res.data);
      }
      // console.log("key: ", res.data);
    }
    useEffect(()=>{
        // console.log("params ", name)
        if(listQues.length === 0){
          getDetailExam();
          getKey();
          
        }
        if(listQues && listQues.length > 0){
          props.setQuesNoShuf(listQues);
        }
        // if(tempQues.length !== 0 ){
          
        //   console.log("ques: ", listQues)
        // }
        if(name !== ''){
            history.push(`/IdTest/${id}`);
            setTestName(name.tendethi)
        }
        else{
            history.push("/IdTest");
        } 
    },[listQues, time])
    
    return(
        <>
            <Header startTest={setStartTest} nop={props.nop} testName={testName}/>&&
            {startTest === true ? (
              <>
                <Timer time={time}/>
                <ListQues listQues={listQues} handleGetAnswer={props.handleGetAnswer} listIdTest={props.listIdTest}/>
              </>
            ) : (
              <div
                className="container d-flex justify-content-center align-items-center"
                style={{ height: "30rem" }}
              >
                <h1>
                  Nhấn vào nút bắt đầu để tiến hành làm bài kiểm tra. <br />
                  QuizTest chúc các bạn thi tốt
                </h1>
              </div>
            )
            }
        </>
    )
}
export default TestComponent
import Header from "../Header/Header"
import Timer from "../Timer/Timer"
import ListQues from "../Question/ListQues"
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"
import { useEffect, useState } from "react"

const TestComponent =(props)=>{
    const [startTest, setStartTest]=useState(false);
    const [testName, setTestName] = useState('');
    let {id}=useParams();
    let name = props.listIdTest.find(x=>x.id===id) || '';
    const history = useHistory();
    useEffect(()=>{
        // console.log("params ", name)
        if(name !== ''){
            history.push(`/IdTest/${id}`);
            setTestName(name.name)
        }
        else{
            history.push("/IdTest");
        }
    },[])
    
    return(
        <>
            <Header startTest={setStartTest} nop={props.nop} testName={testName}/>&&
            {startTest === true ? (
              <>
                <Timer />
                <ListQues listQues={props.listQues} handleGetAnswer={props.handleGetAnswer} listIdTest={props.listIdTest}/>
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
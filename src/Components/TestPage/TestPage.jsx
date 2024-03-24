import NewTest from "../NewTest/NewTest"
import { UserContext } from "../Context/UserContext"
import { useContext } from "react"
const TestPage = (props)=>{
    const {listIdTest } = useContext(UserContext)
    return (
        <div className="container py-3">
            <div className="row">
                <div className="col-1"></div>
                <div className="col-12 col-sm-11 py-5 py-sm-3">
                
                    <div className="container" key={1}>
                    <div className="titlte"><h2><strong>Danh Sách Bài Thi:</strong></h2></div>
                        <div className="row gx-0">
                            {listIdTest && listIdTest.length && listIdTest.map((item)=>{
                                return(
                                    <NewTest key={item.id} item={item}/>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TestPage;
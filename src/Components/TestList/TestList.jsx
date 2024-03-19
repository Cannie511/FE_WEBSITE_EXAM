import { useContext} from "react"
import NewTest from "../NewTest/NewTest"
import { UserContext } from "../Context/UserContext"

const TestList =()=>{
    const {listIdTest, } = useContext(UserContext)
    return(
        <>  
        <div className="container py-3">
            <div className="row">
                <div className="col-2"></div>
                <div className="col-12 col-sm-10 py-5 py-sm-3">
                    
                    <div className="container w-120" key={1}>
                        <div className="row">
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
        </>
    )
}
export default TestList
import { useContext} from "react"

import AddNewTest from "../AddNewTest/AddNewTest"

const TestList =()=>{
    
    return(
        <>  
        <div className="container py-3 px-md-5">
            <div className="row">
                <div className="col-1"></div>
                <div className="col-12 col-sm-11 py-5 py-sm-3">
                    <div className="container" key={1}>
                        <div className="row gx-0">
                            <AddNewTest/>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}
export default TestList
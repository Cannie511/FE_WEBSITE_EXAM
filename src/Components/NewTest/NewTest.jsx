import "./NewTest.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const NewTest =(props)=>{
    return(<>
                            {/* <div className="col-sm-3 col-12 m-sm-4 m-0 my-2 p-0 container test" key={props.item.id}>
                                <div className="status float-start" style={{backgroundColor:"green"}}></div>
                                <div className="row" style={{position:"relative"}}>
                                    <div className=" content-test col-11 float-start d-flex flex-column justify-content-center align-items-cente px-2 py-1">
                                        <div className="row my-1" ><div>Môn Thi:</div><div className="col-12 sub-name"><b>{props.item.name}</b> </div></div>
                                        <div className="row mt-2">
                                            <div className="col-6">Câu hỏi: 50</div>
                                            <div className="col-6"><FontAwesomeIcon icon="fa-solid fa-clock" size="lg"/> : 60p</div>
                                        </div> 
                                        <div className="row mt-1" >
                                            <div className="col-6"><FontAwesomeIcon icon="fa-solid fa-circle-check" size="lg" style={{color: "#49ee5c",}} /> : 0/45</div>
                                            <div className="col-6"><FontAwesomeIcon icon="fa-solid fa-ban" color="red" size="lg"/> : 0</div>
                                        </div> 
                                    </div>   
                                    <div className="col-1 float-end p-0 after" > 
                                        <FontAwesomeIcon icon="fa-solid fa-chevron-right"/> 
                                    </div>
                                </div>
                            </div> */}
            <div className="col-sm-3 container card my-2 mx--sm-3">
                <div className="card-body">
                    <div className=" content-test col-11 float-start d-flex flex-column justify-content-center align-items-cente px-2 py-1">
                        <div className="row my-1" ><div>Môn Thi:</div><div className="col-12 sub-name"><b>{props.item.name}</b> </div></div>
                            <div className="row mt-2">
                                <div className="col-6">Câu hỏi: 50</div>
                                <div className="col-6"><FontAwesomeIcon icon="fa-solid fa-clock" size="lg"/> : 60p</div>
                            </div> 
                            <div className="row mt-1" >
                                <div className="col-6"><FontAwesomeIcon icon="fa-solid fa-circle-check" size="lg" style={{color: "#49ee5c",}} /> : 0/45</div>
                                <div className="col-6"><FontAwesomeIcon icon="fa-solid fa-ban" color="red" size="lg"/> : 0</div>
                            </div> 
                        </div>   
                        {/* <div className="col-1 float-end p-0 after" > 
                            <FontAwesomeIcon icon="fa-solid fa-chevron-right"/> 
                        </div> */}
                </div>
            </div>
    </>)
}
export default NewTest
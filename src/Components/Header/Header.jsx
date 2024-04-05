import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import "./Header.scss";
import Modal from "../ModalsBS5/Modal";
import { UserContext } from "../Context/UserContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const Header = (props)=>{
    const history = useHistory()
    const {testname,showMarkTest} = useContext(UserContext);
    const [start, setStart] = useState(false);
    const [dialogConfirm, showDialogConfrim] = useState(false);
    const handeShowConfirmDialog = ()=>{
        showMarkTest(props.testName);
        showDialogConfrim(true)
    }
    const handleBack =()=>{
        if(sessionStorage.getItem("dethi_id")) sessionStorage.removeItem("dethi_id");
        history.push("/IdTest");
    }
    const handeHideConfirmDialog = ()=>{
        showDialogConfrim(false)
    }
    const handleStart =()=>{
        setStart(true);
        props.startTest(true);
        // console.log("zzzz")
    }
    return(
        <>
        <div className=" text-center p-1 header">
            {start === false && 
            <Button variant="danger" onClick={()=>handleBack()} className="btn btn-success d-sm-block d-none float-start">
             Quay Lại
            </Button>
            }
            
            <b className="sub-title">BÀI THI: </b>
            <b className="sub-title" style={{color: "#FFC4A4"}}>{props.testName}</b>
            {start === false ? (
                <button onClick={()=>handleStart()} className="btn btn-success float-end">Bắt đầu</button>
            ):(
                //<button className="btn btn-success float-end" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Nộp bài</button>
                <Button variant="primary" onClick={()=>handeShowConfirmDialog()} className="btn btn-success float-end">
                    Nộp bài
                </Button>
            )
            }
            
        </div>
        
        <Modal nop={props.nop} testname={testname} show={dialogConfirm} hide={handeHideConfirmDialog} title={"Coi kĩ lại trước khi nộp. Bạn có chắc chắn muốn nộp không ?"}/>
        
        </>
        
    );
}
export default Header;
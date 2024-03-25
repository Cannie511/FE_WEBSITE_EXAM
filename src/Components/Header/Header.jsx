import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import "./Header.scss";
import Modal from "../ModalsBS5/Modal";
import { UserContext } from "../Context/UserContext";
const Header = (props)=>{
    const {testname,showMarkTest} = useContext(UserContext);
    const [start, setStart] = useState(false);
    const [dialogConfirm, showDialogConfrim] = useState(false);
    const handeShowConfirmDialog = ()=>{
        showMarkTest(props.testName);
        showDialogConfrim(true)
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
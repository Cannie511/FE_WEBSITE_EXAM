import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Loading from "../Loading/Loading";
const Modals = (props)=>{
    const history = useHistory()
    const [show, setShow] = useState(false);
    const [pending, setPending]=useState(false);
    const handleClose = () => {
        props.hide();
        setShow(false)
    };
    const handleShow = () => setShow(true);
    const handleShowMark =()=>{
      setPending(true);
        props.nop();
        setTimeout(()=>{
          history.push("/your-mark");
          setPending(false)
        },800)
        
    }
    
  return (
    <>
    <Modal show={props.show} onHide={handleClose} backdrop="static" keyboard={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Thông báo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.title}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Coi lại
          </Button>
          <Button variant="success" disabled={pending?true:false} onClick={handleShowMark}>Nộp bài {pending && <Loading/>}</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Modals
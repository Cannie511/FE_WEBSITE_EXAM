import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const Modals = (props)=>{
    const history = useHistory()
    const [show, setShow] = useState(false);
    const handleClose = () => {
        props.hide();
        setShow(false)
    };
    const handleShow = () => setShow(true);
    const handleShowMark =()=>{
        props.nop();
        history.push("/your-mark");
    }
    
  return (
    <>
    <Modal show={props.show} onHide={handleClose} backdrop="static" keyboard={false}>
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
          <Button variant="success" onClick={handleShowMark}>Nộp bài</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Modals
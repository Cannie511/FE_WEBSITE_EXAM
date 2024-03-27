import { useState } from "react"
import AddQuestion from "../AddQuestion/AddQuestion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  } from "react-toastify";
const AddNewTest = ()=>{
    const [countQues, setCountQues] = useState(0);
    let listNewQues = [];
    const handleAddNewQues = async ()=>{
        let count = countQues;
        count++;
        await setCountQues(count);
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    }
    const handleDeleteNewQues = (key)=>{
        let tempArray = [...listNewQues]
        tempArray = tempArray.filter(item=>item!==listNewQues[key]);
        let filter = [...tempArray];
        listNewQues = filter;
        console.log("check array: ",listNewQues);
        return listNewQues;
        // for(let i = 0; i< tempArray.length; i++){
        //     console.log(tempArray[i]);
        // }
        // setCountQues(countQues-1);
        // setCountQues(prevCount => prevCount - 1); 
        // console.log("check list: ", listNewQues[key])
    }
    const renderQuestions = () => {
        for (let i = 0; i < countQues; i++) {
            listNewQues.push(
            <div className="form-group col-12 my-2" key={i}>
              <AddQuestion key={i} index={i} onDelete={handleDeleteNewQues} />
            </div>
            
          );
        }
        
        return listNewQues;
      };
    return(
        <>
            <form>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="row">
                            <div className="titlte"><h2><strong>Thêm Bài Thi Mới:</strong></h2></div>
                            <div className="form-group col-12 col-sm-6 my-2">
                                <label htmlFor="Subname">Tên Môn Thi:</label>
                                <input id="Subname" className="form-control" placeholder="Tên môn thi..."/>
                            </div>
                            <div className="form-group col-sm-2 col-6 my-2">
                                <label htmlFor="Subname">Số lượng câu hỏi:</label>
                                <input type="number" id="Subname" value={countQues} onChange={(event)=>setCountQues(event.target.value)} className="form-control" placeholder="Số lượng câu hỏi"/>
                            </div>
                            <div className="form-group col-sm-8 col-12 my-2">
                                <label htmlFor="Subname">Ghi chú</label>
                                <input id="Subname" className="form-control" placeholder="Ghi chú..."/>
                            </div>
                            <div className="form-group col-12 my-2">
                            {renderQuestions()}
                            </div>
                            <div className="form-group col-sm-8 col-12 my-2">
                                <button type="button" className="btn btn-success col-12 col-sm-3 float-sm-end" onClick={()=>handleAddNewQues()}><FontAwesomeIcon icon="fa-solid fa-circle-plus" /> Thêm câu hỏi mới</button>
                                <button className="btn btn-warning col-12 col-sm-3 float-end mx-sm-1 my-1 my-sm-0"><FontAwesomeIcon icon="fa-solid fa-floppy-disk" /> Lưu Nháp</button>
                                <button className="btn btn-primary col-12 col-sm-3 float-end"><FontAwesomeIcon icon="fa-solid fa-circle-check" /> Xác Nhận Tạo Mới</button>
                            </div>
                            
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            
        </>
    )
}
export default AddNewTest
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import Question from "./Question";
import { useEffect } from "react";
const ListQues = (props)=>{
    const history = useHistory();
    let {id} = useParams();
    useEffect(()=>{
      // console.log(id)
      let x = JSON.parse(localStorage.getItem("listIdTest")).find(x=>+x.id===+id);
      if(+x.id !== +id){
        history.push("/IdTest");
      };
    },[])
    
    return(
        <>
        {props.listQues &&
                  props.listQues.length > 0 &&
                  props.listQues.map((item, index) => {
                    return (
                      <Question
                        key={item.id}
                        item={item}
                        stt={index}
                        selected={props.handleGetAnswer}
                      />
                    );
                  })}
        </>
    )
}
export default ListQues
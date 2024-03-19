import { useEffect, useState } from "react";
import "./Timer.scss"

const Timer = ()=>{
    const [minutes, setMinutes] = useState(5);
    const [seconds, setSeconds] = useState(10)
    const [displayTime, setDisplayTime] = useState(false);
    const [displayHour, setDisplayHour] = useState(false);
    const [warning, setWarning] = useState(0);
    useEffect(()=>{
        if(minutes>9){
            setDisplayHour(false)
        }
        if(minutes <10) setDisplayHour(true);
        if(minutes < 5 && minutes >= 1){
            setWarning(1)
        }
        if(minutes < 1 ){
            setWarning(2);
        }
        if(minutes >= 5){
            setWarning(0);
        }
        let timer = setInterval(()=>{
            setSeconds(seconds-1)
            if(minutes === 0){
                if(seconds === 0){
                    setSeconds(0);
                    return;
                }
            }
            if(seconds > 9){
                setDisplayTime(false);
            }
            if(seconds === 10){
                setDisplayTime(true);
            }
            if(seconds === 0){
                setSeconds(59)
                setMinutes(minutes-1)
                setDisplayTime(false);
            }
            if(minutes===10){
                setDisplayHour(false)
            }
            if(minutes===10 && seconds ===0){
                setDisplayHour(true)
            }
            
        }, 1000);
        return ()=>{
            clearInterval(timer);
        }
        
    },[seconds, minutes])
    return(

        <div className="Timer container sticky-sm-top mt-5 pt-2">
            <div className="col-12 p-4 text-center d-sm-flex d-none">
            <span className="">Thời gian làm bài thúc sau: <b>{displayHour ===true && '0'}{minutes}:{displayTime===true && '0'}{seconds}</b> </span> 
            
            </div>
            <div className="fixed-bottom text-center d-sm-none d-block" style={{backgroundColor:warning===0 ? "green" : 
            warning === 1 ? "#FFCC33" : "red"
            , color:warning===1 ? "black": "white"}}><span className="">{minutes===0 && seconds===0 ? "Đã hết thời gian làm bài !!!" : <>Kết thúc sau: <b>{displayHour ===true && '0'}{minutes}:{displayTime===true && '0'}{seconds}</b> </>} </span> </div>

        </div>
    );
}
export default Timer;
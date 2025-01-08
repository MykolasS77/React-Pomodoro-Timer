import React, { useState, useEffect } from 'react';

function Break(props){

    const [secconds, setSecconds] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [hours, setHours] = useState(0)
    const [startTimer, updateStart] = useState(props.startBreak)
    const intervalRef = React.useRef(null);
    const [startBreak, updateBreak] = useState(false)
    
    const time_2 = new Date()
    time_2.setHours(hours)
    time_2.setMinutes(minutes)
    time_2.setSeconds(secconds)
    

    function set_timer(event){

        let action_name = event.target.name

        switch(action_name){
            case "+secconds":
                var new_number = secconds + 1
                setSecconds(new_number)
                break
            case "-secconds":
                var new_number = secconds - 1
                setSecconds(new_number)
                break
            case "+minutes":
                var new_number = minutes + 1
                setMinutes(new_number)
                break
            case "-minutes":
                var new_number = minutes - 1
                setMinutes(new_number)
                break
            case "+hours":
                var new_number = hours + 1
                setHours(new_number)
                break
            case "-hours":
                var new_number = hours - 1
                setHours(new_number)
                break
        }
    }

    useEffect(() => {
        return () => stopCounter(); 
      }, []);

    const startCounter = (event) => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
        console.log(event.target.name)
        let action_name = event.target.name
        switch(action_name){
            case "+secconds":
                setSecconds((prev_number) => prev_number + 1)
                break
            case "-secconds":
                setSecconds((prev_number) => prev_number - 1)
                break
            case "+minutes":
                var new_number = minutes + 1
                setMinutes((prev_number) => prev_number + 1)
                break
            case "-minutes":
                var new_number = minutes - 1
                setMinutes((prev_number) => prev_number - 1)
                break
            case "+hours":
                var new_number = hours + 1
                setHours((prev_number) => prev_number + 1)
                break
            case "-hours":
                var new_number = hours - 1
                setHours((prev_number) => prev_number - 1)
                break
        }
    }, 150);
    };

    const stopCounter = () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };

    function refresh_pomadoro(){
        
        setSecconds((prevState)=> {
            if(prevState === 1){
                stop_timer()
                updateBreak(true)
                props.timerStage(startBreak)
            }
            console.log(props.startBreak, "cia start break")
            var newDate = prevState - 1
            console.log(prevState)
            return newDate
        })
    
        }
    
        function start_timer(){
        updateStart(true)
        }
        function stop_timer(){
            updateStart(false)
        }

    
        useEffect(() => {
        
        if (props.startBreak == true) {
            
            const interval = setInterval(refresh_pomadoro, 1000);
        
            return () => clearInterval(interval);
        }
        }, [props.startBreak]);

        function reset_timer(){
            setSecconds(0)
            setMinutes(0)
            setHours(0)
        }

    console.log(props.startBreak)

   
    
    return(
        <div>
            <div className="timer">
                <h1>{time_2.toLocaleTimeString("uk-Uk")}</h1>
                <p>Adjust secconds <button name="+secconds" onClick={set_timer} onMouseDown={startCounter} onMouseUp={stopCounter}>+</button> <button name="-secconds" onClick={set_timer} onMouseDown={startCounter} onMouseUp={stopCounter}>-</button> </p>
                <p>Adjust minutes <button name="+minutes" onClick={set_timer} onMouseDown={startCounter} onMouseUp={stopCounter}>+</button> <button name="-minutes" onClick={set_timer} onMouseDown={startCounter} onMouseUp={stopCounter}>-</button> </p>
                <p>Adjust hours <button name="+hours" onClick={set_timer} onMouseDown={startCounter} onMouseUp={stopCounter}>+</button> <button name="-hours" onClick={set_timer} onMouseDown={startCounter} onMouseUp={stopCounter}>-</button> </p>
                <div className="buttons">
                <button onClick={start_timer} >Start Timer</button>
                <button onClick={stop_timer}>Stop Timer</button>
                <button onClick={reset_timer}>Reset Timer</button>
                </div>
            </div>
        </div>
        
    )
}

export default Break

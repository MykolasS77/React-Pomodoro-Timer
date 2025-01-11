import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function Break(props){

    const [secconds, setSecconds] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [hours, setHours] = useState(0)
    const intervalRef = React.useRef(null);
   
    
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
        let action_name = event.target.name
        console.log(action_name)
        switch(action_name){
            case "+secconds":
                setSecconds((prev_number) => prev_number + 1)
                break
            case "-secconds":
                setSecconds((prev_number) => prev_number - 1)
                break
            case "+minutes":            
                setMinutes((prev_number) => prev_number + 1)
                break
            case "-minutes":            
                setMinutes((prev_number) => prev_number - 1)
                break
            case "+hours":               
                setHours((prev_number) => prev_number + 1)
                break
            case "-hours":
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
            }
            console.log(props.startBreak, "cia start break")
            var newDate = prevState - 1
            console.log(prevState)
            return newDate
        })
    
        }
    
        function start_timer(){
            
            if(hours === 0 && minutes === 0 && secconds === 0){
                return
            }
            else{props.timer_starts(true)}
            
            
        }
        function stop_timer(){
            props.timer_starts(false)            
        }

    
        useEffect(() => {
        
        if (hours === 0 && minutes === 0 && secconds === 0){
            props.timer_starts(false)
            
        } 
        
        if (props.startBreak == true ) {
            
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
            <h1>Focus Timer</h1>
            <h1>{time_2.toLocaleTimeString("uk-Uk")}</h1>
            <h2>Adjust secconds <Button variant="contained" name="+secconds" onClick={set_timer} onMouseDown={startCounter} onMouseUp={stopCounter}>+</Button> <Button variant="contained" name="-secconds" onClick={set_timer} onMouseDown={startCounter} onMouseUp={stopCounter}>-</Button> </h2>
            <h2>Adjust minutes <Button variant="contained" name="+minutes" onClick={set_timer} onMouseDown={startCounter} onMouseUp={stopCounter}>+</Button> <Button variant="contained" name="-minutes" onClick={set_timer} onMouseDown={startCounter} onMouseUp={stopCounter}>-</Button></h2>
            <h2>Adjust hours <Button variant="contained" name="+hours" onClick={set_timer} onMouseDown={startCounter} onMouseUp={stopCounter}>+</Button> <Button variant="contained"name="-hours" onClick={set_timer} onMouseDown={startCounter} onMouseUp={stopCounter}>-</Button></h2>
            <div className="buttons">
            <Button variant="text" onClick={start_timer} >Start Timer</Button>
            <Button onClick={stop_timer}>Stop Timer</Button>
            <Button onClick={reset_timer}>Reset Timer</Button>
            </div>
        </div>
    </div>
        
    )
}

export default Break

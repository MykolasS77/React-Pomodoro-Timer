import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';


function FormTemplate(props){

    const [seconds, setSeccondsState] = useState(0)
    const [minutes, setMinutesState] = useState(0)
    const [hours, setHoursState] = useState(0)

    const intervalRef = React.useRef(null);
    var alarm = new Audio("alarm.mp3");
    
    const [time_object, setTimeObject] = useState(() => {
        const time_2 = new Date()
        time_2.setHours(hours)
        time_2.setMinutes(minutes)
        time_2.setSeconds(seconds)
        return time_2
    })

    const updateTime = (hours, minutes, seconds) => {
        const newDate = new Date(time_object)
        newDate.setHours(hours)
        newDate.setMinutes(minutes)
        newDate.setSeconds(seconds)
        setTimeObject(newDate)
        
    }


    function set_timer(event){

        if ((props.id === 1 && props.timer_state === true) || (props.id === 2 && props.break_state === true) ){
            return
        }

        let action_name = event.target.name
        
        switch(action_name){
            
            case "+secconds":
                var new_secs = seconds + 1
                setSeccondsState(new_secs)
                updateTime(hours, minutes, new_secs)
                break
            case "-secconds":
                var new_minus_secs = seconds - 1
                setSeccondsState(new_minus_secs)
                updateTime(hours, minutes, new_minus_secs)
                break
            case "+minutes":
                var new_mins = minutes + 1
                setMinutesState(new_mins)
                updateTime(hours, new_mins, seconds)
                break
            case "-minutes":
                var new_minus_mins = minutes - 1
                setMinutesState(new_minus_mins)
                updateTime(hours, new_minus_mins, seconds)
                break
            case "+hours":
                var new_hours = hours + 1
                setHoursState(new_hours)
                updateTime(new_hours, minutes, seconds)
                break
            case "-hours":
                var new_minus_hours = hours - 1
                setHoursState(new_minus_hours)
                updateTime(new_minus_hours, minutes, seconds)
                break
            default:
                    console.log(action_name)
        }
    }

    useEffect(() => {
        return () => stopCounter(); 
      }, []);

    const startCounter = (event) => {
    if ((props.id === 1 && props.timer_state === true) || (props.id === 2 && props.break_state === true) ){
        return
    }

    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
        let action_name = event.target.name
        
        switch(action_name){
            case "+secconds":
                setSeccondsState((prev_number) => {
                    let new_number = prev_number + 1
                    updateTime(hours, minutes, new_number)
                    return new_number
                })
                break
            case "-secconds":
                setSeccondsState((prev_number) => {
                    let new_number = prev_number - 1
                    updateTime(hours, minutes, new_number)
                    return new_number
                })
                break
            case "+minutes":
                setMinutesState((prev_number) => {
                    let new_number = prev_number + 1
                    updateTime(hours, new_number, seconds)
                    return new_number
                })
                break
            case "-minutes":
                setMinutesState((prev_number) => {
                    let new_number = prev_number - 1
                    updateTime(hours, new_number, seconds)
                    return new_number
                })
                break
            case "+hours":
                setHoursState((prev_number) => {
                    let new_number = prev_number + 1
                    updateTime(new_number, minutes, seconds)
                    return new_number
                })
                break
            case "-hours":
                setHoursState((prev_number) => {
                    let new_number = prev_number - 1
                    updateTime(new_number, minutes, seconds)
                    return new_number
                })
                break
            default:
                console.log(action_name)
        }

    }, 150);
    };

    const stopCounter = () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };

    function refresh_pomadoro(end_date_reference){
    
    const time_now = new Date()
    const time_left = new Date(end_date_reference - time_now)

    setTimeObject(() => {
        let newDate = new Date(time_left)
        if(newDate.getSeconds() === 0 && newDate.getMinutes() === 0 && newDate.getHours() === 0){
            stop_timer()
            reset_timer()
            alarm.play()
        }
        setSeccondsState(newDate.getSeconds())
        setMinutesState(newDate.getMinutes())
        setHoursState(newDate.getHours())
        return newDate
    })

    }

    function start_timer(){
   
        if(props.id === 1) {
            props.timer_state_change(true, false)  
        }
        else if(props.id === 2){  
            props.timer_state_change(false, true)
        }
            
    }

    function stop_timer(event){
        
        if (props.id === 1 && props.timer_state !== false){
            props.timer_state_change(false, true)
        }
        if (props.id === 1 && typeof event !== "undefined"){
            props.timer_state_change(false, false)
        }
        else if (props.id === 2){
            props.timer_state_change(false, false)
        }
        
    }

    function reset_timer(){
        if((props.id === 1 && props.timer_state === true) || (props.id === 2 && props.break_state === true)){
            return
        }
        console.log("reset")
        setSeccondsState(0)
        setMinutesState(0)
        setHoursState(0)
        updateTime(0, 0, 0)
    }



    useEffect(() => {
    
   
    if (props.id === 1 && props.break_state === false && props.timer_state === true){
        if(time_object.getSeconds() === 0 && time_object.getMinutes() === 0 && time_object.getHours() === 0){
            props.timer_state_change(false, false)
            return
        }
        
        const start_date = new Date()
        const end_date = new Date(start_date.getTime() + time_object.getTime())

        const interval = setInterval(refresh_pomadoro, 1000, end_date);
    
        return () => clearInterval(interval);

    }
    
    if (props.id === 2 && props.break_state === true && props.timer_state === false){
        if(time_object.getSeconds() === 0 && time_object.getMinutes() === 0 && time_object.getHours() === 0){
            props.timer_state_change(false, false)
            return
        }
        const start_date = new Date()
        const end_date = new Date(start_date.getTime() + time_object.getTime())

        const interval = setInterval(refresh_pomadoro, 1000, end_date);
    
        return () => clearInterval(interval);
    }
    } );

  


    return(
        <div className="timer">
            <h1>{props.title}</h1>
            <h1>{time_object.toLocaleTimeString("uk-Uk")}</h1>
            <Grid container spacing={0} marginTop={0}>
                <Grid xs={4}>
                <h2>Adjust hours </h2>
                    <Button className="Button" variant="contained" name="+hours" onClick={set_timer} onMouseDown={startCounter} onMouseUp={stopCounter}>+</Button> 
                    <Button className="Button" variant="contained"name="-hours" onClick={set_timer} onMouseDown={startCounter} onMouseUp={stopCounter}>-</Button>
                </Grid>
                <Grid xs={4}>
                <h2>Adjust minutes </h2>
                    <Button className="Button" variant="contained" name="+minutes" onClick={set_timer} onMouseDown={startCounter} onMouseUp={stopCounter}>+</Button> 
                    <Button className="Button" variant="contained" name="-minutes" onClick={set_timer} onMouseDown={startCounter} onMouseUp={stopCounter}>-</Button>
                </Grid>
                <Grid item xs={4}>
                <h2>Adjust seconds </h2>
                    <Button className="Button" variant="contained" name="+secconds" onClick={set_timer} onMouseDown={startCounter} onMouseUp={stopCounter}>+</Button> 
                    <Button className="Button" variant="contained" name="-secconds" onClick={set_timer} onMouseDown={startCounter} onMouseUp={stopCounter}>-</Button> 
                </Grid> 
            </Grid>
            <div className="buttons">
            <Button className="Button" name="startButton" variant="text" onClick={start_timer} >Start</Button>
            <Button className="Button" name="StopButton" onClick={stop_timer}>Stop</Button>
            <Button className="Button" onClick={reset_timer}>Reset</Button>
            </div>
        </div>
         
    )
}

export default FormTemplate

// "homepage": "https://MykolasS77.github.io/React-Pomodoro-Timer",
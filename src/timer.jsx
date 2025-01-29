import React, { useState, useEffect, useCallback } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';


function FormTemplate(props){

    const [seconds, setSeccondsState] = useState(0)
    const [minutes, setMinutesState] = useState(0)
    const [hours, setHoursState] = useState(0)
    
    const intervalRef = React.useRef(null);
    
    const [time_object, setTimeObject] = useState(() => {
        const time_2 = new Date()
        time_2.setHours(hours)
        time_2.setMinutes(minutes)
        time_2.setSeconds(seconds)
        return time_2
    })

    const updateTime = useCallback((hours, minutes, seconds) => {
        const newDate = new Date(time_object)
        newDate.setHours(hours)
        newDate.setMinutes(minutes)
        newDate.setSeconds(seconds)
        setTimeObject(newDate)
        
    }, [time_object])


    function set_timer(event){

        if ((props.id === 1 && props.timer_state === true) || (props.id === 2 && props.break_state === true) ){
            return
        }

        let action_name = event.target.name
        let newSecs, newMins, newHours
        
        switch(action_name){
        
            case "+secconds":
                newSecs = seconds + 1
                setSeccondsState(newSecs)
                updateTime(hours, minutes, newSecs)
                break
            case "-secconds":
                newSecs = seconds - 1
                setSeccondsState(newSecs)
                updateTime(hours, minutes, newSecs)
                break
            case "+minutes":
                newMins = minutes + 1
                setMinutesState(newMins)
                updateTime(hours, newMins, seconds)
                break
            case "-minutes":
                newMins = minutes - 1
                setMinutesState(newMins)
                updateTime(hours, newMins, seconds)
                break
            case "+hours":
                newHours = hours + 1
                setHoursState(newHours)
                updateTime(newHours, minutes, seconds)
                break
            case "-hours":
                newHours = hours - 1
                setHoursState(newHours)
                updateTime(newHours, minutes, seconds)
                break
            default:
                    
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
                
        }

    }, 150);
    };

    const stopCounter = () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
    
    const start_timer = useCallback(() => {
        if (time_object.getSeconds() === 0 && time_object.getMinutes() === 0 && time_object.getHours() === 0) {
            return;
        }
        if (props.id === 1) {
            props.timer_state_change(true, false);
        } else if (props.id === 2) {
            props.timer_state_change(false, true);
        }
    }, [time_object, props]); 

    const stop_timer = useCallback(() => {
    
        if (props.id === 1 && props.timer_state === true){
           
            props.timer_state_change(false, true)
            
        }
        else if (props.id === 2){
            props.timer_state_change(false, false)
        }
        
    }, [props])

    const reset_timer = useCallback(() => {

        if((props.id === 1 && props.timer_state === true) || (props.id === 2 && props.break_state === true)){
            return
        }
        
        setSeccondsState(0)
        setMinutesState(0)
        setHoursState(0)
        updateTime(0, 0, 0)
    }, [props, updateTime])


    const refresh_pomadoro = useCallback((end_date_reference) =>{

        const time_now = new Date()
        const time_left = new Date(end_date_reference - time_now)
    
        setTimeObject(() => {
            let newDate = new Date(time_left)
            setSeccondsState(newDate.getSeconds())
            setMinutesState(newDate.getMinutes())
            setHoursState(newDate.getHours())
            return newDate
        }, [])
    
        })

       


    useEffect(() => {
    
    function check_stop_condition(){
        const alarm = new Audio("alarm.mp3");
        if(time_object.getSeconds() === 0 && time_object.getMinutes() === 0 && time_object.getHours() === 0){
            stop_timer()
            alarm.play()
            return
        }
        }
    function generate_new_date(){
        const start_date = new Date()
        const end_date = new Date(start_date.getTime() + time_object.getTime())
        return end_date
    }

    

   
    if(document.hidden){
        if (props.id === 1 && props.break_state === false && props.timer_state === true){
            check_stop_condition()
            const interval = setInterval(refresh_pomadoro, 500, generate_new_date());
    
            return () => clearInterval(interval);
    
        }
        
        if (props.id === 2 && props.break_state === true && props.timer_state === false){

            check_stop_condition()
            const interval = setInterval(refresh_pomadoro, 500, generate_new_date());
        
            return () => clearInterval(interval);
        }
        

    }
    else{
    
    if (props.id === 1 && props.break_state === false && props.timer_state === true){
       
        check_stop_condition()
        const interval = setInterval(refresh_pomadoro, 500, generate_new_date());
    
        return () => clearInterval(interval);

    }
    
    if (props.id === 2 && props.break_state === true && props.timer_state === false){

        check_stop_condition()
        const interval = setInterval(refresh_pomadoro, 500, generate_new_date());
    
        return () => clearInterval(interval);
    }
}
    }, [props, refresh_pomadoro, stop_timer, time_object]);

  


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


import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

function FormTemplate(props){

    const [secconds, setSecconds] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [hours, setHours] = useState(0)
    const intervalRef = React.useRef(null);
    var alarm = new Audio("alarm.mp3");
    
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
            console.log(props.id, "cia refresh pomadoroooo")
            stop_timer()
            alarm.play()
        }
        var newDate = prevState - 1
        
        return newDate
    })

    }

    function start_timer(){
        console.log(props.id, "start timer")
        console.log("VALANDZIUKES", hours, minutes, secconds)
        if(props.id == 1) {

        if(hours === 0 && minutes === 0 && secconds === 0){
            return
        }
        else{
            props.timer_state_change(true, false)
            
        }
        }
        else if(props.id == 2){
            
            if(hours === 0 && minutes === 0 && secconds === 0){
                return
            }
            else{
                props.timer_state_change(false, true)
        }}


       
            
    }

    function stop_timer(){
        if (props.id == 1){
        props.timer_state_change(false, true) // cia problema del to, kad pasileidzia automatiskai nepaisant to ar nulis ar ne
        }
        else if (props.id == 2){
            props.timer_state_change(false, false)
        }
        
    }



    useEffect(() => {
   

    if (props.id == 2 && props.break_state == true && props.timer_state == false){
      
        const interval = setInterval(refresh_pomadoro, 1000);
    
        return () => clearInterval(interval);

    }
    
    if (props.timer_state == true && props.break_state == false && props.id == 1){

        
        const interval = setInterval(refresh_pomadoro, 1000);
    
        return () => clearInterval(interval);
    }
    }, [props.timer_state, props.break_state, props.id]);

    function reset_timer(){
        setSecconds(0)
        setMinutes(0)
        setHours(0)
    }


    return(
        <div className="timer">
            <h1>{props.title}</h1>
            <h1>{time_2.toLocaleTimeString("uk-Uk")}</h1>
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
                <h2>Adjust secconds </h2>
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


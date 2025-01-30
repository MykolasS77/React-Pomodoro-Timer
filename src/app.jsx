import React, {useState} from 'react';
import Timer from "./timer"
import HeaderFunc from './header';
import "./styles.css"

function App() {

      const [startBreak, updateBreak] = useState(false)
      const [timerRuns, updateTimerRuns] = useState(false)
      const [title_text, setTitleText] = useState("Pomodoro Timer")
      

      function start_pause_break(timer_state, break_state){
        updateTimerRuns(timer_state)
        updateBreak(break_state)

        if(timer_state === true){
        document.body.style.backgroundColor = "#343cb17e"
        setTitleText("Focus Time!")
        }
        else if(break_state === true){
        document.body.style.backgroundColor = "#26770d98"
        setTitleText("Break Time!")
        }
        else if (timer_state === false && break_state === false){
        document.body.style.backgroundColor = "#ffffff"
        setTitleText("Pomodoro Timer")
        }
      }

    
      return (
        <div>
          <HeaderFunc text={title_text}/>
          <div className="timerBody">
          <Timer id={1} title={"Focus Timer"} timer_state_change={start_pause_break} timer_state={timerRuns} break_state={startBreak}/>
          <Timer id={2} title={"Break Timer"} timer_state_change={start_pause_break} timer_state={timerRuns} break_state={startBreak}/>
          </div>
        </div> 
      );
 
}
 
export default App

// "homepage": "https://MykolasS77.github.io/React-Pomodoro-Timer",
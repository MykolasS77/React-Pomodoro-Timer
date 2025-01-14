import React, {useState} from 'react';
import Timer from "./timer"
import HeaderFunc from './header';
import "./styles.css"

function App() {

      const [startBreak, updateBreak] = useState(false)
      const [timerRuns, updateTimerRuns] = useState(false)
      

      function start_pause_break(timer_state, break_state){
        console.log(timer_state, "Cia app function")
        updateTimerRuns(timer_state)
        updateBreak(break_state) 
      }


      return (
        <div>

          <HeaderFunc/>
          <div className="timerBody">
          <Timer id={1} title={"Focus Timer"} timer_state_change={start_pause_break} timer_state={timerRuns} break_state={startBreak}/>
          <Timer id={2} title={"Break Timer"} timer_state_change={start_pause_break} timer_state={timerRuns} break_state={startBreak}/>
          </div>
        </div> 
      );
 
}
 
export default App
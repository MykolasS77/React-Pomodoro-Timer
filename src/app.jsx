import React, {useState} from 'react';
import Timer from "./timer"
import Break from './break_timer';
import "./styles.css"

function App() {

      const [startBreak, updateBreak] = useState(false)

      function start_pause_break(timer_stage){
        console.log(timer_stage, "Cia app function")
        updateBreak(true)
      }

      return (
        <div>
        <Timer timerStage={start_pause_break}/>
        <Break timerStage={start_pause_break} startBreak={startBreak}/>
        </div> 
      );
 
}
 
export default App
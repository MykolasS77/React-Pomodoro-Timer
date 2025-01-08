import React, {useState} from 'react';
import Timer from "./timer"
import Break from './break_timer';
import "./styles.css"

function App() {

      const [startBreak, updateBreak] = useState(false)

      function start_pause_break(timer_stage){
        console.log(timer_stage, "Cia app function")
        updateBreak(timer_stage)
      }

      return (
        <div>
        <Timer timer_stops={start_pause_break}/>
        <Break startBreak={startBreak} timer_starts={start_pause_break}/>
        </div> 
      );
 
}
 
export default App
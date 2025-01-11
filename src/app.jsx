import React, {useState} from 'react';
import Timer from "./timer"
import Break from './break_timer';
import HeaderFunc from './header';
import "./styles.css"

function App() {

      const [startBreak, updateBreak] = useState(false)
      var alarm = new Audio("alarm.mp3");
    

      function start_pause_break(timer_stage){
        console.log(timer_stage, "Cia app function")
        updateBreak(timer_stage)
        alarm.play();
      }

      return (
        <div>

          <HeaderFunc/>
          <div className="timerBody">
          <Timer timer_stops={start_pause_break}/>
          <Break startBreak={startBreak} timer_starts={start_pause_break}/>
          </div>
        </div> 
      );
 
}
 
export default App
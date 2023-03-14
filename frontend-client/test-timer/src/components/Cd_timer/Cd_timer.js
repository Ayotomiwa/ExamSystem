import './Cd_timer.css'
import { useState, useEffect } from 'react';
import {getRemainingTimeUntilMsTimestamp} from './utils/cd_timerUtils'

const defaultRemainingTime = {
    seconds: '00',
    minutes: '00',
    hours: '00'

}
const Cd_timer = ({cdTimestampMs}) =>{
    const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

    useEffect(() =>{
        const intervalID = setInterval(() => {
            updateRemainingTime(cdTimestampMs);
        },1000);
        return () => clearInterval(intervalID)   
    },[cdTimestampMs])


    function updateRemainingTime(countdown){
        setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown));

    }
    return(
        <div className='cd_timer'>
            <span>{remainingTime.hours}</span>
            <span className='two-number'>h</span>
            <span>{remainingTime.minutes}</span>
            <span className='two-numbers'>m</span>
            <span>{remainingTime.seconds}</span>
            <span className='two-numbers'>s</span>
        </div>
        
    )
}

export default Cd_timer;
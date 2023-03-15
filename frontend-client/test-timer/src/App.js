import './App.css';
import React, { useState } from 'react';
import Form from './components/Cd_timer/Form';
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import logo from './logo.png';

dayjs.extend(duration);


function App() {
  const [cdTimestampMs, setCdTimestampMs] = useState(0);
  const [showCdTimer, setShowCdTimer] = useState(false);
  


  const handleInputChange = (event) => {
    const value = event.target.valueAsNumber;
    setCdTimestampMs(value);
    setShowCdTimer(true);


  };
    const nowDayjs = dayjs();
    const timeNum = nowDayjs.add(cdTimestampMs, 'hours').add(2, "seconds").valueOf();

  return (
    <div className="App">

      <Form /> 
    </div>
  );
}

export default App;

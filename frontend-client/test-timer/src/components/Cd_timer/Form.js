import React, { useState, useEffect, useRef } from "react";
import "./Form.css";
import Cd_timer from "./Cd_timer";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);
dayjs.extend(require("dayjs/plugin/localizedFormat"));

const Form = () => {
  const [CourseName, setCourseName] = useState("");
  const [CourseCode, setCourseCode] = useState("");
  const [DurationHrs, setDurationHrs] = useState();
  const [DurationMins, setDurationMins] = useState();
  const [showInfo, setShowInfo] = useState(false);
  const [cdTimestampMs, setCdTimestampMs] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const courses = ["Computer Science", "Business", "IT", "Art", "Chemistry"];

  const formRef = useRef(null);
  const infoRef = useRef(null);
  const nowDayjs = dayjs();
  const timeNum = nowDayjs
    .add(DurationHrs, "hours")
    .add(DurationMins, "minute")
    .add(2, "seconds")
    .valueOf();

  function capitalizeWords(str) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  function allCaps(str) {
    return str.toUpperCase();
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    formRef.current.style.display = "none";
    infoRef.current.style.display = "block";

    setShowInfo(true);
    const value = e.target.valueAsNumber;
    setCdTimestampMs(value);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const filteredCourses = courses.filter((courses) =>
    courses.toLowerCase().startsWith(inputValue.toLowerCase())
  );

  return (
    <div className="full-page">
      <div className="form" ref={formRef}>
        <form onSubmit={handleSubmit} autoComplete="off">
          <h2>Countdown Timer</h2>

          <label>Course Name</label>
          <input
            type="text"
            list="courses"
            required
            value={CourseName}
            onChange={(e) => setCourseName(e.target.value)}
            onInput={handleInputChange}
          />
          {inputValue && (
            <datalist id="courses">
              {filteredCourses.map((courses) => (
                <option
                  value={courses}
                  key={courses}
                  onClick={() => setCourseName(courses)}
                />
              ))}
            </datalist>
          )}
          <br />
          <label>Course Code</label>
          <input
            type="text"
            required
            value={CourseCode}
            onChange={(e) => setCourseCode(e.target.value)}
          />
          <br />
          <label>Duration</label>
          <input
            type="number"
            required
            placeholder="Hours"
            min="0"
            step="1"
            max="24"
            value={DurationHrs}
            onChange={(e) => setDurationHrs(e.target.value)}
          />
          <input
            type="number"
            required
            placeholder="Minutes"
            min="0"
            step="1"
            max="59"
            value={DurationMins}
            onChange={(e) => setDurationMins(e.target.value)}
          />
          <br />
          <button>Start Test</button>
        </form>
      </div>
      <div className="info" ref={infoRef}>
        <div className="courseName">
          {showInfo && <p>{capitalizeWords(CourseName)}</p>}
        </div>
        <div className="courseCode">
          {showInfo && <p>{allCaps(CourseCode)}</p>}
        </div>
        <div className="timer">
          {showInfo && <Cd_timer cdTimestampMs={timeNum} />}
        </div>
        <div className="time">
          {showInfo && <p>Start Time: {nowDayjs.format("LT")}</p>}
        </div>
      </div>
    </div>
  );
};
export default Form;

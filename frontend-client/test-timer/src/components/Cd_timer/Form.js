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
  const [StartTime, setStartTime] = useState();
  const [DurationHrs, setDurationHrs] = useState(0);
  const [DurationMins, setDurationMins] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [cdTimestampMs, setCdTimestampMs] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const courses = ["Computer Science", "Business", "IT", "Art", "Chemistry"];
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [data, setData] = useState("");

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

  const Icon = ({ children }) => (
    <i className="material-symbols-outlined">{children}</i>
  );

  const log = {
    courseName: capitalizeWords(CourseName),
    CourseCode: allCaps(CourseCode),
    duration: `${DurationHrs}h ${DurationMins}m`,
    startTime: nowDayjs.format("LT"),
    log: data,
  };

  const handleSave = () => {
    // Save data to a JSON file (or any other backend/database)
    console.log("Data saved:", data);
    console.log("log saved:", log);

    fetch("http://localhost:8080/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(log),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));

    const timeStart = (e) => {
      const now = dayjs();
      const start = dayjs(StartTime, "HH:mm");
      const startDiff = start.diff(now, "second");

      if (startDiff <= 0) {
        handleSubmit();
        //setCdTimestampMs(now.add(DurationHrs, "hours").add(DurationMins, "minute").add(2, "seconds").valueOf());
      } else {
        setTimeout(() => {
          setCdTimestampMs(
            now
              .add(DurationHrs, "hours")
              .add(DurationMins, "minute")
              .add(2, "seconds")
              .valueOf()
          );
        }, startDiff * 1000);
      }

      formRef.current.style.display = "none";
      infoRef.current.style.display = "block";
      setShowInfo(true);
    };
  };

  return (
    <div className="full-page">
      <div className="form" ref={formRef}>
        <form onSubmit={handleSubmit} autoComplete="off">
          <h2>Countdown Timer</h2>

          <label>Module Name</label>
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
          <label>Module Code</label>
          <input
            type="text"
            required
            value={CourseCode}
            onChange={(e) => setCourseCode(e.target.value)}
          />
          <br />
          <label>Start Time</label>

          <input
            type="time"
            placeholder="Start Time"
            value={StartTime}
            onChange={(e) => setStartTime(e.target.value)}
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
          {showInfo && <p>CourseName:{capitalizeWords(CourseName)}</p>}
        </div>
        <div className="courseCode">
          {showInfo && <p>CourseCode:{allCaps(CourseCode)}</p>}
        </div>
        <div className="timer">
          {showInfo && <Cd_timer cdTimestampMs={timeNum} />}
        </div>
        <div className="starttime">
          {showInfo && <p>Start Time: {nowDayjs.format("LT")}</p>}
        </div>
        <div className="endtime">
          {showInfo && <p>End Time: {nowDayjs.format("LT")}</p>}
        </div>
      </div>
      {showInfo && (
        <div className={`fab ${isOpen ? "open" : ""}`}>
          <button onClick={() => setIsOpen(!isOpen)}>
            <Icon>add</Icon>
          </button>
          <div className="menu">
            <button>
              <Icon>edit</Icon>
              <span>Edit</span>
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowPopup(true);
              }}
            >
              <Icon>description</Icon>
              {/*note*/}
              <span>Log</span>
            </button>
            <button>
              <Icon>settings</Icon>
              <span>Settings</span>
            </button>
          </div>
        </div>
      )}

      {showPopup && (
        <div className="log">
          <textarea
            type="text"
            value={data}
            onChange={(e) => setData(e.target.value)}
            placeholder="Log..."
          />
          <button
            className="closebtn"
            onClick={(e) => {
              console.log("??????????", e);
              e.preventDefault();
              setShowPopup(false);
            }}
          >
            <Icon>close</Icon>
          </button>
          <button className="savebtn" onClick={handleSave}>
            Save
          </button>
        </div>
      )}
    </div>
  );
};
export default Form;

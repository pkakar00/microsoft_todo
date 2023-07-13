import "./MyDay.css";
import React, { useState, useRef, useContext } from "react";
import { TasksContext } from "../App";
import reducerTasks from "../ReducerTasks";
import Li from "./Li";
import { Task } from "../App";
import OptionsMenu from "./OptionsMenu";

export function checkBoxChanged(e) {
  console.log(e);
}
export default function MyDay() {
  const { state, dispatch } = useContext(TasksContext);
  const [input, setInput] = useState("");
  const taskList = useRef(null);

  return (
    <div className="main">
      <div>
        <header className="top">
          <div
            style={
              state.cardBackgroundColor === "#363636"
                ? { color: "white" }
                : { color: state.cardBackgroundColor }
            }
            className="heading"
          >
            <h1>My Day</h1>
            <h3>{getDate()}</h3>
          </div>

          <div className="extras">
            <OptionsMenu className="options" />
          </div>
        </header>
        <main className="mainContent">
          <ul>
            <Li dispatch={dispatch} state={state} />
          </ul>
        </main>
      </div>

      <footer>
        <div className="inputBoxContainer">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              dispatch({
                actionTask: reducerTasks.NEW_TASK,
                info: new Task(input, taskList.current.innerText, false),
              });
            }}
          >
            <input
              placeholder="+ Add text here to create a task"
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
          </form>
          {input!=="" && (
          <>
          <button ref={taskList} className="chooseList">
            Tasks
          </button>
          <button className="dateSelector">Calendar</button>
          <button className="remindMe">RemindMe</button>
          <button className="repeat">Repeat</button>
          </>)}
        </div>
      </footer>
    </div>
  );
}

function getDate() {
  const today = new Date();

  const monthArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const weekArray = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const weekDay = weekArray[today.getDay()];
  const date = today.getDate();
  const month = monthArray[today.getMonth()];
  return `${weekDay}, ${date} ${month}`;
}

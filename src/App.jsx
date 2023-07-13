import { useState, createContext, useReducer, useEffect } from "react";
import "./App.css";
import Navbar from "./Navbar";
import Assigned from "./BodyComponents/Assigned";
import Flagged from "./BodyComponents/Flagged";
import Important from "./BodyComponents/Important";
import MyDay from "./BodyComponents/MyDay";
import Planned from "./BodyComponents/Planned";
import Tasks from "./BodyComponents/Tasks";
import Untitled from "./BodyComponents/Untitled";
import names from "./Navbar constants";
import reducer from "./myDayReducer";

export class Task {
  constructor(taskText, taskListName, completed, important) {
    this.taskText = taskText;
    this.taskListName = taskListName;
    this.completed = completed;
    this.important = important === undefined ? false : important;
    this.time = new Date().getTime();
  }
}

function Body({ selection }) {
  switch (selection) {
    case names.MY_DAY:
      return <MyDay />;
    case names.IMPORTANT:
      return <Important />;
    case names.PLANNED:
      return <Planned />;
    case names.ASSIGNED:
      return <Assigned />;
    case names.FLAGGED:
      return <Flagged />;
    case names.TASKS:
      return <Tasks />;
    case names.UNTITLED:
      return <Untitled />;
    default:
      return <h1>No Element</h1>;
  }
}

export const TasksContext = createContext();
function App() {
  const [selection, changeSelection] = useState("My Day");

  const style = { backgroundColor: "#1c1c1c", color: "black" };
  const [state, dispatch] = useReducer(reducer, {
    appStyle: style,
    cardBackgroundColor: "#363636",
    hasCompletedTasks: false,
    tasksArray: new Array(0),
  });

  return (
    <div className="mainContainer" style={style}>
      <Navbar onChange={changeSelection} />
      <TasksContext.Provider value={{ state, dispatch }}>
        <Body className="bodyElement" selection={selection} />
      </TasksContext.Provider>
    </div>
  );
}
export default App;

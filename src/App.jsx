import {createContext, useReducer, useEffect } from "react";
import "./App.css";
import Navbar from "./Navbar";
import Assigned from "./BodyComponents/Assigned";
import Flagged from "./BodyComponents/Flagged";
import Important from "./BodyComponents/Important";
import MyDay from "./BodyComponents/MyDay";
import Planned from "./BodyComponents/Planned";
import Tasks from "./BodyComponents/Tasks";
import Untitled from "./BodyComponents/Untitled";
import reducer from "./myDayReducer";
import { Route, Routes } from "react-router-dom";

export class Task {
  constructor(taskText, taskListName, completed, important) {
    this.taskText = taskText;
    this.taskListName = taskListName;
    this.completed = completed;
    this.important = important === undefined ? false : important;
    this.time = new Date().getTime();
  }
}
function Error(){
  return <h1>Wrong Url :-D</h1>
}

export const TasksContext = createContext();
function App() {
  const style = { backgroundColor: "#1c1c1c", color: "black" };
  const [state, dispatch] = useReducer(reducer,localStorage.hasOwnProperty("state") ? JSON.parse(localStorage.getItem("state")) : {
    appStyle: style,
    cardBackgroundColor: "#363636",
    hasCompletedTasks: false,
    tasksArray: new Array(0)
  });

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
    console.log("aaa");
  }, [state]);

  return (
    <div className="mainContainer" style={style}>
      <Navbar/>
      <TasksContext.Provider value={{ state, dispatch }}>
        <Routes>
          <Route path="/" element={<MyDay/>}/>
          <Route path="/MyDay" element={<MyDay/>}/>
          <Route path="/Important" element={<Important/>}/>
          <Route path="/Planned" element={<Planned/>}/>
          <Route path="/Assigned" element={<Assigned/>}/>
          <Route path="/Flagged" element={<Flagged/>}/>
          <Route path="/Tasks" element={<Tasks/>}/>
          <Route path="/Untitled" element={<Untitled/>}/>
          <Route path="*" element={<Error/>}/>
        </Routes>
      </TasksContext.Provider>
    </div>
  );
}
export default App;
import "./Li.css";
import ContextMenu from "./ContextMenu";
import reducerTasks from "../ReducerTasks";
import React, { useContext, createContext, useState, useEffect } from "react";
export const LiContext = createContext();
export default function Li({ state, dispatch }) {
  console.log("YOLOOOOOOOOO");
  //console.log(state);

  function changeShowMenuState(e) {
    showMenu && setShowMenu(false);
  }
  useEffect(() => {
    document.addEventListener("click", changeShowMenuState);
    return () => {
      document.removeEventListener("click", changeShowMenuState);
    };
  });

  const [menuX, setMenuX] = useState(0);
  const [menuY, setMenuY] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [selectItemIndex, setSelectedItemIndex] = useState(0);

  function handleRightClick(e, index) {
    e.preventDefault();
    console.log(e);
    setMenuX(e.pageX);
    setMenuY(e.pageY);
    setShowMenu(true);
    setSelectedItemIndex(index);
  }
  //const { changeTaskArray } = useContext(TasksContext);

  const checkBoxChanged = (index) => {
    dispatch({ actionTask: reducerTasks.COMPLETED, index: index });

    state.hasCompletedTasks = false;
    state.tasksArray.forEach((x) => {
      if (x.completed) state.hasCompletedTasks = true;
    });
    console.log(state.hasCompletedTasks);
  };

  return (
    <LiContext.Provider
      value={{
        state: state,
        dispatch: dispatch,
        checkBoxChanged: checkBoxChanged,
        handleRightClick: handleRightClick,
      }}
    >
      <ContextMenu
        x={menuX}
        y={menuY}
        showMenu={showMenu}
        index={selectItemIndex}
      />
      {state.tasksArray.map((task, index) => {
        if (!task.completed)
          return <ListItem key={index} task={task} index={index} />;
        return null;
      })}
      {state.hasCompletedTasks && <CompletedSection />}
    </LiContext.Provider>
  );
}

function CompletedSection() {
  const context = useContext(LiContext);
  const [showView, setShowView] = useState(true);

  function toggleCompletedTasksView() {
    setShowView((x) => !x);
  }
  return (
    <>
      <button onClick={toggleCompletedTasksView}>
        {" "}
        {showView ? "∧" : "V"} Completed Tasks
      </button>

      {showView &&
        context.state.tasksArray.map((task, index) => {
          if (task.completed)
            return <ListItem key={index} task={task} index={index} />;
          return null;
        })}
    </>
  );
}

function ListItem({ task, index }) {
  const context = useContext(LiContext);
  return (
    <>
      <li className="li" key={index}>
        <div
          onContextMenu={(e) => {
            context.handleRightClick(e, index);
          }}
          className="card"
          style={
            context.state.cardBackgroundColor === "#363636"
              ? {
                  color: "white",
                  backgroundColor: context.state.cardBackgroundColor,
                }
              : {
                  color: "black",
                  backgroundColor: context.state.cardBackgroundColor,
                }
          }
        >
          <div className="horizontal">
            <input
              onChange={() => {
                context.checkBoxChanged(index);
              }}
              type="checkBox"
              name="completed"
              id="completedCheckBox"
              checked={task.completed}
            />
            <div className="vertical">
              <div className="taskText"><pre>{task.taskText}</pre></div>
              <div className="listName">{task.taskListName}</div>
            </div>
          </div>
          <div style={{display:"flex"}}>
            <button
              onClick={(e) => {
                console.log("important marked");
                context.dispatch({
                  actionTask: reducerTasks.MAKE_IMPORTANT,
                  index: index,
                });
              }}
              className={task.important ? "important impButton" : "impButton"}
            >
              <img className="img" src={require("../images/important.png")} alt="" />
            </button>
          </div>
        </div>
      </li>
    </>
  );
}
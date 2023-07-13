import { LiContext } from "./Li";
import { useContext } from "react";
import reducerTasks from "../ReducerTasks";
export default function ContextMenu(props) {
  const ctx = useContext(LiContext);

  const style = {
    display: props.showMenu ? "flex" : "none",
    flexDirection: "column",
    width: "100px",
    position: "fixed",
    top: props.y,
    left: props.x,
  };

  function deleteTask() {
    ctx.dispatch({ actionTask: reducerTasks.DELETE, index: props.index });
  }

  function markImportant() {
    ctx.dispatch({
      actionTask: reducerTasks.MAKE_IMPORTANT,
      index: props.index,
    });
  }
  function markCompleted() {
    ctx.dispatch({
      actionTask: reducerTasks.COMPLETED,
      index: props.index,
    });
  }
  return (
    <div style={style}>
      <button onClick={deleteTask}>Delete Task</button>
      <button onClick={markImportant}>Mark Important</button>
      <button onClick={markCompleted}>Mark Completed</button>
    </div>
  );
}

import reducerTasks from "./ReducerTasks";

export default function reducer(state, action) {
  switch (action.actionTask) {
    case reducerTasks.NEW_TASK:
      return { ...state, tasksArray: [...state.tasksArray, action.info] };

    case reducerTasks.COMPLETED:
      let x = false;
      let updatedTasksArray = state.tasksArray.map((task, index) => {
        if (index === action.index) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });

      updatedTasksArray.forEach((element) => {
        if (element.completed) x = true;
      });
      return { ...state, tasksArray: updatedTasksArray, hasCompletedTasks: x };

    case reducerTasks.MAKE_IMPORTANT:
      const updated = state.tasksArray.map((task, index) => {
        if (index === action.index) {
          return { ...task, important: !task.important };
        }
        return task;
      });
      return { ...state, tasksArray: updated };
    case reducerTasks.DELETE:
      let newArray = [...state.tasksArray];
      newArray.splice(action.index, 1);

      let xx=false;
      newArray.forEach((element) => {
        if (element.completed) xx = true;
      });
      return { ...state, tasksArray: newArray, hasCompletedTasks: xx };

    case reducerTasks.ASCENDING:
      let ascendingState = [...state.tasksArray];
      ascendingState.sort((a, b) => a.taskText.localeCompare(b.taskText));
      return { ...state, tasksArray: ascendingState };

    case reducerTasks.DESCENDING:
      let descendingState = [...state.tasksArray];
      descendingState.sort((a, b) => b.taskText.localeCompare(a.taskText));
      return { ...state, tasksArray: descendingState };

    case reducerTasks.TIME_UP:
      let timeUpState = [...state.tasksArray];
      timeUpState.sort((a, b) => a.time - b.time);
      return { ...state, tasksArray: timeUpState };

    case reducerTasks.TIME_DOWN:
      let timeDownState = [...state.tasksArray];
      timeDownState.sort((a, b) => b.time - a.time);
      return { ...state, tasksArray: timeDownState };

    case reducerTasks.IMPORTANCE:
      let impTask = [];
      let notImpTask = [];

      for (let i = 0; i < state.tasksArray.length; i++) {
        if (state.tasksArray[i].important) impTask.push(state.tasksArray[i]);
        else notImpTask.push(state.tasksArray[i]);
      }

      return { ...state, tasksArray: impTask.concat(notImpTask) };
    
    case reducerTasks.PURPLE_THEME:
      return{...state, appStyle:{backgroundColor:"#1c1c1c", color:"black"}, cardBackgroundColor:"#d6bde7"} 
    case reducerTasks.BLACK_THEME:
      return{...state, appStyle:{backgroundColor:"#1c1c1c", color:"black"}, cardBackgroundColor:"#363636"} 
    case reducerTasks.WHITE_THEME:
      return{...state, appStyle:{backgroundColor:"#1c1c1c", color:"black"}, cardBackgroundColor:"#FFFFFF"} 
    case reducerTasks.RED_THEME:
      return{...state, appStyle:{backgroundColor:"#1c1c1c", color:"black"}, cardBackgroundColor:"#d6bde7"} 

    default:
      return state;
  }
}
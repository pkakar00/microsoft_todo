import { useState, useContext, useEffect } from "react";
import "./OptionsMenu.css";
import { TasksContext } from "../App";
import reducerTasks from "../ReducerTasks";
export default function OptionsMenu() {
  const { dispatch } = useContext(TasksContext);
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [enteredSortMenu, setEnteredSortMenu] = useState(false);
  const [enteredThemeMenu, setEnteredThemeMenu] = useState(false);

  function handleClick(e) {
    setShowOptionsMenu(false);
  }
  useEffect(() => {
    document.addEventListener("click", handleClick);
    return document.removeEventListener("click", handleClick);
  }, []);

  function emailOption() {
    console.log("Email");
  }
  return (
    <div className="optionsContainer">
      <button
        onClick={() => {
          setShowOptionsMenu((x) => !x);
        }}
      >
        Options
      </button>

      {showOptionsMenu && (
        <ul className="dropDownMenu">
          <li onClick={emailOption}>Email List</li>
          <li
            onMouseEnter={() => {
              setShowSortMenu(true);
            }}
            onMouseLeave={() => {
              if (!enteredSortMenu) setShowSortMenu(false);
            }}
          >
            Sort By
          </li>
          <li
            onMouseEnter={() => {
              setShowThemeMenu(true);
            }}
            onMouseLeave={() => {
              if (!enteredThemeMenu) setShowThemeMenu(false);
            }}
          >
            Themes
          </li>
        </ul>
      )}

      <div className="dropDown">
        {showSortMenu && (
          <div
            onMouseEnter={() => {
              setEnteredSortMenu(true);
            }}
            onMouseLeave={() => {
              setEnteredSortMenu(false);
              setShowSortMenu(false);
            }}
          >
            <ul className="dropDownMenu sortMenu">
              <li
                onClick={() => {
                  dispatch({ actionTask: reducerTasks.ASCENDING });
                }}
              >
                Alphabeticaly
              </li>
              <li
                onClick={() => {
                  dispatch({ actionTask: reducerTasks.DESCENDING });
                }}
              >
                Alphabeticaly (Reverse)
              </li>
              <li
                onClick={() => {
                  dispatch({ actionTask: reducerTasks.IMPORTANCE });
                }}
              >
                Importance
              </li>
              <li
                onClick={() => {
                  dispatch({ actionTask: reducerTasks.TIME_UP });
                }}
              >
                Creation time
              </li>
              <li
                onClick={() => {
                  dispatch({ actionTask: reducerTasks.TIME_DOWN });
                }}
              >
                Creation time (Reverse)
              </li>
            </ul>
          </div>
        )}

        {showThemeMenu && (
          <div
            onMouseEnter={() => {
              setEnteredThemeMenu(true);
            }}
            onMouseLeave={(e) => {
              setEnteredThemeMenu(false);
              setShowThemeMenu(false);
            }}
          >
            <ul className="dropDownMenu themeMenu">
              <li onClick={()=>{dispatch({actionTask:reducerTasks.PURPLE_THEME})}} value="purple">Purple</li>
              <li onClick={()=>{dispatch({actionTask:reducerTasks.BLACK_THEME})}} value="black">Black</li>
              <li onClick={()=>{dispatch({actionTask:reducerTasks.WHITE_THEME})}} value="white">White</li>
              <li onClick={()=>{dispatch({actionTask:reducerTasks.RED_THEME})}} value="red">Red</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

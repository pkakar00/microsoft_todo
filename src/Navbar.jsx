import { useState, memo } from "react";
import names from "./Navbar constants";
import "./Navbar.css";
import { useLocation, useNavigate } from "react-router-dom";

const selected = "navbarElement selected";
const simple = "navbarElement";

const Navbar = memo(function Navbar() {
  const location = useLocation();
  console.log(location);
  const [selectedElement, changeSelectedElement] = useState(location.pathname.split('/')[1]);
  const navigate = useNavigate();
  function navClicked(e) {
    navigate(`/${e}`)
    changeSelectedElement(e);
  }
  function getClassName(e) {
    return selectedElement === e ? selected : simple;
  }
  return (
    <>
      <div className="navbar">
        <div className="searchbarContainer">
        </div>
        <button
          onClick={() => navClicked("MyDay")}
          className={getClassName("MyDay")}
        >
          <img src={require("./images/myday.png")} alt="Sun" />
          {names.MY_DAY}
        </button>
        <button
          onClick={() => navClicked("Important")}
          className={getClassName("Important")}
        >
          <img src={require("./images/important.png")} alt="Star" />
          {names.IMPORTANT}
        </button>
        <button
          onClick={() => navClicked("Planned")}
          className={getClassName("Planned")}
        >
          <img src={require("./images/planned.png")} alt="Box with 3 lines" />
          {names.PLANNED}
        </button>
        <button
          onClick={() => navClicked("Assigned")}
          className={getClassName("Assigned")}
        >
          <img src={require("./images/assigned.png")} alt="person" />
          {names.ASSIGNED}
        </button>
        <button
          onClick={() => navClicked("Flagged")}
          className={getClassName(`Flagged`)}
        >
          <img src={require("./images/flagged.png")} alt="flag" />
          {names.FLAGGED}
        </button>
        <button
          onClick={() => navClicked("Tasks")}
          className={getClassName("Tasks")}
        >
          <img src={require("./images/tasks.png")} alt="home" />
          {names.TASKS}
        </button>
        <hr />
        <button
          onClick={() => navClicked("Untitled")}
          className={getClassName("Untitled")}
        >
          <img src={require("./images/untitled.png")} alt="3 lines" />
          {names.UNTITLED}
        </button>
      </div>
    </>
  );
});
export default Navbar;

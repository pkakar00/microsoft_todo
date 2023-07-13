import { useState, memo } from "react";
import names from "./Navbar constants";
import "./Navbar.css";

const selected = "selected navbarElement";
const simple = "navbarElement";

const Navbar = memo(function Navbar({ onChange }) {
  const [searchValue, changeSearcheValue] = useState("");
  const [selectedElement, changeSelectedElement] = useState("My Day");

  function navClicked(e) {
    changeSelectedElement(e.target.innerText);
    onChange(e.target.innerText);
  }
  function getClassName(e) {
    return selectedElement === e ? selected : simple;
  }
  return (
    <>
      <div className="navbar">
        <div className="searchbarContainer">
          <input
            className="searchBar"
            type="text"
            value={searchValue}
            onChange={(e) => {
              changeSearcheValue(e.target.value);
            }}
            placeholder="Search"
          />
          <button className="searchImage">ss</button>
        </div>
        <button onClick={navClicked} className={getClassName(names.MY_DAY)}>
          <img src={require('./images/myday.png')} alt="Sun"/>
          {names.MY_DAY}
        </button>
        <button onClick={navClicked} className={getClassName(names.IMPORTANT)}>
          <img src={require('./images/important.png')} alt="Star"/>
          {names.IMPORTANT}
        </button>
        <button onClick={navClicked} className={getClassName(names.PLANNED)}>
          <img src={require('./images/planned.png')} alt="Box with 3 lines"/>
          {names.PLANNED}
        </button>
        <button onClick={navClicked} className={getClassName(names.ASSIGNED)}>
          <img src={require('./images/assigned.png')} alt="person"/>
          {names.ASSIGNED}
        </button>
        <button onClick={navClicked} className={getClassName(names.FLAGGED)}>
          <img src={require('./images/flagged.png')} alt="flag"/>
          {names.FLAGGED}
        </button>
        <button onClick={navClicked} className={getClassName(names.TASKS)}>
          <img src={require('./images/tasks.png')} alt="home"/>
          {names.TASKS}
        </button>
        <hr />
        <button onClick={navClicked} className={getClassName(names.UNTITLED)}>
          <img src={require('./images/untitled.png')} alt="3 lines"/>
          {names.UNTITLED}
        </button>
      </div>
    </>
  );
});
export default Navbar;

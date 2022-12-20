import React, { Component, useState } from "react";

import "./index.css";

let toDoList;
const addToList = (event) => {
  console.log(event.keyCode);
  if (event.keyCode == 13) {
    console.log("entered return");
    toDoList.push({ value: event.target.value });
  }
};
export default class CreateToDoList extends Component {
  render() {
    toDoList = useState([{ value: null }]);
    let toDoListMap = toDoList.map(function (toDo) {
      return (
        <input
          className="create-list-items"
          placeholder="enter TO DO"
          value={toDo.value}
          onKeyUp={addToList}
        ></input>
      );
    });
    return (
      <div className="create-list">
        <div className="create-list-content">
          <div className="create-list-editor">
            <div className="create-list-title-content">
              <input
                className="create-list-title"
                placeholder="ENTER TITLE OF LIST"
              />
            </div>
            <div className="create-list-items-content">{toDoListMap}</div>
          </div>
          <div className="create-list-preview">for me and you</div>
        </div>
      </div>
    );
  }
}

import React, { useState } from "react";

import "./index.css";

import { createList } from '../../services/listServices';

const toDo = [];
let toDoTitle = 'ToDo List Project';

const CreateToDoList = () => {
  const [toDoList, updateToDoListState] = useState(toDo);

  const addToList = (event) => {
    if (event.keyCode === 13) {
      toDo.push({ id: toDo.length + 1, value: event.target.value });
      updateToDoListState([...toDo]);
    }
  };


  const editToDoList = (event) => {
    const index = toDo.findIndex(object => {
      return object.id.toString() === event.target.id;
    });
    if (index > -1) {
      toDo[index].value = event.target.value;
      updateToDoListState([...toDo]);
    }
  }

  const createToDoListMap = () => {
    const toDoListMap = toDoList.map(function (todo) {
      return (
        <input
          key={todo.id.toString()}
          className="create-list-items"
          id={todo.id.toString()}
          placeholder="enter TO DO"
          defaultValue={todo.value}
          onChange={editToDoList}
        ></input>
      );
    });
    toDoListMap.push(
      <input
        key={(toDoList.length + 1).toString()}
        className="create-list-items"
        placeholder="enter TO DO"
        onKeyUp={addToList}
        autoFocus
      ></input>
    )
    return toDoListMap;
  }

  const createPreviewListMap = () => {
    const toDoListMap = toDoList.map(function (todo) {
      return (
        <li
          key={todo.id.toString()}
          className="create-list-preview-items"
          id={todo.id.toString()}
        >{todo.value}</li>
      );
    });
    return toDoListMap;
  }

  const editTitleToDo = (event) => {
    toDoTitle = event.target.value;
  }

  const saveToDoList = () => {
    console.log("I WANT TO SAVE MYSELF SO IM CALLING SERVICES");
    createList({title: toDoTitle, tasks: toDo})

  }


  return (
    <div className="create-list">
      <div className="create-list-content">
        <div className="create-list-editor">
          <div className="create-list-editor-content">
          <div className="create-list-title-content">
            <input
              className="create-list-title"
              placeholder="ENTER TITLE OF LIST"
              defaultValue={toDoTitle}
              onChange={editTitleToDo}
            />
          </div>
          <div className="create-list-items-content">{createToDoListMap()}</div>
          </div>
        </div>
        <div className="create-list-preview">
          <div className="create-list-preview-content">
            <div className="create-list-preview-title-content">
              <div className="create-list-preview-title">{toDoTitle}</div>
              <ol className="create-list-preview-items-content">{createPreviewListMap()}</ol>
            </div>
          </div>
        </div>
      </div>
      <div className="create-list-footer">
        <div className="create-list-footer-content">
          <button className="create-list-save-button" onClick={saveToDoList}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default CreateToDoList;

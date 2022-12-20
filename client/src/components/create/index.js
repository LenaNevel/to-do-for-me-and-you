import React, { useState } from "react";

import "./index.css";
const toDo = [{id: 1, value: 'add the preview'}, {id: 2, value: 'save to database'}, {id: 3, value: 'get a store going'}, {id: 4, value: 'fix title to take on % of height'}];
let toDoTitle = ''

const CreateToDoList = () => {
  const [toDoList, updateToDoListState] = useState(toDo);

  const addToList = (event) => {
    if (event.keyCode == 13) {
      toDo.push({ id: toDo.length + 1, value: event.target.value });
      updateToDoListState([...toDo]);
    }
  };

  const editToDoList = (event) => {
    const index = toDo.findIndex(object => {
      return object.id.toString() === event.target.id;
    });
    if (index != -1) {
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

  const editTitleToDo = (event) => {
    toDoTitle = event.target.value;
  }
  
  
  return (
    <div className="create-list">
      <div className="create-list-content">
        <div className="create-list-editor">
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
        <div className="create-list-preview">for me and you</div>
      </div>
    </div>
  );
};

export default CreateToDoList;

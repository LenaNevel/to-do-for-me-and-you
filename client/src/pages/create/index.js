import React, { useState } from 'react';

import './index.css';

// import { createList } from '../../services/listServices';

// const toDo = [];
let title = '';
let countId = 1;

const CreateToDoList = () => {
    let prevCode;
    const [hasTitle, updateHasTitle] = useState(title);
    const [data, updateData] = useState([]);

    const getMargin = (div) => {
        let margin = parseInt(div.style.marginLeft.replace('px', ''));
        if (!margin) margin = 0;
        return margin;
    };

    const addNewTask = (event) => {
        if (event.keyCode === 13) {
            const margin = getMargin(event.target.parentNode);
            const newToDo = {
                id: countId,
                task: event.target.value,
                completed: false,
                projectID: 'new',
                title: title,
                margin: margin
            };
            countId = countId + 1;
            updateData([...data, newToDo]);
            event.target.value = '';
        }
    };

    const indentTaskInput = (event) => {
        if (event.keyCode == 9) {
            event.preventDefault();
            const parentNode = event.target.parentNode;
            let previousMargin = getMargin(parentNode);
            let newMargin = prevCode === 16 ? previousMargin - 20 : previousMargin + 20;
            if (newMargin < 0) newMargin = 0;
            parentNode.style.marginLeft = newMargin + 'px';
        } else {
            prevCode = event.keyCode;
        }
    };

    const editNewTask = (event) => {
        console.log('i am in edit');
        const edit = data.find((task) => (task.id = event.target.id));
        const margin = getMargin(event.target.parentNode);
        edit.task = event.target.value;
        edit.margin = margin;
    };

    // const createToDoListMap = () => {
    //     const toDoListMap = toDoList.map(function (todo) {
    //         return (
    //             <input
    //                 key={todo.id.toString()}
    //                 className="create-list-items"
    //                 id={todo.id.toString()}
    //                 placeholder="enter TO DO"
    //                 defaultValue={todo.task}
    //                 onChange={editToDoList}
    //             ></input>
    //         );
    //     });
    //     toDoListMap.push(
    //         <input
    //             key={(toDoList.length + 1).toString()}
    //             className="create-list-items"
    //             placeholder="enter TO DO"
    //             onKeyUp={addToList}
    //             // eslint-disable-next-line jsx-a11y/no-autofocus
    //             autoFocus
    //         ></input>
    //     );
    //     return toDoListMap;
    // };

    const editTitleToDo = (event) => {
        title = event.target.value;
        if (event.keyCode && event.keyCode === 13) {
            if (hasTitle) {
                event.keyCode = 9;
            } else {
                updateHasTitle(true);
            }
        }
    };

    const saveList = () => {
        console.log('I WANT TO SAVE MYSELF SO IM CALLING SERVICES');
        console.log(data);
        // createList({title: toDoTitle, tasks: toDo})
    };

    return (
        <div className="create-list">
            <div className="create-list-content">
                <div className="create-single-list">
                    <div className="create-single-list-content">
                        <div className="create-single-list-title">
                            <input
                                placeholder="Enter a TITLE and press RETURN"
                                defaultValue={title}
                                onKeyUp={editTitleToDo}
                            />
                        </div>
                        {hasTitle && (
                            <div className="create-single-list-tasks">
                                {data.map((task) => {
                                    return (
                                        <div className="create-single-list-task" key={task.id}>
                                            <input
                                                type="checkbox"
                                                checked={false}
                                                readOnly
                                                // onChange={handleToggle}
                                            />
                                            <input
                                                className="create-single-list-task-input"
                                                id={task.id}
                                                placeholder="Enter a TASK and press RETURN"
                                                defaultValue={task.task}
                                                onKeyUp={editNewTask}
                                                onKeyDown={indentTaskInput}
                                            />
                                        </div>
                                    );
                                })}
                                <div className="create-single-list-task">
                                    <input type="checkbox" checked={false} readOnly />
                                    <input
                                        className="create-single-list-task-input"
                                        placeholder="Enter a TASK and press RETURN"
                                        onKeyUp={addNewTask}
                                        onKeyDown={indentTaskInput}
                                        // eslint-disable-next-line jsx-a11y/no-autofocus
                                        autoFocus
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="create-list-footer">
                <div className="create-list-footer-content">
                    <button className="create-list-save-button" onClick={saveList}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateToDoList;

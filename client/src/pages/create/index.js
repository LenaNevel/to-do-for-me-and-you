import React, { useState } from 'react';
const { nanoid } = require('nanoid');

import './index.css';

import { useDispatch } from 'react-redux';
import { saveTasks } from '../../redux/toDoSlice';

let title = '';
let orderId = 0;

const CreateToDoList = () => {
    let prevCode;

    const dispatch = useDispatch();

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
            const taskId = nanoid(10);
            const projectID = nanoid(10);
            const newToDo = {
                id: taskId,
                task: event.target.value,
                completed: false,
                projectID: projectID,
                title: title,
                indent: margin,
                taskOrder: orderId
            };
            updateData([...data, newToDo]);
            event.target.value = '';
            orderId = orderId + 1;
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
        const edit = data.find((task) => (task.id = event.target.id));
        const margin = getMargin(event.target.parentNode);
        edit.task = event.target.value;
        edit.indent = margin;
    };

    const editTitleToDo = (event) => {
        title = event.target.value;
        if (event.keyCode && event.keyCode === 13) {
            if (!hasTitle) {
                updateHasTitle(true);
            }
        }
    };

    const saveList = () => {
        dispatch(saveTasks(data));
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
                                    const margin = task.indent ? task.indent + 'px' : '0px';
                                    return (
                                        <div
                                            className="create-single-list-task"
                                            key={task.id}
                                            style={{ marginLeft: margin }}
                                        >
                                            <input type="checkbox" checked={false} readOnly />
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

import './index.css';
import React, { useState } from 'react';

const { nanoid } = require('nanoid');

import { useDispatch } from 'react-redux';
import { saveTasks, deleteList } from '../../redux/toDoSlice';

const SingleList = ({ tasks, allTasks, newId }) => {
    let prevCode;

    const [editedTasks, updateEditedTasks] = useState({});
    const [editList, updateEditList] = useState(tasks && tasks.length ? false : true);
    const [data, updateData] = useState([...tasks]);
    const [newAddedData, updateNewData] = useState([]);

    if (tasks.length != data.length && !Object.keys(editedTasks).length) updateData([...tasks]);

    const dispatch = useDispatch();

    let listTitle = ((allTasks || []).find((x) => x && x.title) || {}).title;
    let projectID = ((allTasks || []).find((x) => x && x.projectID) || {}).projectID;

    if (!projectID) projectID = nanoid(10);

    const getMargin = (div) => {
        let margin = parseInt(div.style.marginLeft.replace('px', ''));
        if (!margin) margin = 0;
        return margin;
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
    const handleEditList = async (e) => {
        const divID = e.target.id;
        const divType = e.target.type;
        let newData = [];
        switch (divID) {
            case 'edit-list':
                updateEditList(!editList);
                break;
            case 'delete-list':
                dispatch(deleteList({ projectID: projectID }));
                break;
            case 'saving-list':
                if (allTasks && allTasks.length > 0) {
                    for (let obj of allTasks) {
                        let newObj = { ...Object.freeze(obj) };
                        if (editedTasks[newObj.id]) {
                            newData.push(editedTasks[newObj.id]);
                        } else {
                            newObj.title = listTitle;
                            newData.push(newObj);
                        }
                    }
                }
                if (newId) {
                    const hideDiv = document.getElementById(newId);
                    hideDiv.style.display = 'none';
                }
                newData = [...newData, ...newAddedData];

                dispatch(saveTasks(newData));

                updateData(newData);
                updateEditList(!editList);
                updateEditedTasks({});
                updateNewData([]);
                break;
            case 'edit-title':
                listTitle = e.target.value;
                if (e.keyCode && e.keyCode === 13) {
                    const inputs = document.getElementsByClassName('create-task-input');
                    if (inputs && inputs.length) {
                        const nextInput = inputs[0];
                        nextInput.focus();
                    }
                }
                break;
            default:
                if (divType && divType == 'checkbox') {
                    for (let obj of allTasks) {
                        let newObj = { ...Object.freeze(obj) };
                        if (newObj.id === divID) {
                            newObj.completed = !newObj.completed;
                        }
                        newData.push(newObj);
                    }
                    dispatch(saveTasks(newData));
                    updateData(newData);
                } else {
                    if (divID) {
                        let newEditedTasks = { ...Object.freeze(editedTasks) };
                        let edit = allTasks.find((task) => task.id === divID);
                        let editNew = { ...Object.freeze(edit) };
                        const margin = getMargin(e.target.parentNode);
                        editNew.task = e.target.value;
                        editNew.indent = margin;
                        editNew.title = listTitle;
                        newEditedTasks[editNew.id] = editNew;
                        updateEditedTasks(newEditedTasks);
                    } else {
                        if (e.keyCode === 13) {
                            const margin = getMargin(e.target.parentNode);
                            const taskId = nanoid(10);
                            const newToDo = {
                                id: taskId,
                                task: e.target.value,
                                completed: false,
                                projectID: projectID,
                                title: listTitle,
                                indent: margin,
                                taskOrder: (allTasks || []).length + newAddedData.length
                            };
                            let newEditedTasks = { ...Object.freeze(editedTasks) };
                            newEditedTasks[newToDo.id] = newToDo;
                            updateEditedTasks(newEditedTasks);
                            updateNewData([...newAddedData, newToDo]);
                            e.target.value = '';
                        }
                    }
                }

                break;
        }
    };
    return (
        <div className="single-list" id={newId ? newId : projectID}>
            <div className="single-list-control-panel">
                <div
                    className="single-list-control-buttons"
                    id="edit-list"
                    role="presentation"
                    onClick={handleEditList}
                >
                    ✏️
                </div>
                <div
                    className="single-list-control-buttons"
                    id="delete-list"
                    role="presentation"
                    onClick={handleEditList}
                >
                    ❌
                </div>
            </div>
            <div className="single-list-content">
                <div className="single-list-title">
                    {editList ? (
                        <input
                            id="edit-title"
                            placeholder="Enter a TITLE"
                            defaultValue={listTitle}
                            onKeyUp={handleEditList}
                        />
                    ) : (
                        listTitle
                    )}
                </div>
                <div className="single-list-tasks">
                    {!editList &&
                        data.map((task) => {
                            const margin = task.indent ? task.indent + 'px' : '0px';

                            return (
                                <label
                                    className="single-list-task"
                                    key={task.id}
                                    style={{ marginLeft: margin }}
                                >
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        id={task.id}
                                        disabled={editList}
                                        onChange={handleEditList}
                                    />
                                    {task.task}
                                </label>
                            );
                        })}
                    {editList &&
                        allTasks &&
                        allTasks.map((task) => {
                            const margin = task.indent ? task.indent + 'px' : '0px';

                            return (
                                <label
                                    className="single-list-task"
                                    key={task.id}
                                    style={{ marginLeft: margin }}
                                >
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        id={'disabled-toggle-' + task.id}
                                        disabled={editList}
                                        onChange={handleEditList}
                                    />
                                    <input
                                        className="create-task-input"
                                        id={task.id}
                                        placeholder="Enter a TASK and press RETURN"
                                        defaultValue={task.task}
                                        onKeyUp={handleEditList}
                                        onKeyDown={indentTaskInput}
                                    />
                                </label>
                            );
                        })}
                    {newAddedData.length > 0 &&
                        newAddedData.map((task) => {
                            const margin = task.indent ? task.indent + 'px' : '0px';

                            return (
                                <label
                                    className="single-list-task"
                                    key={task.id}
                                    style={{ marginLeft: margin }}
                                >
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        id={'disabled-toggle-' + task.id}
                                        disabled={editList}
                                        onChange={handleEditList}
                                    />
                                    <input
                                        className="create-task-input"
                                        id={task.id}
                                        placeholder="Enter a TASK and press RETURN"
                                        defaultValue={task.task}
                                        onKeyUp={handleEditList}
                                        onKeyDown={indentTaskInput}
                                    />
                                </label>
                            );
                        })}
                    {editList && (
                        <div className="single-list-task">
                            <input type="checkbox" checked={false} disabled={true} />
                            <input
                                className="create-task-input"
                                placeholder="Enter a TASK and press RETURN"
                                // eslint-disable-next-line jsx-a11y/no-autofocus
                                autoFocus
                                onKeyUp={handleEditList}
                                onKeyDown={indentTaskInput}
                            />
                        </div>
                    )}
                </div>
            </div>
            {editList && (
                <div className="save-list-footer">
                    <div className="save-list-footer-content">
                        <button className="save-list-save-button" id="saving-list" onClick={handleEditList}>
                            Save
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SingleList;

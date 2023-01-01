// /* eslint-disable prettier/prettier */
// /* eslint-disable react/jsx-no-comment-textnodes */
// import React, { Component } from 'react';
import './index.css';
import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { toggleTask } from '../../redux/toDoSlice';

const SingleList = ({ data }) => {
    const [editList, updateEditList] = useState(false);

    const dispatch = useDispatch();
    const listTitle = (data.find((x) => x && x.title) || {}).title;
    const projectID = (data.find((x) => x && x.projectID) || {}).projectID;
    const handleToggle = (event) => {
        dispatch(toggleTask({ id: event.target.id, projectID: projectID }));
    };
    const handleEditList = () => {
        updateEditList(true);
    };
    return (
        <div className="single-list">
            <div className="single-list-control-panel">
                <div
                    className="single-list-control-buttons"
                    role="presentation"
                    id={projectID}
                    onClick={handleEditList}
                >
                    ✏️
                </div>
                <div className="single-list-control-buttons">❌</div>
            </div>
            <div className="single-list-content">
                <div className="single-list-title">
                    {editList ? (
                        <input placeholder="Enter a TITLE and press RETURN" defaultValue={listTitle} />
                    ) : (
                        listTitle
                    )}
                </div>
                <div className="single-list-tasks">
                    {data.map((task) => {
                        const margin = task.indent ? task.indent + 'px' : '0px';
                        return (
                            <label className="single-list-task" key={task.id} style={{ marginLeft: margin }}>
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    id={task.id}
                                    disabled={editList}
                                    onChange={handleToggle}
                                />
                                {editList ? (
                                    <input
                                        className="create-single-list-task-input"
                                        id={task.id}
                                        placeholder="Enter a TASK and press RETURN"
                                        defaultValue={task.task}
                                    />
                                ) : (
                                    task.task
                                )}
                            </label>
                        );
                    })}
                    {editList && (
                        <div className="create-single-list-task">
                            <input type="checkbox" checked={false} disabled={true} />
                            <input
                                className="create-single-list-task-input"
                                placeholder="Enter a TASK and press RETURN"
                                // eslint-disable-next-line jsx-a11y/no-autofocus
                                autoFocus
                            />
                        </div>
                    )}
                </div>
            </div>
            {editList && (
                <div className="create-list-footer">
                    <div className="create-list-footer-content">
                        <button className="create-list-save-button">Save</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SingleList;

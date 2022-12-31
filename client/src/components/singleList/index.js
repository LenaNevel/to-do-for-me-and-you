// import React, { Component } from 'react';
import './index.css';
import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { toggleTask } from '../../redux/toDoSlice';

import SingleListEdit from '../edit';

const SingleList = ({ data }) => {
    const [editList, updateEditList] = useState(false);
    const dispatch = useDispatch();
    console.log(editList);
    const listTitle = (data.find((x) => x && x.title) || {}).title;
    const projectID = (data.find((x) => x && x.projectID) || {}).projectID;
    const handleToggle = (event) => {
        dispatch(toggleTask({ id: event.target.id, projectID: projectID }));
    };
    const handleEditList = () => {
        console.log('i am editing list');
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

            {!editList && (
                <div className="single-list-content">
                    <div className="single-list-title">{listTitle}</div>
                    <div className="single-list-tasks">
                        {data.map((task) => {
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
                                        onChange={handleToggle}
                                    />
                                    {task.task}
                                </label>
                            );
                        })}
                    </div>
                </div>
            )}
            {editList && <SingleListEdit tasks={data} />}
        </div>
    );
};

export default SingleList;

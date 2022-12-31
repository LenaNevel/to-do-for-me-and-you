// import React, { Component } from 'react';
import './index.css';

import { useDispatch } from 'react-redux';
import { toggleTask } from '../../redux/toDoSlice';

const SingleList = ({ data }) => {
    const dispatch = useDispatch();
    const dataForSort = [...data];
    const dataSorted = dataForSort.sort(function (a, b) {
        return a.taskOrder - b.taskOrder;
    });
    const listTitle = (data.find((x) => x && x.title) || {}).title;
    const projectID = (data.find((x) => x && x.projectID) || {}).projectID;
    const handleToggle = (event) => {
        dispatch(toggleTask({ id: event.target.id, projectID: projectID }));
    };
    return (
        <div className="single-list">
            <div className="single-list-control-panel">
                <div className="single-list-control-buttons">✏️</div>
                <div className="single-list-control-buttons">❌</div>
            </div>
            <div className="single-list-content">
                <div className="single-list-title">{listTitle}</div>
                <div className="single-list-tasks">
                    {dataSorted.map((task) => {
                        const margin = task.indent ? task.indent + 'px' : '0px';
                        return (
                            <label className="single-list-task" key={task.id} style={{ marginLeft: margin }}>
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
        </div>
    );
};

export default SingleList;

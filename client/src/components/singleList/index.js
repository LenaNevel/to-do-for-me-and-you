// import React, { Component } from 'react';
import './index.css';

import { useDispatch } from 'react-redux';
import { toggleTask } from '../../redux/toDoSlice';

const SingleList = ({ data }) => {
    // render() {
    const dispatch = useDispatch();
    const listTitle = (data.find((x) => x && x.title) || {}).title;
    const projectID = (data.find((x) => x && x.projectID) || {}).projectID;
    const handleToggle = (event) => {
        dispatch(toggleTask({ id: event.target.id, projectID: projectID }));
    };
    return (
        <div className="single-list">
            <div className="single-list-content">
                <div className="single-list-title">{listTitle}</div>
                <div className="single-list-tasks">
                    {data.map((task) => {
                        return (
                            <label className="single-list-task" key={task.id}>
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
// };
// }

export default SingleList;

// import { useDispatch } from 'react-redux';

import './index.css';

const SingleListEdit = ({ title, tasks }) => {
    return (
        <div className="create-list">
            <div className="create-single-list-content">
                <div className="create-single-list-title">
                    <input placeholder="Enter a TITLE and press RETURN" defaultValue={title} />
                </div>
                <div className="create-single-list-tasks">
                    {tasks.map((task) => {
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
                                />
                            </div>
                        );
                    })}
                    <div className="create-single-list-task">
                        <input type="checkbox" checked={false} readOnly />
                        <input
                            className="create-single-list-task-input"
                            placeholder="Enter a TASK and press RETURN"
                            // eslint-disable-next-line jsx-a11y/no-autofocus
                            autoFocus
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SingleListEdit;

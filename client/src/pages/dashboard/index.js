import './index.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getToDoLists } from '../../redux/toDoSlice';

import SingleList from '../../components/singleList';

const Dashboard = () => {
    const [addNew, updateAddNew] = useState(null);
    let { toDoLists, isSuccess } = useSelector((state) => state.toDoLists);
    const dispatch = useDispatch();

    useEffect(() => {
        !isSuccess && dispatch(getToDoLists());
    }, [dispatch, isSuccess]);

    const addNewList = () => {
        let numberOfNew = addNew;
        if (!numberOfNew) numberOfNew = 0;
        updateAddNew(numberOfNew + 1);
    };
    return (
        <div className="dashboard">
            <div className="dashboard-actions">
                <div className="dashboard-actions-content">
                    <button className="action-create" onClick={addNewList}>
                        +
                    </button>
                </div>
            </div>
            <div className="dashboard-content">
                {addNew &&
                    Array(addNew)
                        .fill('new')
                        .map((_, index) => {
                            return <SingleList tasks={[]} newId={`new-${index}`} key={index} />;
                        })}
                {isSuccess &&
                    toDoLists &&
                    Object.keys(toDoLists).map((list) => {
                        return <SingleList tasks={toDoLists[list]} key={list} />;
                    })}
            </div>
        </div>
    );
};

export default Dashboard;

import './index.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getToDoLists } from '../../redux/toDoSlice';

import SingleList from '../../components/singleList';

const Dashboard = () => {
    const [addNew, updateAddNew] = useState(false);
    let { toDoLists, isSuccess } = useSelector((state) => state.toDoLists);
    // const [lists, updateLists] = useState([]);
    const dispatch = useDispatch();
    // add what happens if it's loading
    // add what happens if there is an error;
    useEffect(() => {
        // add the it's not loading
        !isSuccess && dispatch(getToDoLists());
    }, [dispatch, isSuccess]);

    // if (isSuccess) {
    //     updateLists(toDoLists);
    // }

    const addNewList = () => {
        console.log('adding new list');
        updateAddNew(true);
        // documentContent.appendChild(document.createElement(<SingleList tasks={[]} key="new" />));
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
                {isSuccess &&
                    toDoLists &&
                    Object.keys(toDoLists).map((list) => {
                        return <SingleList tasks={toDoLists[list]} key={list} />;
                    })}
                {addNew && <SingleList tasks={[]} key="new" />}
            </div>
        </div>
    );
};

export default Dashboard;

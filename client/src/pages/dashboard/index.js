import './index.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getToDoLists } from '../../redux/toDoSlice';

import SingleList from '../../components/singleList';

const Dashboard = () => {
    const { toDoLists, isSuccess } = useSelector((state) => state.toDoLists);
    const dispatch = useDispatch();
    // add what happens if it's loading
    // add what happens if there is an error;
    useEffect(() => {
        // add the it's not loading
        !isSuccess && dispatch(getToDoLists());
    }, [dispatch, isSuccess]);
    return (
        <div className="dashboard">
            <div className="dashboard-content">
                {isSuccess &&
                    toDoLists &&
                    Object.keys(toDoLists).map((list) => {
                        console.log(toDoLists[list]);
                        return <SingleList data={toDoLists[list]} key={list} />;
                    })}
            </div>
        </div>
    );
};

export default Dashboard;

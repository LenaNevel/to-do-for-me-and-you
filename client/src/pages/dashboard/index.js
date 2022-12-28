import './index.css';
import { useGetListsQuery } from '../../redux/apiSlice';

import SingleList from '../../components/singleList';


const Dashboard = () => {

  const {
    data: lists = {},
    // isLoading,
    // isFetching,
    isSuccess,
    // isError,
    // error,
  } = useGetListsQuery()

  // console.log(lists)
  // console.log(isSuccess)
  // console.log(isLoading)
  // console.log(isError)
  // console.log(isFetching)
  // console.log(error)

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        {isSuccess && lists && Object.keys(lists).map((list) => <SingleList data={lists[list]} key={list}/>)}
      </div>
    </div>
);
};

export default Dashboard;

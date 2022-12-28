import "./index.css";
import { useGetListsQuery } from '../../redux/apiSlice';


const Dashboard = () => {

  const {
    data: lists = [],
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetListsQuery()

  console.log(lists)
  console.log(isSuccess)
  console.log(isLoading)
  console.log(isError)

    return (
      <div className="dashboard">
        <div className="dashboard-content">
        </div>
      </div>
    );
};

export default Dashboard;
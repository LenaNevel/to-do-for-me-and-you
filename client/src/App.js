import "./App.css";

import Header from "./components/header";
import CreateToDoList from "./components/create";

function App() {
  return (
    <div className="App">
      <div className="App-container">
        <Header />
        <CreateToDoList />
      </div>
    </div>
  );
}

export default App;

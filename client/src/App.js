import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/header';
import Dashboard from './pages/dashboard';

function App() {
    return (
        <Router>
            <div className="App">
                <div className="App-container">
                    <Header />
                    <Routes>
                        <Route exact path="/" element={<Dashboard />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;

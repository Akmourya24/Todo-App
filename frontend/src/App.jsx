
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from './components/Navbar';
import Task from './components/Task';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task" element={<Task />} />
      </Routes>
    </Router>
  );
};


export default App

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/popper.min.js';
import ExamList from "./pages/Logs/ExamList";
import ExamLogs from "./pages/Logs/ExamLogs";
import Navbar from "./components/Layout";
import Layout from "./components/Layout";
import LogList from "./pages/Logs/LogList";
import TablePlatform from "./components/TablePlatform";
import LogModal from "./pages/Logs/LogModal";
import {useState} from "react";
import CollapsibleModal from "./pages/Logs/LogModal";


function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (

        <Router>
            <Layout>
                <Routes>
                        <Route path="/"  element={<ExamList />} />
                        <Route path="/logs/:examId/:moduleName" element={<LogList/>} />
                </Routes>
            </Layout>
        </Router>
  );
}
export default App;


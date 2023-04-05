import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ExamList from "./pages/Logs/ExamList";
import Layout from "./components/Layout";
import ExamLogList from "./pages/Logs/ExamLogList";
import {useEffect, useState} from "react";
import WelcomePage from "./pages/Home/WelcomePage";
import Login from "./pages/Login/LoginForm";
import ExamForm from "./pages/Timer/ExamForm";
import TimerPage from "./pages/Timer/TimerPage";
import ExamFormPage from "./pages/Timer/ExamFormPage";


function App() {

    const [isTimerSet, setIsTimerSet] = useState(false);
    const [formData, setFormData] = useState({
        moduleName: "",
        moduleCode: "",
        venue: "",
        noOfStudents: "",
        examType: "NORMAL",
        startTime: "",
        durationHrs: "",
        durationMins: "",
        log:"",
        restrictedMinutes: "",
    });

    useEffect(() => {
        const data = localStorage.getItem("formData");
        if (data) {
            setFormData(JSON.parse(data));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("formData", JSON.stringify(formData));
    }, [formData]);


    const [login, setLogin] = useState(false);

    const handleLoginClose = () => {
        setLogin(false);
    };

    const showLoginModal = () => {
        setLogin(true);
    }


    return (

        <Router>
            <Layout>
                <Routes>
                        <Route path="/"  element={<WelcomePage  handleLogin={showLoginModal}/>} />
                     <    Route path="/exams"  element={<ExamList/>} />
                      <    Route path="/new-exam"  element={<TimerPage form={formData} setForm={setFormData} />} />
                      <Route path="/timer"  element={<TimerPage form={formData} setForm={setFormData}/>} />
                        <Route path="/logs/:examId/:moduleName" element={<ExamLogList/>} />
                </Routes>
                <Login show={login} handleClose={handleLoginClose} />
            </Layout>
        </Router>
  );
}
export default App;


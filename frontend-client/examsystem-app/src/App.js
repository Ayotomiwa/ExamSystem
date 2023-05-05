import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ExamList from "./pages/Logs/ExamList";
import Layout from "./components/Layout";
import ExamLogList from "./pages/Logs/ExamLogList";
import {useEffect, useState} from "react";
import WelcomePage from "./pages/Home/WelcomePage";
import LoginForm from "./pages/Login/LoginForm";
import TimerPage from "./pages/Timer/TimerPage";
import SignUpForm from "./pages/Login/SignUpForm";
import {AuthProvider} from "./components/AuthHandler";
import PrivateWrapper from "./components/PrivateWrapper";


function App() {

    const [timerMode, setTimerMode] = useState(true);
    const [login, setLogin] = useState(false);
    const [signUp, setSignUp] = useState(false);
    const [lastPage, setLastPage] = useState("");
    const [nextPage, setNextPage] = useState("");

    const [formData, setFormData] = useState({
        moduleName: "N/A",
        moduleCode: "N/A",
        venue: "",
        noOfStudents: "",
        examType: "NORMAL",
        startTime: "",
        endTime: "",
        durationHrs: "",
        durationMins: "",
        notes: [],
        restrictedMinutes: "30",
    });

    const [tempForm, setTempForm] = useState({
        durationHrs: formData.durationHrs,
        durationMins: formData.durationMins,
        startTime: formData.startTime,
        restrictedMinutes: formData.restrictedMinutes,
    });

    useEffect(() => {
        const data = localStorage.getItem("formData");
        if (data) {
            const parsedData = JSON.parse(data);
            if (!Array.isArray(parsedData.notes)) {
                parsedData.notes = [];
            }
            setFormData(parsedData);
        }
    }, []);


    useEffect(() => {
        localStorage.setItem("formData", JSON.stringify(formData));
    }, [formData]);


    return (
        <AuthProvider>
            <Router>
                <Layout timerMode={timerMode} setTimerMode={setTimerMode} setLogin={setLogin}>
                    <Routes>
                        <Route path="/" element={<WelcomePage setLogin={setLogin}/>}/>
                        < Route path="/exams" element={<ExamList setLoginModal={setLogin} setNextPage={setNextPage}/>}/>
                        < Route path="/new-exam"
                                element={<TimerPage form={formData} setForm={setFormData} timerMode={timerMode}
                                                    setTimerMode={setTimerMode} tempForm={tempForm}
                                                    setTempForm={setTempForm}/>}/>
                        <Route path="/logs/:examId/:moduleName" element={<ExamLogList setLogin={setLogin} setNextPage={setNextPage}/>}/>
                        <Route path="*" element={<WelcomePage/>}/>
                    </Routes>
                    <LoginForm show={login} setLoginModal={setLogin} setSignUp={setSignUp} />
                    <SignUpForm show={signUp} setLogin={setLogin} setSignUp={setSignUp}/>
                </Layout>
            </Router>
        </AuthProvider>
    );
}

export default App;


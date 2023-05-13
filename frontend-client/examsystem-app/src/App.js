import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ExamList from "./pages/Logs/ExamList";
import Layout from "./components/Layout";
import ExamLogList from "./pages/Logs/ExamLogList";
import {useContext, useEffect, useState} from "react";
import WelcomePage from "./pages/Home/WelcomePage";
import LoginForm from "./pages/Login/LoginForm";
import TimerPage from "./pages/Timer/TimerPage";
import SignUpForm from "./pages/Login/SignUpForm";
import AuthHandler, {AuthProvider} from "./components/AuthHandler";
import PrivateWrapper from "./components/PrivateWrapper";


function App() {

    const [timerMode, setTimerMode] = useState(true);
    const [login, setLogin] = useState(false);
    const [signUp, setSignUp] = useState(false);

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
    }, [formData, tempForm]);


    useEffect(() => {
        const data = localStorage.getItem("tempForm");
        const ogData = localStorage.getItem("formData");

        console.log("data: ", data);
        console.log("ogData: ", ogData);

        const parsedData = JSON.parse(ogData);

        if (ogData) {
            setTempForm({
                ...tempForm,
                durationHrs: parsedData.durationHrs,
                durationMins: parsedData.durationMins,
                startTime: parsedData.startTime,
                restrictedMinutes: parsedData.restrictedMinutes,
            });
        }

    }, [formData]);

    useEffect(() => {
        let wakeLock = null;
        async function requestWakeLock() {
        try {
            if(window.location.pathname === "/new-exam"){
                wakeLock = await navigator.wakeLock.request('screen');
            console.log('Screen Wake Lock is active');
            wakeLock.addEventListener('release', () => {
                console.log('Screen Wake Lock is released');
            });
            }
        } catch (err) {
            console.error(`${err.name}, ${err.message}`);
        }
        }
        requestWakeLock();
       if (window.location.pathname !== "/new-exam"){
           if(wakeLock !== null){
                wakeLock.release();
                console.log('Screen Wake Lock is released');
           }

        }
    },[]);






    return (
        <AuthProvider>
            <Router>
                <Layout timerMode={timerMode} setTimerMode={setTimerMode} setLogin={setLogin}>
                    <Routes>
                        <Route path="/" element={<WelcomePage setLogin={setLogin}/>}/>
                        < Route path="/exams" element={<ExamList setLoginModal={setLogin}/>}/>
                        < Route path="/new-exam"
                                element={<TimerPage form={formData} setForm={setFormData} timerMode={timerMode}
                                                    setTimerMode={setTimerMode} tempForm={tempForm}
                                                    setTempForm={setTempForm}/>}/>
                        <Route path="/logs/:examId/:moduleName" element={<ExamLogList setLogin={setLogin}/>}/>
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


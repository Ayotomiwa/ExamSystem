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

    const [isTimerSet, setIsTimerSet] = useState(false);
    const [timerMode, setTimerMode] = useState(true);
    const [login, setLogin] = useState(false);
    const [signUp, setSignUp] = useState(false);
    const [lastPage, setLastPage] = useState("");
    const [userLoggedIn, setUserLoggedIn] = useState(false);
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


    // useEffect(() => {
    //     const data = localStorage.getItem("tempForm");
    //     if (data) {
    //         const parsedData = JSON.parse(data);
    //         setTempForm(parsedData);
    //     }
    // }, []);
    //
    // useEffect(() => {
    //     localStorage.setItem("tempForm", JSON.stringify(tempForm));
    // }, [tempForm]);

    // useEffect(() => {
    //     const data = localStorage.getItem("user");
    //     if (data.token) {
    //         const parsedData = JSON.parse(data);
    //         setUser(parsedData);
    //         setLogin(true);
    //     }
    // }, []);

    // useEffect(() => {
    //     localStorage.setItem("user", JSON.stringify(user));
    //     setUserLoggedIn(true);
    // }, [user]);


    // useEffect(() => {
    // if(window.location === "/logs/**" && !user.token){
    //     //return to last page
    //     setLogin(true);
    // }
    // }, [window.location.pathname]);

    return (
        <AuthProvider>
            <Router>
                <Layout timerMode={timerMode} setTimerMode={setTimerMode}>
                    <Routes>
                        <Route path="/" element={<WelcomePage setLogin={setLogin}/>}/>
                        < Route path="/exams" element={<ExamList setLoginModal={setLogin} setNextPage={setNextPage}/>}/>
                        < Route path="/new-exam"
                                element={<TimerPage form={formData} setForm={setFormData} timerMode={timerMode}
                                                    setTimerMode={setTimerMode} tempForm={tempForm}
                                                    setTempForm={setTempForm}/>}/>
                        {/*<Route*/}
                        {/*    path="/logs/:examId/:moduleName"*/}
                        {/*    element={*/}
                        {/*        <PrivateWrapper setLogin={setLogin}*/}
                        {/*                        element={<ExamLogList/>}/>*/}
                        {/*    }*/}
                        {/*/>*/}

                        <Route path="/logs/:examId/:moduleName" element={<ExamLogList setLogin={setLogin} setNextPage={setNextPage}/>}/>
                    </Routes>
                    <LoginForm show={login} setLogin={setLogin} setSignUp={setSignUp} nextPage={nextPage}/>
                    <SignUpForm show={signUp} setLogin={setLogin} setSignUp={setSignUp} nexPage={nextPage}/>
                </Layout>
            </Router>
        </AuthProvider>
    );
}

export default App;


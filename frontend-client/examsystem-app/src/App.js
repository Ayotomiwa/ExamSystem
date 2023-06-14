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
import pdfWrapper from "./components/pdfWrapper";


function App() {

    const [timerMode, setTimerMode] = useState(false);
    const [login, setLogin] = useState(false);
    const [signUp, setSignUp] = useState(false);
    const academicRegulations2122 = "/pdfs/Academic_Regulations_2021-2022.pdf";
    const academicRegulations2223 = "/pdfs/Academic-Regulations-2022-23.pdf";
    const assessmentAndExamsProcedure2122 = "/pdfs/Assessment_and_Examinations_Procedure_2021-22_.pdf";
    const assessmentAndExamsProcedure2223 = "/pdfs/Assessment_and_Examinations_Procedure_2022-23_.pdf";
    const glossary2021 = "/pdfs/Glossary_2021-2022.pdf";
    const lsbuListOfAwards2223 = "/pdfs/LSBU_List_of_Awards_2022-2023.pdf";
    const recommendedTranslationScale= "/pdfs/recommended-translation-scale.pdf";
    const studentAcademicMisconductProcedure= "/pdfs/student-academic-misconduct-procedure.pdf";


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
                        <Route path={academicRegulations2223} element={<pdfWrapper pdf={academicRegulations2223}/>}/>
                        <Route path={academicRegulations2122} element={<pdfWrapper pdf={academicRegulations2122}/>}/>
                        <Route path={assessmentAndExamsProcedure2122} element={<pdfWrapper pdf={assessmentAndExamsProcedure2122}/>}/>
                        <Route path={assessmentAndExamsProcedure2223} element={<pdfWrapper pdf={assessmentAndExamsProcedure2223}/>}/>
                        <Route path={glossary2021} element={<pdfWrapper pdf={glossary2021}/>}/>
                        <Route path={lsbuListOfAwards2223} element={<pdfWrapper pdf={lsbuListOfAwards2223}/>}/>
                        <Route path={recommendedTranslationScale} element={<pdfWrapper pdf={recommendedTranslationScale}/>}/>
                        <Route path={studentAcademicMisconductProcedure} element={<pdfWrapper pdf={studentAcademicMisconductProcedure}/>}/>
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


import ExamForm from "./ExamForm";


const ExamFormPage = ({form, setForm}) => {

    return (
        <div id="exam-form-page">
            <div style={{minWidth:"45%"}}>
                <ExamForm form={form} setForm={setForm} />
            </div>
        </div>
    )
};

export default ExamFormPage;
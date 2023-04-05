import ExamForm from "./ExamForm";


const ExamFormPage = ({form, setForm}) => {

    return (
        <div id="exam-form-page">
            <ExamForm form={form} setForm={setForm} />
        </div>
    )
};

export default ExamFormPage;
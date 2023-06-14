import {useNavigate} from "react-router-dom";

const pdfRedirect = ({to}) => {
    const navigate = useNavigate();

    return (
        <div>
            navigate(to);
        </div>
    )
}

export default pdfRedirect;
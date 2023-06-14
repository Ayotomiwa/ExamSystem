import {Link, useNavigate} from "react-router-dom";

const pdfWrapper = ({pdf}) => {
    const navigate = useNavigate();

    window.open(pdf, "_blank", "noopener noreferrer");
    navigate(-1);

    return null;

}


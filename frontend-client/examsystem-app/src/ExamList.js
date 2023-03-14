import { Breadcrumb, BreadcrumbItem, Card, Table, Button } from "react-bootstrap";
import { TableContainer, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import { Sort } from "@material-ui/icons";
import "./style.css";
import SearchBar from "./SearchBar";
import {useEffect, useRef, useState} from "react";
import ExamTableRow from "./ExamTableRow";
import TablePlatform from "./TablePlatform";

const ExamList = () => {

    const [exams, setExams] = useState([]);
    const [searchTerm,setSearchTerm] = useState("");
    const [searchOn, setSearchOn] = useState(false);
    const [page, setPage] = useState(0);
    const [numberOfExams, setNumberOfExams] = useState(0);
    const[totalExams, setTotalExams] = useState(0);
    const mounted = useRef(false);


    useEffect(() => {
        console.log("IN Fetch Examsssssssssss");
        const fetchExams = () => {
            fetch(`http://localhost:8080/api/exams?size=30&page=${page}`)
                .then(response => response.json())
                .then(data => {
                    setTotalExams(data.totalElements);
                    setNumberOfExams(numberOfExams + data.numberOfElements)
                    setExams(prevState => prevState.concat(data.content));
                    // populateExamTable(data.content);
                })
                .catch(error => console.error(error));
        };
        if(searchOn===false || searchTerm === ""){
            if (page === 0) {
                setExams([]);
            }
            console.log("Fetching Examssssssssssssssssss");
            fetchExams();
        }

    }, [page, searchOn === false]);

    useEffect(() => {

        console.log("IN Searching Examsssssssssss");
        const searchExams = () => {
            fetch(`http://localhost:8080/api/exams/search?query=${searchTerm}&size=30&page=${page}`)
                .then(response => response.json())
                .then(data => {
                    setTotalExams(data.totalElements);
                    setNumberOfExams(numberOfExams + data.numberOfElements)
                    setExams(prevState => prevState.concat(data.content));
                    // populateExamTable(data.content);
                })
                .catch(error => console.error(error));
        };
        if (searchOn === true && searchTerm !== "") {
            if (page === 0) {
                setExams([]);
            }
            searchExams();
            console.log("Searching Examsssss");
        }

        }, [searchTerm, page, searchOn]);


    const handleSearch = (searchTerm) => {
        if(searchTerm === ""){
            return;
        }
        setNumberOfExams(0);
        setSearchOn(true);
        setSearchTerm(searchTerm);
        setPage(0);

    };

    const handleInputChange= (searchTerm) => {
        console.log(searchTerm + " " + searchOn);
        if (searchTerm === ""){
            setPage(0);
            setNumberOfExams(0);
            setSearchOn(false);
            console.log(searchOn);
        }

    };

    const loadMoreExams = () => {
        console.log("load more button clicked");
        setPage(page + 1);
    }

    return (
        <div>
            <SearchBar onSearch={handleSearch} onChange={handleInputChange}/>
            <TablePlatform  breadcrumbs={[{ label: "Exams List", url: "/" }]}>
                    <TableContainer id="table-container">
                        <Table  size="small" aria-label="a dense table" >
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Module Code
                                        <Button variant="link" className="sort-btn" data-sort="course.moduleCode">
                                            <Sort />
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        Module Name
                                        <Button variant="link"  className="sort-btn" data-sort="course.moduleName">
                                            <Sort  />
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        Module Leader
                                        <Button variant="link"  className="sort-btn" data-sort="course.moduleLeader">
                                            <Sort />
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        Exam Date
                                        <Button variant="link" className="sort-btn" data-sort="day">
                                            <Sort/>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody id="content_body">
                                {exams.length === 0 ?
                                   <tr><td colSpan="4"><p id={"no-data"}> No Data to be Displayed</p></td></tr>
                                        : exams.map((exam) => {
                                        console.log("Helloooo" + exam);
                                        return (
                                    <ExamTableRow
                                        key={exam.examId}
                                        examId={exam.examId}
                                        moduleCode={exam.course.moduleCode}
                                        moduleName={exam.course.moduleName}
                                        moduleLeader={exam.course.moduleLeader}
                                        day={exam.day}
                                    />
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
            </TablePlatform>
                {/*</Card.Body>*/}
            {/*</Card>*/}
            <div className="text-center" id="load-more">
                <p id="page-info">
                    Showing {numberOfExams} of {searchOn ? totalExams+ " search results "  : totalExams+ " total"}
                </p>
                <Button variant="outline-secondary" id="load-more-btn" onClick={loadMoreExams}>
                    Load More Exams
                </Button>
            </div>
        </div>
    );
};

export default ExamList;





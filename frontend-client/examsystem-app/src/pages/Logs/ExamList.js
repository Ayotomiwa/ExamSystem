import { Breadcrumb, BreadcrumbItem, Card, Table, Button } from "react-bootstrap";
import { TableContainer, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import { Sort } from "@mui/icons-material";
import "../../App.css";
import SearchBar from "../../components/SearchBar";
import {useEffect, useRef, useState} from "react";
import ExamTableRow from "./ExamTableRow";
import TablePlatform from "../../components/TablePlatform";

const ExamList = () => {

    const [exams, setExams] = useState([]);
    const [searchTerm,setSearchTerm] = useState("");
    const [searchOn, setSearchOn] = useState(false);
    const [page, setPage] = useState(0);
    const [numberOfExams, setNumberOfExams] = useState(0);
    const[totalExams, setTotalExams] = useState(0);
    const [sortColumn, setSortColumn] = useState("examDay");
    const [sortState, setSortState] = useState("DESC");
    const mounted = useRef(false);
    const basicExamsUrl = "http://localhost:8080/api/exams";
    const fetchExamsUrl= `size=30&page=${page}&sortBy=${sortColumn}&sort=${sortState}`;
    const searchExamsUrl= basicExamsUrl + `/search?query=${searchTerm}` ;


    useEffect(() => {
        if (searchOn === false || searchTerm === "") {
            console.log("fetching examssssss")
            fetchExamsData();
        }
    }, [page, searchOn === false, sortColumn, sortState]);

    useEffect(() => {
        if (searchOn === true && searchTerm !== "") {
            console.log("searching exams")
            if(page === 0){
                setExams([]);
            }
            console.log(searchExamsUrl + fetchExamsUrl);
            fetchSearchData();
        }
    }, [page, searchTerm, searchOn, sortColumn, sortState]);



    // useEffect(() => {
    //     console.log("IN Fetch Examsssssssssss");
    //     const fetchExams = () => {
    //         fetch(`http://localhost:8080/api/exams?size=30&page=${page}`)
    //             .then(response => response.json())
    //             .then(data => {
    //               processExamData(data);
    //             })
    //             .catch(error => console.error(error));
    //     };
    //     if(searchOn===false || searchTerm === ""){
    //         if (page === 0) {
    //             setExams([]);
    //         }
    //         console.log("Fetching Examssssssssssssssssss");
    //         fetchExams();
    //     }
    //
    // }, [page, searchOn === false]);
    //
    // useEffect(() => {
    //
    //     console.log("IN Searching Examsssssssssss");
    //     const searchExams = () => {
    //         fetch(`http://localhost:8080/api/exams/search?query=${searchTerm}&size=30&page=${page}`)
    //             .then(response => response.json())
    //             .then(data => { processExamData(data);
    //             })
    //             .catch(error => console.error(error));
    //     };
    //     if (searchOn === true && searchTerm !== "") {
    //         if (page === 0) {
    //             setExams([]);
    //         }
    //         searchExams();
    //         console.log("Searching Examsssss");
    //     }
    //
    //     }, [searchTerm, page, searchOn]);
    //

    const handleSort = (column) => {
        if (column === sortColumn) {
            if (sortState === "ASC") {
                setSortState("DESC");
            } else {
                setSortState("ASC");
            }
        } else {
            setSortColumn(column);
            setSortState("ASC");
        }
        resetExamList(searchOn);
        setExams([]);
    }

    const fetchExamsData = () => {
        fetch(basicExamsUrl + "?"+ fetchExamsUrl)
            .then(response => response.json())
            .then(data => {
                processExamData(data);
            })
            .catch(error => console.error(error));
    }

    const fetchSearchData = () => {
        fetch(searchExamsUrl +"&"+ fetchExamsUrl)
            .then(response => response.json())
            .then(data => {
                processExamData(data);
            })
            .catch(error => console.error(error));
    }

    const processExamData = (data) => {
        console.log("size-  "+ data.numberOfElements + " heyyyyyy");
        setTotalExams(data.totalElements);
        setNumberOfExams(numberOfExams + data.numberOfElements)
        setExams(prevState => prevState.concat(data.content));
    }

    const resetExamList = (value) => {
        setNumberOfExams(0);
        setSearchOn(value);
        setPage(0);
    }

    const handleSearch = (searchTerm) => {
        console.log(searchTerm + " Handlesearch " + searchOn);
        if(searchTerm === ""){
            return;
        }
        console.log("search button clicked");
        resetExamList(true);
        setSearchTerm(searchTerm);

    };

    const handleInputChange= (searchTerm) => {
        if (searchTerm === ""){
            resetExamList(false);
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
                                        <Button variant="link" className="sort-btn" data-sort="course.moduleCode"
                                                onClick={()=>handleSort("course.moduleCode")}>
                                            <Sort />
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        Module Name
                                        <Button variant="link"  className="sort-btn" data-sort="course.moduleName"
                                        onClick={()=>handleSort("course.moduleName")}>
                                            <Sort  />
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        Module Leader
                                        <Button variant="link"  className="sort-btn" data-sort="course.moduleLeader"
                                        onClick={()=>handleSort("course.moduleLeader")}>
                                            <Sort />
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        Exam Date
                                        <Button variant="link" className="sort-btn" data-sort="examDay"
                                                onClick={()=>handleSort("examDay")}>
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
                                        day={exam.examDay}
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





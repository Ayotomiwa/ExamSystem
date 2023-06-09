import {Breadcrumb, BreadcrumbItem, Card, Table, Button, Spinner} from "react-bootstrap";
import { TableContainer, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { Sort } from "@mui/icons-material";
import "../../App.css";
import SearchBar from "../../components/SearchBar";
import {useEffect, useRef, useState} from "react";
import ExamListRow from "./ExamListRow";
import TablePlatform from "../../components/TablePlatform";
import "./table.css";

const ExamList = ({setLoginModal}) => {

    const [exams, setExams] = useState([]);
    const [searchTerm,setSearchTerm] = useState("");
    const [search, setSearch] = useState(false);
    const [page, setPage] = useState(0);
    const [numberOfExams, setNumberOfExams] = useState(0);
    const[totalExams, setTotalExams] = useState(0);
    const [sortColumn, setSortColumn] = useState("examDay");
    const [sortState, setSortState] = useState("DESC");
    const mounted = useRef(false);
    const [loading, setLoading] = useState(false);
    const basicExamsUrl = "https://lsbu-ex-timer.herokuapp.com/api/exams";
    // const basicExamsUrl = "http://localhost:8080/api/exams";
    const fetchExamsUrl= `size=30&page=${page}&sortBy=${sortColumn}&sort=${sortState}`;
    const searchExamsUrl= basicExamsUrl + `/search?query=${searchTerm}` ;


    useEffect(() => {
        if (search === false || searchTerm === "") {
            setExams([]);
            fetchExamsData();
        }
        else if(search === true && searchTerm !== ""){
            if(page === 0){
                setExams([]);
            }
            fetchSearchData();
        }
    }, [page, search,searchTerm, sortColumn, sortState]);

    // useEffect(() => {
    //     if (search === true && searchTerm !== "") {
    //         if(page === 0){
    //             setExams([]);
    //         }
    //         fetchSearchData();
    //     }
    // }, [page, searchTerm, search, sortColumn, sortState]);



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
        resetExamList(search);
        setExams([]);
    }

    const fetchExamsData = () => {
        setLoading(true)
        fetch(basicExamsUrl + "?"+ fetchExamsUrl)
            .then(response => response.json())
            .then(data => {
                processExamData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error)
                setLoading(false);
            });
    }

    const fetchSearchData = () => {
        setLoading(true);
        fetch(searchExamsUrl +"&"+ fetchExamsUrl)
            .then(response => response.json())
            .then(data => {
                processExamData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error)
                setLoading(false);
            });
    }

    const processExamData = (data) => {
        setTotalExams(data.totalElements);
        setNumberOfExams(numberOfExams + data.numberOfElements)
        setExams(prevState => prevState.concat(data.content));
    }

    const resetExamList = (value) => {
        // setExams([]);
        setNumberOfExams(0);
        setPage(0);
        setSearch(value);
    }

    const handleSearch = (searchTerm) => {
        if(searchTerm === ""){
            return;
        }
        resetExamList(true);
        setSearchTerm(searchTerm);
    };

    const handleInputChange= (searchTerm) => {
        if (searchTerm === ""){
            // setExams([]);
            // fetchExamsData();
            resetExamList(false);
            console.log(search);
        }
    };

    const loadMoreExams = () => {
        if (numberOfExams >= totalExams) {
            return;
        }
        setPage(page + 1);
    }

    return (
        <div>
            <SearchBar onSearch={handleSearch} onChange={handleInputChange}/>
            <TablePlatform  breadcrumbs={[{ label: "Exams List", url: "/" }]}>
                    <TableContainer className="table-container">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell width="55%">
                                        Module Code&nbsp;
                                        <Button variant="link" className="sort-btn" data-sort="module.moduleCode"
                                                data-sort-state={sortColumn === "module.moduleCode" ? sortState : ""}
                                                onClick={()=>handleSort("module.moduleCode")}>
                                            <Sort />
                                        </Button>
                                    </TableCell>
                                    <TableCell width="70%">
                                        Module Name&nbsp;
                                        <Button variant="link"  className="sort-btn" data-sort="module.moduleName"
                                                onClick={()=>handleSort("module.moduleName")}>
                                            <Sort  />
                                        </Button>
                                    </TableCell>
                                    <TableCell width="35%">
                                        Module Leader&nbsp;
                                        <Button variant="link"  className="sort-btn" data-sort="module.moduleLeader"
                                                data-sort-state={sortColumn === "module.moduleLeader" ? sortState : ""}
                                                onClick={()=>handleSort("module.moduleLeader")}>
                                            <Sort />
                                        </Button>
                                    </TableCell>
                                    <TableCell width="40%">
                                        Exam Date&nbsp;
                                        <Button variant="link" className="sort-btn" data-sort="examDay"
                                                data-sort-state={sortColumn === "examDay" ? sortState : ""}
                                                onClick={()=>handleSort("examDay")}>
                                            <Sort/>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody id="content_body">

                                    {loading ? (
                                        <TableRow>
                                        <TableCell colSpan="5" style={{ textAlign: "center" }}>
                                            <div style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                height: "100vh",
                                                width: "100%",
                                            }}>
                                            <Spinner animation="border" variant="primary" id="spinner" size="100" style={{width:"100px", height:"100px"}} />
                                            </div>
                                        </TableCell>
                                        </TableRow>

                                    ) :
                                exams.length === 0 ? (
                                   <tr><td colSpan="4"><p id={"no-data"}> No Data to be Displayed</p></td></tr>
                                ) : ( exams.map((exam, index) => {
                                        return (
                                    <ExamListRow
                                        key={`${exam.examId}-${index}`}
                                        examId={exam.examId}
                                        moduleCode={exam.module.moduleCode}
                                        moduleName={exam.module.moduleName}
                                        moduleLeader={exam.module.moduleLeader}
                                        day={exam.examDay}
                                        setLoginModal={setLoginModal}
                                    />
                                    );
                                })
                                    )}
                            </TableBody>
                        </Table>
                    </TableContainer>
            </TablePlatform>
                {/*</Card.Body>*/}
            {/*</Card>*/}
            <div className="text-center" id="load-more">
                <p id="page-info">
                    Showing {numberOfExams} of {search ? totalExams+ " search results "  : totalExams+ " total"}
                </p>
                <Button variant="outline-secondary" id="load-more-btn" onClick={loadMoreExams}>
                    Load More Exams
                </Button>
            </div>
        </div>
    );
};

export default ExamList;





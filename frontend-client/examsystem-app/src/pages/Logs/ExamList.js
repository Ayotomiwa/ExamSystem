import { Breadcrumb, BreadcrumbItem, Card, Table, Button } from "react-bootstrap";
import { TableContainer, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { Sort } from "@mui/icons-material";
import "../../App.css";
import SearchBar from "../../components/SearchBar";
import {useEffect, useRef, useState} from "react";
import ExamListRow from "./ExamListRow";
import TablePlatform from "../../components/TablePlatform";
import "./table.css";

const ExamList = () => {

    const [exams, setExams] = useState([]);
    const [searchTerm,setSearchTerm] = useState("");
    const [search, setSearch] = useState(false);
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
        if (search === false || searchTerm === "") {
            console.log("fetching examssssss")
            fetchExamsData();
        }
    }, [page, search === false, sortColumn, sortState]);

    useEffect(() => {
        if (search === true && searchTerm !== "") {
            console.log("searching exams")
            if(page === 0){
                setExams([]);
            }
            console.log(searchExamsUrl + fetchExamsUrl);
            fetchSearchData();
        }
    }, [page, searchTerm, search, sortColumn, sortState]);



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
        setPage(0);
        setSearch(value);
    }

    const handleSearch = (searchTerm) => {
        console.log(searchTerm + " Handlesearch " + search);
        if(searchTerm === ""){
            return;
        }
        console.log("search button clicked");
        resetExamList(true);
        setSearchTerm(searchTerm);

    };

    const handleInputChange= (searchTerm) => {
        if (searchTerm === ""){
            setExams([]);
            resetExamList(false);
            console.log(search);
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
                    <TableContainer className="table-container">
                        <Table  size="small" aria-label="a dense table" >
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Module Code
                                        <Button variant="link" className="sort-btn" data-sort="module.moduleCode"
                                                data-sort-state={sortColumn === "module.moduleCode" ? sortState : ""}
                                                onClick={()=>handleSort("module.moduleCode")}>
                                            <Sort />
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        Module Name
                                        <Button variant="link"  className="sort-btn" data-sort="module.moduleName"
                                                data-sort-state={sortColumn === "module.moduleName" ? sortState : ""}
                                                onClick={()=>handleSort("module.moduleName")}>
                                            <Sort  />
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        Module Leader
                                        <Button variant="link"  className="sort-btn" data-sort="module.moduleLeader"
                                                data-sort-state={sortColumn === "module.moduleLeader" ? sortState : ""}
                                                onClick={()=>handleSort("module.moduleLeader")}>
                                            <Sort />
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        Exam Date
                                        <Button variant="link" className="sort-btn" data-sort="examDay"
                                                data-sort-state={sortColumn === "examDay" ? sortState : ""}
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
                                    <ExamListRow
                                        key={exam.examId}
                                        examId={exam.examId}
                                        moduleCode={exam.module.moduleCode}
                                        moduleName={exam.module.moduleName}
                                        moduleLeader={exam.module.moduleLeader}
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





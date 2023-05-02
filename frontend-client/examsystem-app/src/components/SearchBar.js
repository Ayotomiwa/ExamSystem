import {useState} from "react";
import { Card, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Input } from "@mui/material";
import "../App.css";





const SearchBar = ({onSearch,onChange}) => {
    const [searchTerm, setSearchTerm] = useState("");


    function handleSearch(event) {
        console.log("searching");
        event.preventDefault();
        // setSearchTerm(event.target.value);
        onSearch(searchTerm);
    }

    function handleInputChange(event) {
        event.preventDefault();
        const newSearchTerm = event.target.value;
        setSearchTerm(newSearchTerm);
        onChange(newSearchTerm);
    }


    return (
        <Card>
            <Card.Body className="mt-0">
                <div className="d-flex justify-content-center">
                    <Form className="d-flex" onSubmit={handleSearch}>
                        <Input
                            aria-label="Search"
                            id="search_input"
                            placeholder="Search for Exams or Module Code"
                            type="search"
                            fullWidth={true}
                            value={searchTerm}
                            onChange={handleInputChange}
                        />
                        <Button variant="outline-secondary" id="search_btn" type="submit">
                            <FontAwesomeIcon icon={faSearch} />
                        </Button>
                    </Form>
                </div>
            </Card.Body>
        </Card>
    );
};

export default SearchBar;

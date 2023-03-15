import {useState} from "react";
import { Card, Form, Button } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Input } from "@material-ui/core";
import "../App.css";



const useStyles = makeStyles((theme) => ({
    searchInput: {
        marginRight: theme.spacing(1),
    },
    underline: {
        "&:before": {
            borderBottomColor: "#584595",
        },
        "&:hover:before": {
            borderBottomColor: "#584595",
            transitionDelay: "20s"
        },
        "&:after": {
            borderBottomColor: "#e75480",
        }
    }
}));

const SearchBar = ({onSearch,onChange}) => {
    const classes = useStyles();
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
                    <Form className="d-flex" onSubmit={handleSearch} >
                        <Input
                            aria-label="Search"
                            className={classes.searchInput}
                            id="search_input"
                            placeholder="Search for Exams or Module Code"
                            type="search"
                            value={searchTerm}
                            onChange={handleInputChange}
                            style={{fontSize: 20}}
                            classes={{ underline: classes.underline }}
                        />
                        <Button
                            variant="outline-secondary"
                            id="search_btn"
                            type="submit"
                        >
                            <FontAwesomeIcon icon={faSearch} />
                        </Button>
                    </Form>
                </div>
            </Card.Body>
        </Card>
    );
};

export default SearchBar;

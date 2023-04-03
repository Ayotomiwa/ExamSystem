import React, {useEffect, useState} from "react";
import {Box, Button, FormControl, Grid, MenuItem, TextField, Tooltip, Typography} from "@mui/material";
import {styled} from "@mui/system";
import Autocomplete from '@mui/material/Autocomplete';
import "./ExamForm.css";


const StyledBox = styled(Box)({
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: `0 3px 5px 2px rgba(0, 0, 0, 0.3)`,
    width: "45%",
    maxWidth: "1000px",
    margin: "auto",
});


const StyledButton = styled(Button)({
    borderRadius: "25px",
    border: "2px solid #584595",
    marginTop: "20px",
    width: "100%",
    backgroundColor: "transparent",
    color: "#584595",
    "&:hover": {
        borderColor: "#ffffff",
        backgroundColor: "#e75480",
        color: "#ffffff",
    },
});

const StyledTextField = styled(TextField)({
    "& .MuiFormLabel-root": {
        fontSize: "20px",
        marginBottom: "auto",
    },
    "& .MuiInputBase-root": {
        fontSize: "20px",
    },
    "& .MuiAutocomplete-root": {
        // marginBottom: "20px",
    },
});

const StyledTitle = styled(Typography)({
    marginBottom: "20px",
    padding: "10px",
    fontWeight: "bold",
    fontSize: "24px",
    textAlign: "center",
    color: "white",
    backgroundColor: "#584595",
});


const ExamForm = ({form, setForm}) => {


    const [modules, setModules] = useState([]);

    useEffect(() => {
        // Fetch the list of available modules from your REST API
        const fetchModules = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/modules");
                const data = await response.json();
                setModules(data);
            } catch (error) {
                console.error("Error fetching modules:", error);
            }
        };

        fetchModules().then(r => console.log("Modules fetched"));
    }, []);

    const handleChange = (event) => {
        setForm({...form, [event.target.name]: event.target.value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        window.location.href = "/timer";
    };

    const handleAutocompleteChange = (name, value) => {
        if (value) {
            setForm({
                ...form,
                [name]: value[name],
            });
        } else {
            setForm({
                ...form,
                [name]: "",
            });
        }
    };


    return (

        <div id="exam-form">
            <StyledBox>
                <StyledTitle variant="h4">Exam Form</StyledTitle>
                <FormControl>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={5} sx={{height: "100%"}}>
                            <Grid item xs={12} sm={12}>
                                <Autocomplete
                                    options={modules}
                                    getOptionLabel={(option) => option.moduleName}
                                    onChange={(event, value) => handleAutocompleteChange('moduleName', value)}
                                    fullWidth
                                    renderInput={(params) => (
                                        <StyledTextField
                                            {...params}
                                            name="moduleName"
                                            label="Module Name"
                                            margin="normal"
                                            variant="standard"
                                            required
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Autocomplete
                                    options={modules}
                                    getOptionLabel={(option) => option.moduleCode}
                                    onChange={(event, value) => handleAutocompleteChange('moduleCode', value)}
                                    fullWidth
                                    renderInput={(params) => (
                                        <StyledTextField
                                            {...params}
                                            name="moduleCode"
                                            label="Module Code"
                                            margin="normal"
                                            variant="standard"
                                            required
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <StyledTextField
                                    label="Venue"
                                    name="venue"
                                    variant="standard"
                                    value={form.venue}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <StyledTextField
                                    type="number"
                                    label="No. of Students"
                                    name="noOfStudents"
                                    variant="standard"
                                    value={form.noOfStudents}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid container item xs={12} sm={12} alignItems="center" justifyContent="space-between">
                                <Typography variant="h6" component="p" gutterBottom>
                                    Duration:
                                </Typography>
                                <Grid item xs={12} sm={10}>
                                    <Grid container justifyContent="center">
                                    <Grid item xs={12} sm={4}>
                                        <StyledTextField
                                            type="number"
                                            label="Hrs"
                                            name="durationHrs"
                                            variant="standard"
                                            value={form.durationHrs}
                                            onChange={handleChange}
                                            fullWidth
                                            required
                                            inputProps={{min: 0, onKeyPress: (e) => e.preventDefault()}}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={4}>
                                        <StyledTextField
                                            type="number"
                                            label="Mins"
                                            variant="standard"
                                            name="durationMins"
                                            value={form.durationMins}
                                            onChange={handleChange}
                                            fullWidth
                                            required
                                            inputProps={{min: 0, max: 59, onKeyPress: (e) => e.preventDefault()}}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <StyledTextField
                                    label="Exam Type"
                                    name="examType"
                                    value={form.examType}
                                    onChange={handleChange}
                                    select
                                    fullWidth
                                    required
                                >
                                    <MenuItem value="NORMAL">Normal</MenuItem>
                                    <MenuItem value="RESIT">Resit</MenuItem>
                                </StyledTextField>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <StyledTextField
                                    label="Start Time"
                                    type="time"
                                    name="startTime"
                                    value={form.startTime}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <StyledTextField
                                    type="number"
                                    label="Restricted Minutes"
                                    name="restrictedMinutes"
                                    value={form.restrictedMinutes}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <Tooltip
                                    title="Students are not allowed to leave the room during the restricted minutes (e.g., first 30 mins and last 30 mins)">
                                    <span>(?)</span>
                                </Tooltip>
                            </Grid>
                        </Grid>
                        <StyledButton type="submit">START EXAM</StyledButton>
                    </form>
                </FormControl>
            </StyledBox>
        </div>
    );
};
export default ExamForm;


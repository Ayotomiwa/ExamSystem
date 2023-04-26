import React, {useEffect, useState} from "react";
import {Box, Button, FormControl, Grid, MenuItem, TextField, Tooltip, Typography} from "@mui/material";
import {styled} from "@mui/system";
import {default as customStyle} from 'styled-components';
import Autocomplete from '@mui/material/Autocomplete';
import "./ExamFormPage.css";


const StyledBox = styled(Box)({
    backgroundColor: "#ffffff",
    position:"relative",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: `0 3px 5px 2px rgba(0, 0, 0, 0.3)`,
    minWidth: "100%",
});


const StyledButton = styled(Button)({
    borderRadius: "25px",
    border: "2px solid #584595",
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



const StyledFlexbox = customStyle.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: space-between;
`;
const StyledSmallFlexbox = customStyle.div`
    margin-top: 2rem;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    justify-content: start;
`;

const StyledFlexItem = customStyle.div`
    flex-basis: calc(50% - 0.5rem);
    margin-bottom: 1rem;
`;

const StyledFlexRow = customStyle.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    width: 100%;
`;

const StyledFlexRowItem = customStyle.div`
    flex-basis: calc(50% - 0.5rem);
`;

const StyledFullWidthFlexItem = customStyle(StyledFlexItem)`
    flex-basis: 100%;
`;

const StyledSmallFlexItem = customStyle(StyledFlexItem)`
    flex-basis: calc(33% - 0.5rem);
   
`;




const ExamForm = ({form, setForm, setShowForm, setShowRules, setIsStarted, tempForm, setTempForm}) => {


    const [modules, setModules] = useState([]);
    // const [tempForm, setTempForm] = useState({
    //     durationHrs: form.durationHrs,
    //     durationMins: form.durationMins,
    //     startTime: form.startTime,
    //     restrictedMinutes: form.restrictedMinutes,
    // });

    useEffect(() => {

        const fetchModules = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/modules");
                const data = await response.json();
                const uniqueData = Array.from(new Set(data.map(module => module.moduleName))).map(moduleName => {
                    return data.find(module => module.moduleName === moduleName);
                });
                setModules(uniqueData);
            } catch (error) {
                console.error("Error fetching modules:", error);
            }
        };

        fetchModules().then(r => console.log("Modules fetched"));
    }, []);

    const handleChange = (event) => {
        setForm({...form, [event.target.name]: event.target.value});
    };

    const handleTempChange = (event) => {
        setTempForm({ ...tempForm, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setForm({
            ...form,
            durationHrs: tempForm.durationHrs,
            durationMins: tempForm.durationMins,
            startTime: tempForm.startTime,
            restrictedMinutes: tempForm.restrictedMinutes,
        });
        setIsStarted(true);
        setShowForm(false);
    };

    const handleAutocompleteChange = (name, value) => {
        if (value) {
            setForm((prevForm) => ({
                ...prevForm,
                [name]: value[name],
            }));
        }
        else{
            setForm((prevForm) => ({
                ...prevForm,
                ["moduleName"]: form.moduleName,
                ["moduleCode"]: form.moduleCode,
            }));
        }
    };


    const getModuleByModuleName = (moduleName) => {
        return modules.find(module => module.moduleName === moduleName);
    };

    const getModuleByModuleCode = (moduleCode) => {
        return modules.find(module => module.moduleCode === moduleCode);
    };

    function handleNext() {
        setShowForm(false);
        setShowRules(true);
    }

    return (
        <StyledBox>
            <FormControl>
                <form onSubmit={handleSubmit}>
                    <StyledFlexbox>
                        <StyledFullWidthFlexItem>
                            <Autocomplete
                                options={modules}
                                getOptionLabel={(option) => option.moduleName}
                                onChange={(event, value) => handleAutocompleteChange('moduleName', value)}
                                value={getModuleByModuleName(form.moduleName) || null}
                                fullWidth
                                renderInput={(params) => (
                                    <StyledTextField
                                        {...params}
                                        name="moduleName"
                                        label="Module Name"
                                        margin="normal"
                                        variant="standard"
                                        onChange={handleChange}
                                        required
                                    />
                                )}
                            />
                        </StyledFullWidthFlexItem>
                        <StyledFullWidthFlexItem>
                            <Autocomplete
                                options={modules}
                                getOptionLabel={(option) => option.moduleCode}
                                onChange={(event, value) => handleAutocompleteChange('moduleCode', value)}
                                fullWidth
                                value={getModuleByModuleCode(form.moduleCode) || null}
                                renderInput={(params) => (
                                    <StyledTextField
                                        {...params}
                                        name="moduleCode"
                                        label="Module Code"
                                        margin="normal"
                                        value={form.moduleCode}
                                        variant="standard"
                                        required
                                    />
                                )}
                            />
                        </StyledFullWidthFlexItem>
                        <StyledFlexItem>
                            <StyledTextField
                                label="Venue"
                                name="venue"
                                variant="standard"
                                onChange={handleChange}
                                value={form.venue}
                                fullWidth
                                required
                            />
                        </StyledFlexItem>
                        <StyledFlexItem>
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
                        </StyledFlexItem>
                        <StyledFlexRow>
                            <Typography variant="h6" component="p" gutterBottom color={"black"}>
                                Duration:
                            </Typography>
                            <StyledFlexRowItem>
                                <StyledTextField
                                    type="number"
                                    label="Hrs"
                                    name="durationHrs"
                                    variant="standard"
                                    value={tempForm.durationHrs}
                                    onChange={handleTempChange}
                                    fullWidth
                                    required
                                    inputProps={{ min: 0, max:6 }}
                                />
                            </StyledFlexRowItem>
                            <StyledFlexRowItem>
                                <StyledTextField
                                    type="number"
                                    label="Mins"
                                    variant="standard"
                                    name="durationMins"
                                    value={tempForm.durationMins}
                                    onChange={handleTempChange}
                                    fullWidth
                                    required
                                    inputProps={{ min: 0, max: 59}}
                                />
                            </StyledFlexRowItem>
                        </StyledFlexRow>
                    </StyledFlexbox>
                    <StyledSmallFlexbox>
                        <StyledSmallFlexItem>
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
                        </StyledSmallFlexItem>
                        <StyledSmallFlexItem>
                            <StyledTextField
                                label="Start Time"
                                type="time"
                                name="startTime"
                                value={tempForm.startTime}
                                onChange={handleTempChange}
                                fullWidth
                                required
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                        </StyledSmallFlexItem>
                        <StyledSmallFlexItem>
                            <StyledTextField
                                type="number"
                                label="Restricted Minutes"
                                name="restrictedMinutes"
                                value={tempForm.restrictedMinutes}
                                onChange={handleTempChange}
                                fullWidth
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{ min: 0, max: 60}}
                            />
                            <Tooltip
                                title="Students are not allowed to leave the room during the restricted minutes (e.g., first 30 mins and last 30 mins)">
                                <span>(?)</span>
                            </Tooltip>
                        </StyledSmallFlexItem>
                    </StyledSmallFlexbox>
                    <StyledButton type="submit">START</StyledButton>
                </form>
            </FormControl>
        </StyledBox>
    );
};
export default ExamForm;


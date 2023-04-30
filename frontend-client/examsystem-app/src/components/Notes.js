import {
    Box,
    Button,
    IconButton,
    Paper,
    TableBody,
    TableCell,
    TableRow,
    TextareaAutosize,
    Typography
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import React, {useState} from "react";
import {Table} from "react-bootstrap";

const Notes = ({form, setForm}) => {

    const [tempNotes, setTempNotes] = useState("");

    function addNotes() {
        if(tempNotes === "") {
            return;
        }
        const timestamp = new Date().toLocaleTimeString();
        setForm({...form, notes: [...form.notes, {text: tempNotes, timestamp}] });
        setTempNotes("");
        console.log(form.notes + "Heyyyy " + tempNotes);
    }


    function handleChange(event) {
        setTempNotes(event.target.value );
        console.log(tempNotes);
    }

    function deleteNote(index) {
        const updatedNotes = form.notes.filter((note, i) => i !== index);
        setForm({...form, notes: updatedNotes});
    }


    return (
        <Box sx={{
            minWidth: "200px",
            display: 'flex',
            flexDirection: 'column',
            gap: '2',
        }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignContent: 'center',
                    gap:"3"
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '10px',
                    width: '100%',
                    p: 2,
                }}>
                    <TextareaAutosize
                        placeholder="Log your notes here..."
                        onChange={e => handleChange(e)}
                        value={tempNotes}
                        minRows={4}
                        sx={{
                            width: "100px",
                            resize: 'none',
                        }}
                    />
                    <Button
                        variant="outlined"
                        style={{marginTop: '10px', color:"#e75480", borderColor:"#e75480"}}
                        onClick={() => addNotes()}
                    >
                        Add
                    </Button>
                </Paper>
            </Box>
            <Paper
                elevation={3}
                sx={{
                    borderRadius: '10px',
                    marginTop: '10px',
                    height: '400px',
                    overflowY: 'auto',
                    width: '100%',
                }}
            >
                <Table>
                <TableBody>
                    {form.notes && form.notes.map((note, index) => (
                        <TableRow key={index} sx={{
                            whiteSpace: "pre-wrap",
                            width:"200px",
                            gap:"2",
                            overflowX:'none'}}>
                            <TableCell variant="h6" sx={{wordWrap:"break-word", width:"100%"}}>
                                {note.timestamp} - {note.text}
                            </TableCell>
                            <TableCell>
                                <IconButton onClick={() => deleteNote(index)} aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                    </Table>
            </Paper>
        </Box>
);

};
export default Notes;

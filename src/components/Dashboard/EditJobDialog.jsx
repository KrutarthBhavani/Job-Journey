import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editJob, deleteJob } from "../../actions";
import { categories, job_type } from "../../constants";
import {
    Box,
    Container,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Select,
    Button,
    Typography,
    MenuItem,
} from "@mui/material";


const EditJobDialog = ({jobData, onCloseCallback}) => {
    const dispatch = useDispatch();
    const id = jobData.id
    const [company, setCompany] = useState(jobData.company? jobData.company : "");
    const [position, setPosition] = useState(jobData.category? jobData.position : "");
    const [salary, setSalary] = useState(jobData.salary? jobData.salary : "");
    const [category, setCategory] = useState(jobData.category? jobData.category : categories[0]);
    const [jobType, setJobType] = useState(jobData.jobType? jobData.jobType : job_type[0])
    const [location, setLocation] = useState(jobData.location? jobData.location : "")
    const [url, setURL] = useState(jobData.url? jobData.url : "")
    const [desc, setDesc] = useState(jobData.desc? jobData.desc: "")
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
        console.log(jobData)
        onCloseCallback()
    };

    const handleSave = () => {
        jobData.company = company
        jobData.position = position
        jobData.salary = salary
        jobData.category = category
        jobData.jobType = jobType
        jobData.location = location
        jobData.url = url
        jobData.desc = desc

        dispatch(
            editJob(jobData)
        );
        handleClose();
    };

    const handleDelete = () => {
        dispatch(
            deleteJob(id)
        )
        handleClose()
    }

    return (
        <Dialog maxWidth="md" fullWidth={true} open={open} onClose={handleClose}>
            <DialogTitle>Create a New Job</DialogTitle>
            <DialogContent>
                <Container fixed disableGutters sx={{display:'flex', flexDirection: 'column'}}>
                    <Box sx={{width: '100%', display:'flex', justifyContent: 'space-around'}}>
                        <Box>
                            <Typography fontWeight='bold' variant="subtitle1">Company Name*</Typography>
                            <TextField
                                InputLabelProps={{shrink: false}}
                                size="sm"
                                placeholder="Company Name"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}/>
                        </Box>
                        
                        <Box>
                            <Typography fontWeight='bold' variant="subtitle1">Position*</Typography>
                            <TextField
                                InputLabelProps={{shrink: false}}
                                size="sm"
                                placeholder="Position"
                                value={position}
                                onChange={(e) => setPosition(e.target.value)}/>
                        </Box>
                        
                        <Box>
                            <Typography fontWeight='bold' variant="subtitle1">Category*</Typography>
                            <Select
                                sx={{minWidth: '195px'}}
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}> 
                                    {categories.map((category) => {
                                        return <MenuItem value={category}>{category}</MenuItem>
                                    })}
                            </Select>
                        </Box>
                    </Box>

                    <Box sx={{width: '100%', display:'flex', justifyContent: 'space-around'}}>
                        <Box>
                            <Typography fontWeight='bold' variant="subtitle1">Salary</Typography>
                            <TextField
                                InputLabelProps={{shrink: false}}
                                size="sm"
                                placeholder="Salary"
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}/>
                        </Box>
                        
                        <Box>
                            <Typography fontWeight='bold' variant="subtitle1">Job Type</Typography>
                            <Select
                                sx={{minWidth: '195px'}}
                                value={jobType}
                                onChange={(e) => {setJobType(e.target.value)}}>
                                    {job_type.map((type) => {
                                        return <MenuItem value={type}>{type}</MenuItem>
                                    })}
                            </Select>
                        </Box>
                        
                        <Box>
                            <Typography fontWeight='bold' variant="subtitle1">Location</Typography>
                            <TextField
                                InputLabelProps={{shrink: false}}
                                size="sm"
                                placeholder="Location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}/>
                        </Box>
                    </Box>

                    <Box sx={{width: '100%', display:'flex', justifyContent: 'space-around'}}>
                        <Box sx={{width: '100%', paddingX: '48px'}}>
                            <Typography fontWeight='bold' variant="subtitle1">URL</Typography>
                            <TextField
                                fullWidth
                                size="lg"
                                InputLabelProps={{shrink: false}}
                                placeholder="URL"
                                value={url}
                                onChange={(e) => setURL(e.target.value)}/>
                        </Box>
                    </Box>

                    <Box sx={{width: '100%', display:'flex', justifyContent: 'space-around'}}>
                        <Box sx={{width: '100%', paddingX: '48px'}}>
                            <Typography fontWeight='bold' variant="subtitle1">Description</Typography>
                            <TextField
                                fullWidth
                                multiline
                                InputLabelProps={{shrink: false}}
                                rows={5}
                                placeholder="Description"
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}/>
                        </Box>
                    </Box>
                </Container>

            </DialogContent>
            <DialogActions sx={{display:'flex', justifyContent: 'flex-end'}}>
                <Button onClick={handleDelete} variant='contained' color='error'>Delete</Button>
                <Button onClick={handleSave} variant="contained" color="primary">
                    Save & Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditJobDialog;
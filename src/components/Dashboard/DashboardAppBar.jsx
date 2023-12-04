import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import AddJobDialog from "./AddJobDialog";

export function DashboardAppBar() {
    const [openDialog, setOpenDialog] = useState(false);

    const handleAddJobClick = () => {
        setOpenDialog(true);
    };

    const onDialogClosed = () =>{
        setOpenDialog(false)
    }

    return (
        <Box display="flex" justifyContent="space-between" sx={{marginBottom: "10px"}}>
            <Button variant="contained" color="primary" size="small" onClick={handleAddJobClick}>
                Add Job
            </Button>
            
            <Box display="flex" alignItems="center">
                <TextField variant="outlined" size="small" placeholder="Filter Company"
                    inputProps={{
                        style:{
                            padding: "5px",
                        }
                    }}
                    sx={{marginRight: "10px"}}/>

                <Button variant="outlined" size="small">Sort By Created Date</Button>
            </Box>

            {openDialog && <AddJobDialog onCloseCallback={onDialogClosed} />}
        </Box>
    );
}
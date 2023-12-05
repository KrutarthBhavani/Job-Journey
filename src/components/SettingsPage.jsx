import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Typography,
  Button,
  TextField,
  Divider
} from '@mui/material'
import { setBoardName } from '../actions';

export const SettingsPage = () => {

  let boardName = useSelector((state) => state.board_name)
  let dispatch = useDispatch()
  const [newBoardName, setNewBoardName] = useState(boardName)

  function onSubmitBoardName() {
    //TODO validate string
    dispatch(setBoardName(newBoardName))
  }

  return (
    <Box>
      <Typography variant="h4" color="inherit" my={"10px"}>Settings</Typography>
      
      <Divider/>
      
      <Box>
        <Typography variant="h6" color="inherit" my={"10px"}>Rename Your Board</Typography>

        <Box display={'flex'} flexDirection={'row'}>
          <TextField
            id="board_name"
            size='small'
            sx={{marginRight: '10px'}}
            placeholder="Board Name"
            value={newBoardName}
            onChange={(e) => {setNewBoardName(e.target.value)}}
          />
          
          <Button variant='contained' onClick={onSubmitBoardName}>Submit</Button>
        </Box>
        
      </Box>
    </Box>
  );
};

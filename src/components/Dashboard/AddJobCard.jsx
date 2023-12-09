import {React, useState} from 'react';
import { Card, CardActionArea, CardContent, Icon, Typography,  } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddJobDialog from './AddJobDialog';


const AddJobCard = ({category}) => {

  const [openDialog, setOpenDialog] = useState(false);

  const handleAddJobClick = () => {
      setOpenDialog(true);
  };

  const onDialogClosed = () =>{
      setOpenDialog(false)
  }

  return (
    <Card
      key={"add_job_" + category}
      sx={{marginBottom: '10px', marginX: '5px', opacity: 0.6}}
    >
      <CardActionArea onClick={handleAddJobClick}>
        <CardContent sx={{display: 'flex', flexDirection:'row', justifyContent: 'center'}}>
          <AddCircleOutlineIcon/>
          <Typography variant='subtitle2' fontWeight='bold' align='center' mx={'5px'}>Add Job</Typography>
        </CardContent>
      </CardActionArea>
      {openDialog && <AddJobDialog onCloseCallback={onDialogClosed} forCategory={category} />}
    </Card>
  );
};

export default AddJobCard;

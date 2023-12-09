import {React, useMemo, useState} from 'react';
import { Card, CardActionArea, CardContent, Typography,  } from '@mui/material';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import EditJobDialog from './EditJobDialog';

const JobCard = ({jobData}) => {

  //Change this later if location is to be shown
  const {id, company, position, category} = useMemo(() => {
      return {id: jobData.id, company: jobData.company, position: jobData.position, category: jobData.category}
  }, [jobData])

  const [openDialog, setOpenDialog] = useState(false);

  const handleEditJobClick = () => {
      setOpenDialog(true);
  };

  const onDialogClosed = () =>{
      setOpenDialog(false)
  }

  const { attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({
    id: id,
    data: {
      id: id,
      position: position,
      company: company,
      category: category,
      type: "job"
    }
  });

  let style = {
    transform: CSS.Translate.toString(transform),
    transition
  };

  if(isDragging){
    style = {
      ...style,
      opacity: 0.2,
    }
  }

  return (
    <Card
      key={id}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      sx={{marginBottom: '10px', marginX: '5px'}}
    >
      <CardActionArea onClick={handleEditJobClick} >
        <CardContent sx={{display: 'flex', flexDirection:'column'}}>
          <Typography variant='subtitle2' fontWeight='bold' sx={{width: '100%', boxSizing: 'border-box'}}>{company}</Typography>
          <Typography variant='subtitle1' sx={{width: '100%', boxSizing: 'border-box'}}>{position}</Typography>
        </CardContent>
      </CardActionArea>
      {openDialog && <EditJobDialog jobData={jobData} onCloseCallback={onDialogClosed}/>}
    </Card>
  );
};

export default JobCard;

import React from 'react';
import { Card, CardActionArea, CardContent, Typography,  } from '@mui/material';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const JobCard = ({id, position, company, category}) => {

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
      {/* <CardActionArea> */}
        <CardContent sx={{display: 'flex', flexDirection:'column'}}>
          <Typography variant='subtitle2' fontWeight='bold' sx={{width: '100%', boxSizing: 'border-box'}}>{company}</Typography>
          <Typography variant='subtitle1' sx={{width: '100%', boxSizing: 'border-box'}}>{position}</Typography>
        </CardContent>
      {/* </CardActionArea> */}
    </Card>
  );
};

export default JobCard;

import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardActionArea, CardContent, Typography,  } from '@mui/material';

const JobCard = ({id, position, company}) => {

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <CardActionArea>
        <CardContent sx={{display: 'flex', flexDirection:'column'}}>
          <Typography variant='subtitle1' fontWeight='bold' sx={{width: '100%', boxSizing: 'border-box'}}>{company}</Typography>
          <Typography variant='h6' sx={{width: '100%', boxSizing: 'border-box'}}>{position}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default JobCard;

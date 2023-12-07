import { useMemo } from 'react';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box, Card, Divider, Icon, Typography} from '@mui/material';
import JobCard from './JobCard';

const CategoryContainer = ({ category, allJobs }) => {

  const jobs = useMemo(() => {
    return allJobs.filter(job => {
      if(job.category == category) 
        return job
    })
  })

  const jobIds = useMemo(() => {
    return jobs.map(job => job.id)
  }, [jobs])

  const { attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({
    id: category,
    data: {
      type: "category"
    }
  });

  let style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  if(isDragging){
    style = {
      ...style,
      opacity: 0.2,
    }
  }

  return (
    <Box ref={setNodeRef} style={style} sx={{display: 'flex', width: '300px', color: 'black'}}>
      <Card {...attributes} {...listeners} variant='outlined' sx={{width: '300px', marginX: '10px', marginY: '10px', borderRadius: '10px', overflow:'scroll'}}>
        <Box
          boxShadow={3}
          margin={1}
          border={2}
          borderRadius={3}
          borderColor={"primary.main"}>
          <Typography variant="h5" color="initial" mx={'10px'} my={'10px'}>{category}</Typography>
        </Box>


        <Box sx={{display: 'flex', flexDirection: 'column'}}>
          <SortableContext
          items={jobIds}>
            {jobs.map(job => (
              <JobCard id={job.id} position={job.position} company={job.company} category={job.category}/>
              ))}
          </SortableContext>
        </Box>
      </Card>
    </Box>
  )
};

export default CategoryContainer;

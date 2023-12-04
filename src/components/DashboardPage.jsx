import { Box, Container, Divider } from '@mui/material';
import React from 'react';
import { DashboardAppBar } from './Dashboard/DashboardAppbar';
import JobCard from './Dashboard/JobCard';

export const DashboardPage = () => {
  return (
      <Box width='100%' height='100%'>
        <DashboardAppBar/>
        <Divider />
        <Container fixed disableGutters sx={{marginTop: "10px"}}>
          
        </Container>
      </Box>
  );
};
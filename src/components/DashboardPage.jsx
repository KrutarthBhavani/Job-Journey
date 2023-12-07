import { Box, Container, Divider } from '@mui/material';
import React from 'react';
import { DashboardAppBar } from './Dashboard/DashboardAppbar';
import { KanbanDashboard } from './Dashboard/KanbanDashboard';

export const DashboardPage = () => {
  return (
    <Box>
      <DashboardAppBar/>
      <Divider />
      <Container maxWidth="xl" disableGutters sx={{overflow: 'scroll'}}>
          <KanbanDashboard/>
      </Container>
    </Box>
  );
};
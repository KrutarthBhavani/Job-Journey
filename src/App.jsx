// React, Redux and Router hooks
import { useState } from 'react'
import {Routes, Route, NavLink, Link} from 'react-router-dom'
import { useSelector } from 'react-redux';

//Mui Components
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Container } from '@mui/material';

//Mui Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ContactsIcon from '@mui/icons-material/Contacts';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import TuneIcon from '@mui/icons-material/Tune';

//Importing all Pages
import {DashboardPage}  from './components/DashboardPage';
import {StatisticsPage} from './components/StatisticsPage';
import {ContactsPage} from './components/ContactsPage';
import {DocumentsPage} from './components/DocumentsPage'
import {SettingsPage} from './components/SettingsPage'


const drawerWidth = 200
const dashboard = 'Dashboard'
const statistics = 'Statistics'
const contacts = 'Contacts'
const documents = 'Documents'
const settings = 'Settings'

function App() {

  let boardName = useSelector((state) => state.board_name)

  return(
    <Box sx={{display: 'flex'}}>
      <CssBaseline/>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>

        <Toolbar variant="dense" sx={{display:'flex', flexDirection: 'row'}}>
          
          <Typography sx={{ width: 200}} variant="h6" color="inherit">
            Job Journey
          </Typography>

          <Typography sx={{flexGrow: 5}} variant="h5" color="inherit">
            {boardName}
          </Typography>

          <Typography variant='h7' >
            Jay Talekar
          </Typography>
          
        </Toolbar>
      </AppBar>
      
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem key={dashboard} disablePadding>
              <ListItemButton component={NavLink} to={"/"}>
                <ListItemIcon>
                    <DashboardIcon/>
                </ListItemIcon>
                <ListItemText primary={dashboard}/>
              </ListItemButton>
            </ListItem>

            <ListItem key={statistics} disablePadding>
              <ListItemButton component={NavLink} to={"/statistics"}>
                <ListItemIcon>
                    <AnalyticsIcon/>
                </ListItemIcon>
                <ListItemText primary={statistics}/>
              </ListItemButton>
            </ListItem>
            
            <ListItem key={contacts} disablePadding>
              <ListItemButton component={NavLink} to={"/contacts"}>
                <ListItemIcon>
                    <ContactsIcon/>
                </ListItemIcon>
                <ListItemText primary={contacts}/>
              </ListItemButton>
            </ListItem>

            <ListItem key={documents} disablePadding>
              <ListItemButton component={NavLink} to={"/documents"}>
                <ListItemIcon>
                    <InsertDriveFileIcon/>
                </ListItemIcon>
                <ListItemText primary={documents}/>
              </ListItemButton>
            </ListItem>

            <ListItem key={settings} disablePadding>
              <ListItemButton component={NavLink} to={"/settings"}>
                <ListItemIcon>
                    <TuneIcon/>
                </ListItemIcon>
                <ListItemText primary={settings}/>
              </ListItemButton>
            </ListItem>

          </List>
        </Box>
      </Drawer>

      <Container maxWidth="xl" disableGutters sx={{marginTop: "60px", marginX: '10px'}}>
        <Routes>
          <Route path={"/"} element={<DashboardPage/>} />
          <Route path={"/statistics"} element={<StatisticsPage/>} />
          <Route path={"/contacts"} element={<ContactsPage/>} />
          <Route path={"/documents"} element={<DocumentsPage/>} />
          <Route path={"/settings"} element={<SettingsPage/>} />
        </Routes>
      </Container>

    </Box>
  )
}

export default App

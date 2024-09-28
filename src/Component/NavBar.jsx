import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import FlightIcon from '@mui/icons-material/Flight';
import LightModeIcon from '@mui/icons-material/LightMode';
import AppsIcon from '@mui/icons-material/Apps';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="Nav" style={{ paddingRight: '10px' }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" noWrap
            href="#app-bar-with-responsive-menu"
            sx={{ display: { xs: 'none', sm: 'block' } }}>
            Google
          </Typography>
          <Box sx={{ flexGrow: 15, display: { xs: 'none', md: 'flex' }, marginLeft: '8px' }}>
            <Button variant="outlined" sx={{
              color: 'white',
              borderColor: 'white',
              '&:hover': {
                borderColor: 'lightgray',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
              height: '2rem'
            }} startIcon={<FlightIcon />}>Flights</Button>
          </Box >

          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: { xs: 'center', md: 'flex-start' },
              height: '1.5rem',
              gap: 1
            }}
          >
            <Button
              startIcon={<LightModeIcon className='icons' />}
              sx={{ display: { xs: 'block', sm: 'block' } }}
            />
            <Button
              startIcon={<AppsIcon className='icons' />}
              sx={{ display: { xs: 'block', sm: 'block' } }}
            />
            <Button
              startIcon={<AccountCircleIcon className='icons' />}
              sx={{ display: { xs: 'block', sm: 'block' } }}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login';
import { Link as RouterLink } from 'react-router-dom';

const HomeWelcome = () => {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      flexDirection: 'column',
    }}>
      <Box>
        <Typography variant='h4'>Task Manager</Typography>
      </Box>
      <Box>
        <Button component={RouterLink} to="/login" variant="contained" sx={{ m: 2 }} startIcon={<LoginIcon />}>Login</Button>
        <Button component={RouterLink} to="/signup" variant="contained" sx={{ m: 2 }} startIcon={<LoginIcon />}>Signup</Button>
      </Box>
    </Box>
  )
}

export default HomeWelcome
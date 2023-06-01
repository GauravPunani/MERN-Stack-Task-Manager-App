import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Alert, Paper } from "@mui/material";
import { useState } from "react";
import { Link as RouterLink } from 'react-router-dom';
import authApi from "../../axios-interceptor";
import constants from "../../constants/endpoints";


export default function Signup() {

  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (email === '' || password === '') setError('Email or password cannot be empty')

    const data = { email, password }

    try {
      const response = await authApi.post(constants.signup_endpoint, data)
      console.log(response)
      setError(null)
    } catch (error) {
      console.log(error)
      if (error.response && error.response.status >= 400) setError(error?.response?.data?.response?.message || 'Something went wrong, please try again')
    }
  }

  return (

    <Container component="main" maxWidth="xs">

      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper sx={{
          padding: "20px"
        }}>
          <Typography align="center" component="h1" variant="h5">
            Sign Up
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {
              error && (
                <Alert severity="error">{error}</Alert>
              )
            }

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleUsernameChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handlePasswordChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link component={RouterLink} to="/login" variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>

    </Container>

  );
}
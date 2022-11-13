import { React, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Paper,
  Grid,
  Avatar,
  Typography,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
  FormControl,
} from '@mui/material';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { blue } from '@mui/material/colors';

import { UserContext, DispatchUserContext } from '../context/UserContext';

const Login = () => {
  const context = useContext(UserContext);
  const dispatchContext = useContext(DispatchUserContext);
  console.log('🚀 ~ file: Login.js ~ line 10 ~ UserContext', context);

  const history = useHistory();
  if (context != null) {
    history.push('/');
  }

  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    showPassword: false,
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClickShowPassword = () => {
    setInputs({
      ...inputs,
      showPassword: !inputs.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    const response = await fetch(
      'https://tiffin-box-service.herokuapp.com/OTS/user/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(inputs),
      }
    );

    const data = await response.json();
    // console.log(data.data);

    if (data.status === 'success') {
      localStorage.setItem('jwt', data.token);
      dispatchContext(data.data);

      history.push('/profile');
      alert('Login successful');
    } else {
      console.log(data);
      console.log('failed');
    }
  };

  const paperStyle = {
    padding: 20,
    margin: '16vh auto',
    width: 350,
  };

  const smallDev = {
    padding: 20,
    margin: '16vh auto',
    width: 350,
  };

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <Grid align="center">
        <Paper elevation={5} style={!isMatch ? paperStyle : smallDev}>
          <Grid align="center">
            <Avatar>
              <AccountCircleRoundedIcon
                sx={{ fontSize: 40, backgroundColor: blue[500] }}
              />
            </Avatar>
            <Typography variant="h6" style={{ marginTop: '5px' }}>
              Log In
            </Typography>
          </Grid>
          <form onSubmit={handleSubmit}>
            <TextField
              name="email"
              varient="outlined"
              label="Email"
              value={inputs.email}
              style={{ marginTop: '25px' }}
              onChange={handleChange}
              fullWidth
              required
            />

            <FormControl
              sx={{ width: '100%', marginTop: 2 }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                name="password"
                type={inputs.showPassword ? 'text' : 'password'}
                value={inputs.password}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {inputs.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                fullWidth
                required
              />
            </FormControl>

            <Grid
              container
              spacing={2}
              style={{ marginTop: '16px' }}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Button
                component={Link}
                to="/signup"
                style={{ width: '50%', textTransform: 'capitalize' }}
              >
                Create an account
              </Button>
              <Button
                type="submit"
                variant="contained"
                style={{ width: '40%' }}
              >
                Submit
              </Button>
            </Grid>
            <Button
              component={Link}
              to="/forgotPassword"
              style={{
                width: '50%',
                textTransform: 'capitalize',
                fontSize: 13,
                marginTop: 8,
              }}
            >
              Forgot Password ?
            </Button>
          </form>
        </Paper>
      </Grid>
    </>
  );
};

export default Login;

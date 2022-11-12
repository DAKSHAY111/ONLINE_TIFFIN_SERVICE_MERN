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
  Checkbox,
  FormControlLabel,
} from '@mui/material';

import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { blue } from '@mui/material/colors';
import { DispatchUserContext } from '../context/UserContext';

const Signup = () => {
  const history = useHistory();

  const dispatchContext = useContext(DispatchUserContext);

  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);

    const response = await fetch(
      'https://tiffin-box-service.herokuapp.com/OTS/user/signup',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs),
      }
    );

    const data = await response.json();
    console.log(data);

    if (data.status === 'success') {
      dispatchContext(data.data);
      localStorage.setItem('jwt', data.token);
      alert('Registered successfull');
      history.push('/login');
    } else {
      console.log('failed');
    }
  };

  const paperStyle = {
    padding: 20,
    margin: '16vh auto',
    height: 'auto',
    width: 300,
  };

  const smallDev = {
    padding: 20,
    margin: '16vh auto',
    width: 300,
    height: 'auto',
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
              Sign Up
            </Typography>
          </Grid>
          <form onSubmit={handleSubmit}>
            <TextField
              name="name"
              varient="outlined"
              label="Name"
              value={inputs.name}
              style={{ marginTop: '25px' }}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              name="email"
              varient="outlined"
              label="Email"
              value={inputs.email}
              style={{ marginTop: '20px' }}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              name="password"
              style={{ marginTop: '20px' }}
              varient="outlined"
              type={inputs.showPassword ? 'text' : 'password'}
              label="Password"
              value={inputs.password}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              name="passwordConfirm"
              style={{ marginTop: '20px' }}
              varient="outlined"
              type={inputs.showPassword ? 'text' : 'password'}
              label="Confirm Password"
              value={inputs.passwordConfirm}
              helperText="Password must contain minimum of 8 characters"
              onChange={handleChange}
              fullWidth
              required
            />

            <FormControl sx={{ ml: 0.5, mt: 1 }} fullWidth>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleClickShowPassword}
                    defaultunChecked
                  />
                }
                label="Show Password"
              />
            </FormControl>
            <Grid
              container
              style={{ marginTop: '20px' }}
              justifyContent="center"
              alignItems="center"
            >
              <Button
                // fullWidth
                type="submit"
                variant="contained"
              >
                Submit
              </Button>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </>
  );
};

export default Signup;

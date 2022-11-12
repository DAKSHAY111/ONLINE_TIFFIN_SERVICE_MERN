import { AppBar, Toolbar, Tabs, Tab, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import React from 'react';
import MUIDrawer from './MUIDrawer';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { red } from '@mui/material/colors';


// import  from '../App';
import { UserContext } from '../context/UserContext';


const Navbar = () => {
    const context = useContext(UserContext);
    console.log("🚀 ~ file: Navbar.jsx ~ line 18 ~ Navbar ~ state", context)
    let role = "user";
    if (context) {
        role = context.role;
    }

    const ButtonToggle = () => {

        if (context) {
            // role = context.role;
            return (<Button sx={{ marginLeft: 'auto', background: red[400] }} variant='contained' component={Link} to='/logout'>Logout <LoginIcon sx={{ ml: 1 }} /></Button>)
        } else {
            // role = "user";
            return (<Button sx={{ marginLeft: 'auto' }} variant='contained' component={Link} to='/logIn'>Login <LogoutIcon sx={{ ml: 1 }} /></Button>)
        }
    }

    const [value, setValue] = useState();
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <React.Fragment>
            <AppBar sx={{ background: "#063970" }}>
                <Toolbar>
                    {!isMatch ?
                        <DeliveryDiningIcon fontSize="large" /> : <DeliveryDiningIcon sx={{ display: 'none' }} />
                    }
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            ml: 2,
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.2rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Tiffin Box
                    </Typography>
                    {
                        isMatch ? (<><MUIDrawer /></>) :
                            (<Tabs textColor='white' sx={{ mx: 'auto' }} value={value} onChange={(e, value) => setValue(value)}>
                                <Tab label="Home" component={Link} to="/" />
                                <Tab label="Profile" component={Link} to="/profile" />
                                <Tab label="My Orders" component={Link} to="/orders" />
                                <Tab label="Food Menu" component={Link} to="/viewMenu" />
                                {role === "admin" && <Tab label="Admin Pannel" component={Link} to="/adminPannel" />}
                            </Tabs>)
                    }

                    <ButtonToggle />
                </Toolbar>
            </AppBar>
        </React.Fragment >
    )
}

export default Navbar
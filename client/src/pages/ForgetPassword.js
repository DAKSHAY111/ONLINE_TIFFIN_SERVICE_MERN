import { React, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  Paper,
  Grid,
  Avatar,
  Typography,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
// import { Link } from "react-router-dom";
import AccountCircleOutlined from "@mui/icons-material/AccountCircleOutlined";
import { blue } from "@mui/material/colors";

import { UserContext, DispatchUserContext } from "../context/UserContext";

import Popup from "../components/Popup";

const ForgetPassword = () => {
  let pop = false;

  const context = useContext(UserContext);
  const dispatchContext = useContext(DispatchUserContext);
  console.log("🚀 ~ file: Login.js ~ line 10 ~ UserContext", context);

  const history = useHistory();
  if (context != null) {
    history.push("/");
  }

  const [inputs, setInputs] = useState({
    email: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);

    const response = await fetch(
      "https://tiffin-box-service.herokuapp.com/OTS/user/forgotPassword",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      }
    );

    const data = await response.json();
    // console.log(data.data);

    if (data.status === "succes") {
      pop = true;
      localStorage.setItem("jwt", data.token);
      dispatchContext(data.data);
      alert("Check Your Gmail and go through that link");

      //   history.push("/profile");
    } else {
      console.log("Failed");
    }
  };

  const paperStyle = {
    padding: 20,
    margin: "16vh auto",
    height: "50vh",
    width: 300,
  };

  const smallDev = {
    padding: 20,
    margin: "16vh auto",
    width: 300,
    height: "40vh",
  };

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <Grid align="center">
        <Paper elevation={5} style={!isMatch ? paperStyle : smallDev}>
          <Grid align="center">
            <Avatar>
              <AccountCircleOutlined
                sx={{ fontSize: 40, backgroundColor: blue[500] }}
              />
            </Avatar>
            <Typography variant="h6" style={{ marginTop: "5px" }}>
              Forget Password
            </Typography>
          </Grid>
          <form onSubmit={handleSubmit}>
            <TextField
              name="email"
              varient="outlined"
              label="Email"
              value={inputs.email}
              style={{ marginTop: "25px" }}
              onChange={handleChange}
              fullWidth
              required
            />

            <Button
              type="submit"
              variant="contained"
              style={{ width: "40%", marginTop: "15px" }}
            >
              Submit
            </Button>
          </form>
        </Paper>
      </Grid>
      {pop && <Popup />}
    </>
  );
};

export default ForgetPassword;

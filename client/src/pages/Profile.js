import { React, useContext, useState, useEffect } from "react";

import { UserContext } from "../context/UserContext";
import AlertDialog from "../components/Popup";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import TextField from "@mui/material/TextField";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { CardContent } from "@material-ui/core";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import { blue } from "@mui/material/colors";
import { DispatchUserContext } from "../context/UserContext";

import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

const Profile = () => {
  const context = useContext(UserContext);
  const [isLogin, setisLogin] = useState(true);
  const [isLoading, setisLoading] = useState(true);
  const [isDisable, setisDisable] = useState(true);
  const dispatchContext = useContext(DispatchUserContext);

  const [user, setUser] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
  });
  const handleChange = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    console.log(user);
  };

  const updateUser = async () => {
    console.log(user);
    setisLoading(true);
    const token = "Bearer " + localStorage.getItem("jwt");
    const response = await fetch("https://tiffin-box-service.herokuapp.com/OTS/user/updateMe", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        name: user.name,
        contact: user.contact,
        email: user.email,
        address: user.address,
      }),
    });
    const data = await response.json();
    console.log(data);

    if (data.status === "success") {
      dispatchContext(data.data);
      // localStorage.setItem("jwt", data.token);
      alert("Updated successfully");
      setisLoading(false);
    } else {
      setisLoading(false);

      console.log("failed");
    }
  };
  useEffect(() => {
    if (context == null) {
      setisLogin(false);
    } else {
      console.log(context);
      setisLoading(false);

      setUser(context);
      console.log("user" + user);
      setisLogin(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading ? (
        <Grid container align="center" sx={{ marginTop: "20vh" }}>
          <Grid item xs={12}>
            <CircularProgress />
          </Grid>
        </Grid>
      ) : (
        <>
          {isLogin ? (
            <>
              <Grid container align="center" sx={{ margin: "15vh 0vh" }}>
                <Grid item xs={12}>
                  <Card
                    style={{
                      border: "none",
                      boxShadow: "none",
                      maxWidth: "50vh",
                    }}
                  >
                    <Avatar>
                      <AccountCircleRoundedIcon
                        sx={{ fontSize: 40, backgroundColor: blue[500] }}
                      />
                    </Avatar>
                    <CardHeader
                      title="User Profile"
                      action={
                        <IconButton
                          aria-label="settings"
                          onClick={() => setisDisable(!isDisable)}
                        >
                          {isDisable ? (
                            <EditRoundedIcon />
                          ) : (
                            <DoneRoundedIcon onClick={updateUser} />
                          )}
                        </IconButton>
                      }
                    />

                    <CardContent>
                      <TextField
                        name="name"
                        disabled={isDisable}
                        id="standard-disabled"
                        onChange={handleChange}
                        label="Name"
                        defaultValue={user.name}
                        variant="standard"
                      />
                    </CardContent>
                    <CardContent>
                      <TextField
                        name="email"
                        disabled={isDisable}
                        id="standard-disabled"
                        onChange={handleChange}
                        label="Email"
                        defaultValue={user.email}
                        variant="standard"
                      />
                    </CardContent>
                    <CardContent>
                      <TextField
                        name="address"
                        multiline
                        disabled={isDisable}
                        id="standard-textarea-disabled"
                        placeholder="Placeholder"
                        onChange={handleChange}
                        label="Address"
                        defaultValue={user.address}
                        variant="standard"
                      />
                    </CardContent>
                    <CardContent>
                      <TextField
                        name="contact"
                        disabled={isDisable}
                        id="standard-disabled"
                        onChange={handleChange}
                        label="Contact Number"
                        defaultValue={user.contact}
                        Value={user.contact}
                        variant="standard"
                      />
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </>
          ) : (
            <AlertDialog open={!isLogin} />
          )}
        </>
      )}
    </>
  );
};

export default Profile;

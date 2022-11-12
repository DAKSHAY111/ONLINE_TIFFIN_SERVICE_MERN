import { React, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import Typography from "@mui/material/Typography";

const Menu = () => {
  const lunchUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYLpNWFsLHPPRTMo2VT2tDNRb7dR7luhs1Wju_b4MwZpFLd2ZJA6-36Du57LOOL9IU_Rw&usqp=CAU";
  const dinnerUrl =
    "https://img.freepik.com/premium-photo/indian-hindu-veg-thali-also-known-as-food-platter-is-complete-lunch-dinner-meal-closeup-selective-focus_466689-9146.jpg?w=2000";
  const [isLoading, setisLoading] = useState(true);
  const history = useHistory();
  const [menus, setMenus] = useState([
    {
      foodItems: [],
      mealType: "",
      stock: 0,
      totalPrice: 0,
    },
  ]);

  useEffect(() => {
    const getMenu = async () => {
      try {
        const res = await fetch("https://tiffin-box-service.herokuapp.com/OTS/menu/viewMenu", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          // credentials: "include",
        });

        const todayMenu = await res.json();

        if (todayMenu.status !== "success") {
          alert("Something is wrong plzz try again later");
          history.push("/login");
        } else {
          setMenus(todayMenu.data.menu);
          setisLoading(false);
          // console.log("🚀 ~ file: Menu.js ~ line 27 ~ getMenu ~ menu", menus);
        }
      } catch (err) {
        history.push("/login");
        console.log(err);
      }
    };
    getMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(menus);
  return (
    <>
      {isLoading ? (
        <Grid container align="center" sx={{ marginTop: "20vh" }}>
          <Grid item xs={12}>
            <CircularProgress />
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={3} align="center" sx={{ margin: "20vh auto" }}>
          {menus.map((menu, ind) => (
            <Grid item xs={12} md={12 / menus.length}>
              <Card sx={{ maxWidth: 335 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={
                    menu.mealType === "dinner"
                      ? dinnerUrl
                      : "https://c.ndtvimg.com/2020-09/2sff5d6o_gujarati_625x300_10_September_20.jpg?im=FaceCrop,algorithm=dnn,width=1200,height=886"
                  }
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {menu.mealType.toUpperCase()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Breakfast. The best part of waking up! Get crunchy and
                    delicious breakfast here
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={() => history.push(`/viewMenu/${menu._id}`)}
                    sx={{ marginLeft: "auto" }}
                    margin="auto"
                    variant="contained"
                    size="medium"
                    endIcon={<FastfoodIcon />}
                  >
                    View Food Item
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default Menu;

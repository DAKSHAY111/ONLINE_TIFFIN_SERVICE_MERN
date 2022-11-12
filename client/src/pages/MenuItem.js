import { React, useEffect, useContext } from "react";

import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import PaymentIcon from "@mui/icons-material/Payment";
import Paper from "@mui/material/Paper";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { UserContext } from "../context/UserContext";

// require("dotenv").config();

const MenuItem = () => {
  const context = useContext(UserContext);
  const [order, setOrder] = useState({
    OrderedItems: [],
    totalPrice: 0,
    contactNumber: "",
    deliveryCharge: 0,
    mealType: "",
    orderBy: "",
    placedAt: "",
    shippingAddress: "",
  });

  //*  ----------------------RAZORPAY---------------------------- **/
  const initPayment = (data) => {
    const options = {
      key: "rzp_test_ye5vdixvFR6hVR",
      amount: data.amount,
      currency: data.currency,
      name: menuItem.mealType,
      description: "Test Transaction",
      image: dinnerUrl,
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl = "https://tiffin-box-service.herokuapp.com/OTS/order/verify";
          const { data } = await axios.post(verifyUrl, response);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async () => {
    try {
      const token = "Bearer " + localStorage.getItem("jwt");

      const orderUrl = "https://tiffin-box-service.herokuapp.com/OTS/order/placeorder";

      const dataRaw = await fetch(orderUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(order),
        // credentials: "include",
      });
      const data = await dataRaw.json();

      console.log(data);
      initPayment(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // if (!context) {
  //   alert("Please Login first");
  //   history.push("/login");
  // }

  const lunchUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYLpNWFsLHPPRTMo2VT2tDNRb7dR7luhs1Wju_b4MwZpFLd2ZJA6-36Du57LOOL9IU_Rw&usqp=CAU";
  const dinnerUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYLpNWFsLHPPRTMo2VT2tDNRb7dR7luhs1Wju_b4MwZpFLd2ZJA6-36Du57LOOL9IU_Rw&usqp=CAU";
  const history = useHistory();
  const [isLoading, setisLoading] = useState(true);
  let { id } = useParams();
  const [menuItem, setmenuItem] = useState({
    foodItems: [],
    mealType: "",
    stock: 0,
    totalPrice: 0,
  });

  useEffect(() => {
    const getMenuItem = async () => {
      console.log("🚀 ~ file: MenuItem.js ~ line 27 ~ getMenuItem ~ id", id);
      try {
        const res = await fetch(
          `https://tiffin-box-service.herokuapp.com/OTS/menu/viewMenu/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            // credentials: "include",
          }
        );

        const todayMenu = await res.json();
        console.log(todayMenu);
        console.log(
          "🚀 ~ file: MenuItem.js ~ line 125 ~ getMenuItem ~ todayMenu",
          todayMenu.data.menu.foodItems
        );

        if (todayMenu.status !== "success") {
          alert("Something is wrong plzz try again later");
          history.push("/login");
        } else {
          setmenuItem(todayMenu.data.menu);
          setOrder({
            OrderedItems: todayMenu.data.menu.foodItems,
            mealType: todayMenu.data.menu.mealType,
            totalPrice: todayMenu.data.menu.totalPrice,
            placedAt: new Date(),
            orderBy: context._id,
            contactNumber: context.contact,
            shippingAddress: context.address,
            deliveryCharge: 10,
          });
          setisLoading(false);
          console.log(
            "🚀 ~ file: MenuItem.js ~ line 145 ~ getMenu ~ Orders",
            order
          );
        }
      } catch (err) {
        history.push("/login");
        console.log(err);
      }
    };
    getMenuItem();
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
        <Grid container sx={{ margin: "10vh auto" }}>
          <Grid container spacing={3} sx={{ margin: "10vh 1vh" }}>
            <Grid item xs={12} md={4}>
              <CardMedia
                component="img"
                image={
                  menuItem.mealType === "dinner"
                    ? dinnerUrl
                    : lunchUrl
                }
                alt="Image"
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography gutterBottom variant="h5" component="div">
                <TableContainer component={Paper} sx={{ borderRadius: "15" }}>
                  <Table aria-label="simple table" stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            backgroundColor: "#039be5",
                            color: "white",
                          }}
                        >
                          Item
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontWeight: "bold",
                            backgroundColor: "#039be5",
                            color: "white",
                          }}
                        >
                          Quantity
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontWeight: "bold",
                            backgroundColor: "#039be5",
                            color: "white",
                          }}
                        >
                          Price (&#8377;)
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {menuItem.foodItems.map((Item) => (
                        <TableRow
                          key={Item.ItemName}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {Item.ItemName}
                          </TableCell>
                          <TableCell align="center">{Item.Quantity}x</TableCell>
                          <TableCell align="center">{Item.ItemPrice}</TableCell>
                        </TableRow>
                      ))}
                      <TableCell align="center"></TableCell>
                      <TableCell align="center">Total Bill :</TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          startIcon={<PaymentIcon />}
                          onClick={handlePayment}
                        >
                          {menuItem.totalPrice} &#8377;
                        </Button>
                      </TableCell>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default MenuItem;

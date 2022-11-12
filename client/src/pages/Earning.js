import { React, useEffect, useContext } from "react";
import { Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { UserContext } from "../context/UserContext";
import AlertDialog from "../components/Popup";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";

import CircularProgress from "@mui/material/CircularProgress";

const Earning = () => {
  const [fromDate, setfromDate] = useState(new Date());
  const [toDate, settoDate] = useState(new Date());
  const context = useContext(UserContext);
  const [isLogin, setisLogin] = useState(true);
  const [isLoading, setisLoading] = useState(true);

  const history = useHistory();
  const allOrders = [];
  const [orders, setOrders] = useState([
    {
      OrderedItems: [],
      contactNumber: "",
      deliveryCharge: 0,
      mealType: "",
      orderBy: {
        name: "",
        email: "",
      },
      placedAt: "",
      shippingAddress: "",
      totalPrice: 0,
    },
  ]);

  const getFilteredOrder = async () => {
    console.log("From " + moment(fromDate).format("DD-MM-YYYY"));
    console.log("To " + moment(toDate).format("DD-MM-YYYY"));
    console.log("----------------orders----------------");

    orders.map((order) => {
      console.log(moment(order.placedAt).format("DD-MM-YYYY"));
      if (
        moment(order.placedAt).isBetween(
          moment(fromDate).format("DD-MM-YYYY"),
          moment(toDate).format("DD-MM-YYYY")
        )
      ) {
        // console.log(order);
      }
    });
  };

  function handleFilter1(date) {
    setfromDate(date);
    getFilteredOrder();
  }
  function handleFilter2(date) {
    settoDate(date);
    getFilteredOrder();
  }

  useEffect(() => {
    const checkContext = async () => {
      if (context == null) {
        setisLogin(false);
      } else {
        setisLogin(true);
      }
    };

    const getAllOrders = async () => {
      const token = "Bearer " + localStorage.getItem("jwt");
      try {
        const res = await fetch(
          "https://tiffin-box-service.herokuapp.com/OTS/order/getAllOrders",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: token,
              "Access-Control-Allow-Origin": "*",
            },
          }
        );

        const data = await res.json();

        if (data.status !== "success") {
          setisLogin(false);
          setisLoading(false);
        } else {
          setOrders(data.data.orders);
          console.log(
            "🚀 ~ file: Earning.js ~ line 129 ~ getAllOrders ~ orders",
            orders
          );

          setisLoading(false);
        }
      } catch (err) {
        history.push("/login");
        console.log(err);
      }
    };

    console.log(context);
    checkContext();
    getAllOrders();

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
            <div>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "nowrap",
                  justifyContent: "space-between",
                  p: 3,
                  mt: 9,

                  minWidth: "75%",
                  borderRadius: 1,
                }}
              >
                <h2>Total Orders</h2>
                <h2>
                  Total Revenue : &#x20B9;
                  {orders
                    .map((order) => order.totalPrice)
                    .reduce((prev, next) => prev + next)}
                </h2>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-around",
                  mb: 3,
                  minWidth: "60%",
                  borderRadius: 1,
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="From "
                    formatDate={(date) => new Date(date).toLocaleDateString()}
                    value={fromDate}
                    onChange={(date) => {
                      handleFilter1(moment(date).format("DD-MM-YYYY"));
                    }}
                    format="dd/MM/yyyy"
                    renderInput={(params) => <TextField {...params} />}
                  />
                  <DatePicker
                    label="To "
                    formatDate={(date) => new Date(date).toLocaleDateString()}
                    value={toDate}
                    onChange={(date) => {
                      handleFilter2(moment(date).format("DD-MM-YYYY"));
                    }}
                    format="dd/MM/yyyy"
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Box>

              <Accordion>
                <AccordionSummary
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography
                    sx={{ width: "5%", flexShrink: 0, textAlign: "left" }}
                  >
                    No.
                  </Typography>
                  <Typography sx={{ width: "10%", flexShrink: 0 }}>
                    Meal Type
                  </Typography>
                  <Typography sx={{ width: "10%", flexShrink: 0 }}>
                    Order Date
                  </Typography>
                  <Typography sx={{ width: "10%", flexShrink: 0 }}>
                    Customer
                  </Typography>
                  <Typography
                    sx={{ width: "38%", flexShrink: 0, textAlign: "center" }}
                  >
                    Address
                  </Typography>
                  <Typography
                    sx={{ width: "10%", flexShrink: 0, textAlign: "right" }}
                  >
                    Delivery Charge
                  </Typography>
                  <Typography
                    sx={{ width: "10%", flexShrink: 0, textAlign: "right" }}
                  >
                    Total amount
                  </Typography>
                </AccordionSummary>
              </Accordion>

              {orders.map((order, id) => (
                <div>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography sx={{ width: "5%", flexShrink: 0 }}>
                        {id + 1}
                      </Typography>
                      <Typography sx={{ width: "10%", flexShrink: 0 }}>
                        {order.mealType}
                      </Typography>
                      <Typography sx={{ width: "10%", flexShrink: 0 }}>
                        {order.placedAt.substring(0, 10)}
                      </Typography>
                      <Typography sx={{ width: "20%", flexShrink: 0 }}>
                        {order.orderBy.email}
                      </Typography>
                      <Typography sx={{ width: "30%", flexShrink: 0 }}>
                        {order.shippingAddress}
                      </Typography>
                      <Typography
                        sx={{
                          width: "10%",
                          flexShrink: 0,
                          textAlign: "center",
                        }}
                      >
                        {order.deliveryCharge}
                      </Typography>
                      <Typography
                        sx={{
                          width: "10%",
                          flexShrink: 0,
                          textAlign: "center",
                        }}
                      >
                        {order.totalPrice}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <TableContainer>
                        <Table sx={{ minWidth: 500 }} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>No.</TableCell>
                              <TableCell>Item Name</TableCell>
                              <TableCell>Quantity</TableCell>
                              <TableCell>Price/Item</TableCell>
                              <TableCell>Total</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {order.OrderedItems.map((item, id) => (
                              <TableRow
                                key={id}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell>{id + 1}</TableCell>
                                <TableCell>{item.ItemName}</TableCell>
                                <TableCell>{item.Quantity}</TableCell>
                                <TableCell>{item.ItemPrice}</TableCell>
                                <TableCell>
                                  {item.ItemPrice * item.Quantity}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </AccordionDetails>
                  </Accordion>
                </div>
              ))}
            </div>
          ) : (
            <AlertDialog open={!isLogin} />
          )}
        </>
      )}
    </>
  );
};

export default Earning;

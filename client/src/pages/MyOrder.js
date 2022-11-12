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
import CircularProgress from "@mui/material/CircularProgress";

const MyOrder = () => {
  const context = useContext(UserContext);
  const [isLogin, setisLogin] = useState(true);
  const [isLoading, setisLoading] = useState(true);

  const history = useHistory();
  const [orders, setOrders] = useState([
    {
      OrderedItems: [],
      contactNumber: "",
      deliveryCharge: 0,
      mealType: "",
      orderBy: "",
      placedAt: "",
      shippingAddress: "",
      totalPrice: 0,
    },
  ]);

  useEffect(() => {
    // while (context == null);
    const checkContext = async () => {
      if (context == null) {
        setisLogin(false);
      } else {
        setisLogin(true);
      }
    };

    const checkAuth = async () => {
      const token = "Bearer " + localStorage.getItem("jwt");
      try {
        const res = await fetch("https://tiffin-box-service.herokuapp.com/OTS/order/myorder", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
            "Access-Control-Allow-Origin": "*",
          },
        });

        const data = await res.json();

        if (data.status !== "success") {
          setisLogin(false);
          setisLoading(false);
        } else {
          setOrders(data.data.orders);
          setisLoading(false);

          console.log(
            "🚀 ~ file: MyOrder.js ~ line 43 ~ checkAuth ~ data.data.orders }}",
            isLoading
          );
        }
      } catch (err) {
        history.push("/login");
        console.log(err);
      }
    };

    console.log(context);
    checkContext();
    setTimeout(checkAuth(), 1);

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
              <h2 style={{ marginTop: 100, textAlign: "center" }}>My Orders</h2>
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
                  <Typography sx={{ width: "20%", flexShrink: 0 }}>
                    Order Date
                  </Typography>
                  <Typography
                    sx={{ width: "28%", flexShrink: 0, textAlign: "center" }}
                  >
                    Address
                  </Typography>
                  <Typography
                    sx={{ width: "10%", flexShrink: 0, textAlign: "center" }}
                  >
                    Delivery Charge
                  </Typography>
                  <Typography
                    sx={{ width: "10%", flexShrink: 0, textAlign: "center" }}
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
                      <Typography sx={{ width: "20%", flexShrink: 0 }}>
                        {order.placedAt.substring(0, 10)}
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

export default MyOrder;

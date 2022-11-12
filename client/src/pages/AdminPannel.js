import { React } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import Typography from "@mui/material/Typography";

const AdminPannel = () => {
  return (
    <>
      (
      <Grid container spacing={1} align="center" sx={{ margin: "20vh auto" }}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{ maxWidth: 300, minHeight: 150, py: 2 }}
            variant="outlined"
          >
            <CardActionArea component={Link} to="/earning">
              <CurrencyRupeeIcon fontSize="large" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Total Earning
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  See the monthly earning of your bussiness
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ maxWidth: 300, py: 2 }} variant="outlined">
            <CardActionArea component={Link} to="/addmenu">
              <RestaurantMenuIcon fontSize="large" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Add Menu
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Add Your Today's Delicious Menu
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
      )
    </>
  );
};

export default AdminPannel;

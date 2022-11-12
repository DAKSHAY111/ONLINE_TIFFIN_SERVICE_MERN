import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import RestaurantRoundedIcon from "@mui/icons-material/RestaurantRounded";

const PageNotFound = () => {
  const history = useHistory();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid xs={12} md={6}>
            <Typography variant="h1">404</Typography>
            <Typography variant="h6">
              Oops... ! The page you’re looking for doesn’t exist.
            </Typography>
            <Button
              onClick={() => history.push("/viewMenu")}
              sx={{ margin: "2vh" }}
              variant="contained"
              size="medium"
              endIcon={<RestaurantRoundedIcon />}
            >
              View Food Item
            </Button>
          </Grid>
          <Grid xs={12} md={6}>
            <img
              src="https://img.freepik.com/premium-vector/error-404-with-cute-cherry-mascot_152558-76430.jpg?w=2000"
              alt="Img"
              width={500}
              height={400}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PageNotFound;

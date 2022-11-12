import { React, useState } from "react";
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
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import RemoveIcon from "@mui/icons-material/Remove";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";

const AddMenu = () => {
  const [items, setItems] = useState([
    { ItemName: "", ItemPrice: 0, Quantity: 0 },
  ]);

  const [inputs, setInputs] = useState({
    mealType: "",
    items: items,
    stock: 0,
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangeInput = (index, event) => {
    const values = [...items];
    console.log(values);

    values[index][event.target.name] = event.target.value;
    setItems(values);
  };

  const handleAddFields = () => {
    setItems([...items, { ItemName: "", ItemPrice: 0, Quantity: 0 }]);
  };

  const handleRemoveFields = (index) => {
    const values = [...items];
    if (values.length !== 1) {
      values.splice(index, 1);
      setItems(values);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    delete inputs.ItemName;
    delete inputs.ItemPrice;
    delete inputs.Quantity;
    inputs.foodItems = items;

    const token = "Bearer " + localStorage.getItem("jwt");
    console.log(inputs);
    const response = await fetch("https://tiffin-box-service.herokuapp.com/OTS/menu/addMenu", {
      method: "POST",
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },

      body: JSON.stringify(inputs),
    });

    const data = await response.json();
    // console.log(data.data);

    if (data.status === "success") {
      console.log(data);
      alert("Added successfully");
    } else {
      console.log("failed");
    }
  };

  const paperStyle = {
    padding: 20,
    margin: "16vh auto",
    width: 450,
  };

  const smallDev = {
    padding: 20,
    margin: "16vh auto",
    width: 450,
  };

  const FirstItemStyle = {
    marginTop: "25px",
    marginRight: "5px",
  };

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Grid align="center">
        <Paper elevation={5} style={!isMatch ? paperStyle : smallDev}>
          <Grid align="center">
            <Avatar sx={{ width: 60, height: 60 }}>
              <RestaurantMenuIcon
                sx={{ fontSize: 60, backgroundColor: "Orange" }}
              />
            </Avatar>
            <Typography variant="h6" style={{ marginTop: "8px" }}>
              Add Menu
            </Typography>
          </Grid>
          <form style={{ marginTop: "8px" }} onSubmit={handleSubmit}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Meal Type</InputLabel>
                <Select
                  name="mealType"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={inputs.mealType}
                  label="mealtype"
                  onChange={handleChange}
                >
                  <MenuItem value={"breakfast"}>Breakfast</MenuItem>
                  <MenuItem value={"lunch"}>Lunch</MenuItem>
                  <MenuItem value={"dinner"}>Dinner</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <FormControl onChange={handleChange}>
              {items.map((items, index) => (
                <>
                  <div style={{ display: "flex" }}>
                    <TextField
                      name="ItemName"
                      varient="outlined"
                      label="ItemName"
                      value={inputs.foodItems.ItemName}
                      style={FirstItemStyle}
                      onChange={(event) => handleChangeInput(index, event)}
                      required
                    />
                    <TextField
                      type="number"
                      name="ItemPrice"
                      varient="outlined"
                      label="ItemPrice"
                      value={inputs.foodItems.ItemPrice}
                      style={FirstItemStyle}
                      onChange={(event) => handleChangeInput(index, event)}
                      required
                    />
                    <TextField
                      type="number"
                      name="Quantity"
                      varient="outlined"
                      label="Quantity"
                      value={inputs.foodItems.Quantity}
                      style={FirstItemStyle}
                      onChange={(event) => handleChangeInput(index, event)}
                      required
                    />
                    <IconButton
                      onClick={() => handleRemoveFields(index)}
                      variant="outlined"
                      style={{
                        marginTop: "25px",
                        height: "55px",
                        color: "dodgerBlue",
                      }}
                    >
                      <RemoveIcon />
                    </IconButton>
                  </div>
                </>
              ))}

              <Button
                onClick={() => handleAddFields()}
                variant="outlined"
                style={{ marginTop: "25px", width: "100%" }}
              >
                Add Item
              </Button>
            </FormControl>
            <TextField
              type="number"
              name="stock"
              varient="outlined"
              label="Stock"
              value={inputs.stock}
              style={{ marginTop: "25px" }}
              onChange={handleChange}
              fullWidth
              required
            />

            <Grid
              container
              style={{ marginTop: "20px" }}
              justifyContent="center"
              alignItems="center"
            >
              <Button
                fullWidth
                type="submit"
                variant="contained"
                style={{ width: "100%" }}
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

export default AddMenu;

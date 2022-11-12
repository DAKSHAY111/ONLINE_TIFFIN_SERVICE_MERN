import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Signup from "./pages/Signup";
import MyOrder from "./pages/MyOrder";
import Menu from "./pages/Menu";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import ForgetPassword from "./pages/ForgetPassword";
import Earning from "./pages/Earning";
import AddMenu from "./pages/AddMenu";
import { UserContextProvider } from "./context/UserContext";
import MenuItem from "./pages/MenuItem";
import AdminPannel from "./pages/AdminPannel";
import PageNotFound from "./pages/PageNotFound";

const Routing = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
      <Route path="/forgotPassword" component={ForgetPassword} />
      <Route path="/orders" component={MyOrder} />
      <Route exact path="/viewMenu" component={Menu} />
      <Route path="/viewMenu/:id" component={MenuItem} />
      <Route path="/profile" component={Profile} />
      <Route path="/adminPannel" component={AdminPannel} />
      <Route path="/earning" component={Earning} />
      <Route path="/addMenu" component={AddMenu} />
      <Route path="/earning" component={Earning} />
      <Route path="/logout" component={Logout} />
      <Route path="*" component={PageNotFound} />
    </Switch>
  );
};

const App = () => {
  return (
    <>
      <UserContextProvider>
        <BrowserRouter>
          <Navbar />
          <Routing />
        </BrowserRouter>
      </UserContextProvider>
    </>
  );
};

export default App;

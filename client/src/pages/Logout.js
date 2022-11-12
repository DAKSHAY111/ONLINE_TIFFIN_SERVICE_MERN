import { React, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

// import {  } from "../App";
// import { MyUserContext } from "../context/UserContext";

import { UserContext, DispatchUserContext } from "../context/UserContext";
const Logout = () => {
  const history = useHistory();
  const context = useContext(UserContext);
  const dispatchContext = useContext(DispatchUserContext);

  useEffect(() => {
    const checkAuth = () => {
      console.log("🚀 ~ file: Logout.js ~ line 9 ~ Logout ~ state", context);

      if (context) {
        localStorage.removeItem("jwt");
        dispatchContext(null);
        console.log("🚀 ~ file: Logout.js ~ line 20 ~ Logout ~ state", context);
        // context = null;
        history.push("/login");
      } else {
        alert("Something is wrong");
        history.push("/");
      }
      // console.log(token);
    };
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <p sx={{ mt: 100 }}>LogOut</p>
    </>
  );
};

export default Logout;

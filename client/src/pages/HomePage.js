import { React, useContext } from "react";
import { UserContext } from "../context/UserContext";
const HomePage = () => {
  const context = useContext(UserContext);

  return (
    <h2 style={{ marginTop: 100, textAlign: "center" }}>
      Welcome {context ? context.name : "User"}
    </h2>
  );
};

export default HomePage;

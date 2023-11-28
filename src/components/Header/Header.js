import "./Header.scss";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/Logo/Original on Transparent.png";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

export default function Header() {
  const [value, setValue] = React.useState("/feed", "/myprofile");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="header">
      <div className="header__wrapper">
        <Link to="/feed">
          <img className="header__logo" src={Logo} alt="Logo" />
        </Link>

        <Box sx={{ width: "100%", marginLeft: "60rem" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
          >
            <Tab label="Feed" value="/feed" component={NavLink} to="/feed" />
            <Tab
              label="Profile"
              value="/profile"
              component={NavLink}
              to="/myprofile"
            />
          </Tabs>
        </Box>
      </div>
    </div>
  );
}

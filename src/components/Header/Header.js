import "./Header.scss";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/Logo/Original on Transparent.png";
import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

export default function Header() {
  return (
    <div className="header">
      <div className="header__wrapper">
        <Link to="/feed">
          <img className="header__logo" src={Logo} alt="Logo" />
        </Link>

        <Stack
          direction="row"
          spacing={1}
          sx={{
            marginTop: "2.5rem",
          }}
        >
          <Button
            value="/feed"
            component={NavLink}
            to="/feed"
            sx={{
              color: "#4654a3",
              "&:hover": { color: "#2B356C" },
            }}
          >
            <DynamicFeedIcon /> Feed
          </Button>
          <Button
            value="/myprofile"
            component={NavLink}
            to="/myprofile"
            sx={{
              color: "#4654a3",
              "&:hover": { color: "#2B356C" },
            }}
          >
            <PersonOutlineIcon /> Profile
          </Button>
        </Stack>
      </div>
    </div>
  );
}

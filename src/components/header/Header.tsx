import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HeaderNameType } from "../../models/types";
import MenuIcon from "@mui/icons-material/Menu";
import { ILocationState } from "../../models/interfaces";
import ProductsHeader from "./ProductsHeader";
import { useDispatch, useSelector } from "react-redux";
import { setSidebarOpen } from "../../state/redux/reducers/appSettingsReducer";
import { RootState } from "../../state/redux/store";
import { getHeaderNameFromLocation } from "../../helpers/functions";

const Header = () => {
  let location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { pathname } = location as ILocationState;
  const { sidebarOpen } = useSelector((state: RootState) => state.appSettings);

  const [headerName, setHeaderName] =
    useState<HeaderNameType>("Hlavní Stránka");

  useEffect(() => {
    setHeaderName(getHeaderNameFromLocation(pathname));
  }, [pathname]);

  const toggleSidebar = () => {
    dispatch(setSidebarOpen(!sidebarOpen));
  };

  return (
    <AppBar
      position="static"
      sx={{ height: 80, padding: 1, backgroundColor: "GrayText" }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={toggleSidebar}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 0.5 }}>
          {headerName}
        </Typography>

        {headerName === "Produkty" && <ProductsHeader />}
      </Toolbar>
    </AppBar>
  );
};

export default Header;

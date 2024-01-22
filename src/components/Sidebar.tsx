import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CalculateIcon from "@mui/icons-material/Calculate";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ILocationState } from "../models/interfaces";
import {
  getHeaderNameFromLocation,
  getLocationFromHeaderName,
} from "../helpers/functions";
import { HeaderNameType } from "../models/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/redux/store";
import { setSidebarOpen } from "../state/redux/reducers/appSettingsReducer";

/// MUSÍME NASTAVIT ZVLÁŠŤ STYLY PRO DRAWER PROTOŽE MUI NENABÍZÍ MOŽNOST UPRAVIT SI SIDEBAR DLE SVÉHO
/// PODÍVEJ SE DO INDEX.CSS KDE TARGETUJEŠ SIDEBAR A UPRAVUJEŠ HO
const Sidebar = () => {
  let location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { pathname } = location as ILocationState;

  const { sidebarOpen } = useSelector((state: RootState) => state.appSettings);

  const menuItems: HeaderNameType[] = [
    "Hlavní Stránka",
    "Produkty",
    "Kalkulačka",
    "Objednávka",
  ];

  const toggleDrawer = (open: boolean) => () => {
    dispatch(setSidebarOpen(open));
  };

  const redirectTo = (path: string) => {
    navigate(path);
  };

  return (
    <div>
      <Fragment key={"left"}>
        <Drawer
          anchor={"left"}
          open={sidebarOpen}
          onClose={toggleDrawer(false)}
          className="sidebar"
        >
          <Box
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
            sx={{ width: 250 }}
          >
            <List>
              {menuItems
                .filter((item) => {
                  return item !== getHeaderNameFromLocation(pathname);
                })
                .map((text) => (
                  <ListItem
                    key={text}
                    disablePadding
                    onClick={() => redirectTo(getLocationFromHeaderName(text))}
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        {text === "Hlavní Stránka" && <HomeIcon />}
                        {text === "Produkty" && <FormatListBulletedIcon />}
                        {text === "Kalkulačka" && <CalculateIcon />}
                        {text === "Objednávka" && <ShoppingCartIcon />}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                ))}
            </List>
          </Box>
        </Drawer>
      </Fragment>
    </div>
  );
};

export default Sidebar;

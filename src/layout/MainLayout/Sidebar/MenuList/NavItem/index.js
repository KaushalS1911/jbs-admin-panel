import PropTypes from "prop-types";
import { forwardRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";

import { MENU_OPEN, SET_MENU } from "store/actions/loginactions";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //

const NavItem = ({ item, level }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const customization = useSelector((state) => state.customization);
  const matchesSM = useMediaQuery(theme.breakpoints.down("lg"));
  const Icon = item.icon;
  
  const itemIcon = item?.icon ? (
    <Icon stroke={1.5} size="2.3rem" />
  ) : (
    <FiberManualRecordIcon
      sx={{
        width:
          customization.isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
        height:
          customization.isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
      }}
      fontSize={level > 0 ? "inherit" : "medium"}
    />
  );

  let itemTarget = "_self";
  if (item.target) {
    itemTarget = "_blank";
  }

  let listItemProps = {
    component: forwardRef((props, ref) => (
      <Link ref={ref} {...props} to={item.url} target={itemTarget} sx={{color:'#5559CE'}}/>
    )),
  };


  if (item?.external) {
    listItemProps = { component: "a", href: item.url, target: itemTarget };
  }

  const itemHandler = (id) => {
    dispatch({ type: MENU_OPEN, id });
    if (matchesSM) dispatch({ type: SET_MENU, opened: false });
  };

  useEffect(() => {
    const currentIndex = document.location.pathname
      .toString()
      .split("/")
      .findIndex((id) => id === item.id);
    if (currentIndex > -1) {
      dispatch({ type: MENU_OPEN, id: item.id });
    }
  }, [pathname]);

  return (
    <ListItemButton
      {...listItemProps}
      disabled={item.disabled}
      sx={{
        borderRadius: "10px",
        backgroundColor: pathname.includes(item.url)
          ? "#5559CE"
          : "transparent",
        color: pathname.includes(item.url) ? "#5559CE" : "transparent",
      }}
      selected={pathname.includes(item.url)}
      onClick={() => itemHandler(item.id)}
    >
      <ListItemIcon>{itemIcon}</ListItemIcon>
      <ListItemText sx={{color:'#5559CE!important'}}>{item.title}</ListItemText>
    </ListItemButton>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
};

export default NavItem;

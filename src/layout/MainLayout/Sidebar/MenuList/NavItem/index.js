import PropTypes from "prop-types";
import { forwardRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

const NavItem = ({ item }) => {
  const { pathname } = useLocation();
  const Icon = item.icon;

  const itemIcon = item?.icon ? <Icon sx={{fontSize:'22px',}}/> : null;

  let itemTarget = "_self";
  if (item.target) {
    itemTarget = "_blank";
  }

  let listItemProps = {
    component: forwardRef((props, ref) => (
      <Link
        ref={ref}
        {...props}
        to={item.url}
        target={itemTarget}
        style={{ color: "#5559CE!important", fontWeight: "700" }}
      />
    )),
  };

  if (item?.external) {
    listItemProps = { component: "a", href: item.url, target: itemTarget };
  }
  useEffect(() => {}, [pathname]);

  return (
    <ListItemButton
      {...listItemProps}
      disabled={item.disabled}
      sx={{
        borderRadius: "10px",
        backgroundColor: pathname.includes(item.url)
          ? "#ede7f6!important"
          : "trasparent",
        color: pathname.includes(item.url) ? "#fff!important" : "trasparent",
      }}
      selected={pathname.includes(item.url)}
    >
      <ListItemIcon >{itemIcon}</ListItemIcon>
      <ListItemText >{item.title}</ListItemText>
    </ListItemButton>
  );
};

NavItem.propTypes = { 
  item: PropTypes.object,
};

export default NavItem;

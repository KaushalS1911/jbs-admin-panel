// project imports
import NavGroup from "./NavGroup";
import menuItem from "menu-items";

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  const navItems = menuItem.items.map((item) => {
    switch (item.type) {
      case "group":
        return <NavGroup key={item.id} item={item} sx={{backgroundColor:'#262626'}}/>;
      default:
        return null;
    }
  });
  return <>{navItems}</>;
};

export default MenuList;

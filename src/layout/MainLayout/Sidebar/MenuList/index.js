// project imports
import NavGroup from "./NavGroup";
import menuItem from "menu-items";
import {useRecoilValue} from "recoil";
import {profile} from "../../../../atoms/authAtoms";

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  const user = useRecoilValue(profile)
  let listItem
  if(user.role === 'Admin'){
    listItem = menuItem.items
  }else{
    listItem = menuItem.items.filter((e) => e.role === " ")
  }
  const navItems = listItem.map((item) => {
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

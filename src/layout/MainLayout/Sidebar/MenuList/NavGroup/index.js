import PropTypes from 'prop-types';
import { List, Typography } from '@mui/material';
import NavItem from '../NavItem';
import {useRecoilValue} from "recoil";
import {profile} from "../../../../../atoms/authAtoms";


const NavGroup = ({ item }) => {
  const user = useRecoilValue(profile)
    const adminMenuItems = item.children.filter((e) => e.role.includes("Admin"))
    const studentMenuItems = item.children.filter((e) => e.role.includes("Student"))
    const employeeMenuItems = item.children.filter((e) => e.role.includes("Employee"))

  let listItems

  if(user.role === "Admin"){
    listItems = adminMenuItems
  }else if(user.role === "Student"){
    listItems = studentMenuItems
  }else{
    listItems = employeeMenuItems
  }

  const items = listItems?.map((menu) => {
    switch (menu.type) {
      case 'item':
        return <NavItem key={menu.id} item={menu} level={1} />;
      default:
        return (
          <Typography key={menu.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return (
    <>
      <List>{items}</List>
    </>
  );
};

NavGroup.propTypes = {
  item: PropTypes.object
};

export default NavGroup;

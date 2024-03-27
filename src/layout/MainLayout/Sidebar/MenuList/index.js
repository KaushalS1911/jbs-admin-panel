// project imports
import NavGroup from './NavGroup';
import menuItem from 'menu-items';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  const navItems = menuItem.items.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        // If the item type is not 'group', return null
        return null;
    }
  });

  // Filter out null values before rendering
  const filteredNavItems = navItems.filter((item) => item !== null);

  return <>{filteredNavItems}</>;
};

export default MenuList;

import React from 'react';

const MenuItem = ({ title, url, icon: Icon, isSelected, onClick }) => {
  return (
    <div 
      onClick={onClick} 
      style={{ backgroundColor: isSelected ? '#e1e1e1' : 'transparent', cursor: 'pointer' }}
    >
      <Icon />
      <span>{title}</span>
    </div>
  );
};

export default MenuItem;

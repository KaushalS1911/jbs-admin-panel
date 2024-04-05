import React from "react";
import Company_logo from "../../src/assets/images/JBS-IT-Institute-logo.png";



const Logo = () => {
  const logoStyle = {
    width: "75px",
    height: "50px",
    aspectRatio:'1/2'
  };

const storedCompanylogo = localStorage.getItem('Companylogo');

console.log(storedCompanylogo);


  return (
    <>
      <img src={storedCompanylogo} alt="Comapny_logo" style={logoStyle} />
    </>
  );
};

export default Logo;

import React from "react";

const Logo = () => {
  const logoStyle = {
    width: "80px",
    height: "60px",
    aspectRatio: '1/2'
  };

  const storedCompanylogo = localStorage.getItem('Companylogo');

  return (
    <>
      {storedCompanylogo && storedCompanylogo.trim() !== "" ? (
        <img src={storedCompanylogo} alt="Company_logo" style={logoStyle} />
      ) : (
        <img src="https://i.postimg.cc/x16BK65j/images.png" alt="Default_logo" style={logoStyle} />
      )}
    </>
  );
};

export default Logo;

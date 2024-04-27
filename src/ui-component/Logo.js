import React, { useEffect } from "react";
import { useGetCompanyDetails } from "../hooks/useGetCompanyDetails";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";

const Logo = () => {
  const { data, refetch } = useGetCompanyDetails();
  const { configs } = useSelector((state) => state.configs);

  useEffect(() => {
    if (!configs && !configs.company_details) {
      refetch();
    }
  }, [configs, configs.company_details]);

  const companyLogo = configs?.company_details?.logo || data?.logo_url;

  return (
    <>
      <Avatar
        variant="rounded"
        alt="Company Logo"
        src={companyLogo}
        sx={{
          width: 100,
          height: 100,
          background: "none",
        }}
      />
    </>
  );
};

export default Logo;

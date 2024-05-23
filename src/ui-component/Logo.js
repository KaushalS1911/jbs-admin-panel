import React, { useEffect } from "react";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { useGetCompanyDetails } from "../hooks/useGetCompanyDetails";

const Logo = () => {
  const { data, refetch } = useGetCompanyDetails();
  const { configs } = useSelector((state) => state.configs);

  useEffect(() => {
    if (!configs?.company_details) {
      refetch();
    }
  }, [configs, refetch]);

  const companyLogo = configs?.company_details?.logo || data?.logo_url;

  return (
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
  );
};

export default Logo;

import React, {useEffect} from "react";
import {useGetCompanyDetails} from "../hooks/useGetCompanyDetails";
import User1 from "../assets/images/users/user-round.svg";
import {Avatar} from "@mui/material";
import {useSelector} from "react-redux";

const Logo = () => {

    const {data, refetch} = useGetCompanyDetails()
    const {configs} = useSelector((state) => state.configs)

    useEffect(() => {
        if(!configs && !configs.company_details){
            refetch()
        }
    }, [])

    const companyLogo = configs?.company_details?.logo || data?.logo_url;

    return (
        <>
            <Avatar alt="Company Logo" src={companyLogo} sx={{ width: 56, height: 56, padding: "0" }}/>
        </>
    );
};

export default Logo;

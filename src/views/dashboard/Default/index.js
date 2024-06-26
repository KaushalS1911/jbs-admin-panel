import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Allofcounter from "../Default/Allofcounter";
import PopularCard from "./Atofthemonth";
import TotalGrowthBarChart from "./Totalrevenue";
import TotelStudentsVisite from "./TotelStudentsVisite";
import UpcomingDemo from "./UpcomingDemo";
import StudentIc from "../../../assets/images/icone deshbord/Vector.png";
import FacultyIc from "../../../assets/images/icone deshbord/Vector (1).png";
import InquiryIc from "../../../assets/images/icone deshbord/Vector (2).png";
import LabIc from "../../../assets/images/icone deshbord/Vector (3).png";
import AccountIc from "../../../assets/images/icone deshbord/Vector (4).png";

import Mainbreadcrumbs from "contants/Mainbreadcrumbs";
import { useGetDashboardData } from "../../../hooks/useGetDashboardData";
import { Link } from "react-router-dom";
import { useGetAccountData } from "../../../hooks/useGetAccountData";
import { useDispatch, useSelector } from "react-redux";
import { getConfigs } from "../../Setting/SettingSlice";
import Loading from "../../../ui-component/Loading";
import { useRecoilState, useRecoilValue } from "recoil";
import { profile } from "../../../atoms/authAtoms";
import PresentStudent from "./PresentStudent";
import { useGetAllStudents } from "hooks/useGetAllStudents";

// ==============================|| DEFAULT DASHBOARD ||============================== //
const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const user = useRecoilValue(profile);
  const { data: account, refetch } = useGetAccountData();
  const { data } = useGetDashboardData();
  const { configs } = useSelector((state) => state.configs);
  const dispatch = useDispatch();
  const { data: students } = useGetAllStudents();
  // eslint-disable-next-line
  const [profileData, setProfileData] = useRecoilState(profile);

  useEffect(() => {
    dispatch(getConfigs(user.company_id));
    if (data && account) {
      setLoading(false);
    }
  }, [data, account]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  let dataObj;

  if (user?.role === "Admin") {
    dataObj = [
      {
        icon: StudentIc,
        roles: "Students",
        roleValue:
          (students?.totalStudents || 0) -
          (students?.students?.filter((s) => s.status === "Completed").length ||
            0),
        roleColor: "#FE8D3D",
        linkTo: "/student",
      },
      {
        icon: FacultyIc,
        roles: "Employees",
        roleValue: data?.employeeCount || 0,
        roleColor: "#79AB78",
        linkTo: "/employee",
      },
      {
        icon: InquiryIc,
        roles: "Inquiries",
        roleValue: data?.inquiryCount || 0,
        roleColor: "#68ACE3",
        linkTo: "/inquiry",
      },
      {
        icon: LabIc,
        roles: "Classrooms",
        roleValue: configs?.classrooms?.length || 0,
        roleColor: "#A682C7",
      },
      {
        icon: AccountIc,
        roles: "Account",
        roleValue:
          account?.otherInfo?.feesReceived?.totalAmount -
            account?.otherInfo?.totalExpense || 0,
        roleColor: "#F35A79",
        linkTo: "/account",
      },
    ];
  } else {
    dataObj = [
      {
        icon: StudentIc,
        roles: "Students",
        roleValue: data?.studentCount || 0,
        roleColor: "#FE8D3D",
        linkTo: "/student",
      },
      {
        icon: FacultyIc,
        roles: "Employees",
        roleValue: data?.employeeCount || 0,
        roleColor: "#79AB78",
      },
      {
        icon: InquiryIc,
        roles: "Inquiries",
        roleValue: data?.inquiryCount || 0,
        roleColor: "#68ACE3",
      },
      {
        icon: LabIc,
        roles: "Classrooms",
        roleValue: configs?.classrooms?.length || 0,
        roleColor: "#A682C7",
      },
    ];
  }

  return (
    <>
      <Mainbreadcrumbs title={"Dashboard"} />
      {isLoading ? (
        <Loading />
      ) : (
        <Grid container spacing={3}>
          {dataObj.map((item, index) => (
            <>
              <Grid
                key={index}
                item
                xl={2}
                lg={3}
                md={4}
                sm={4}
                xs={6}
                style={{
                  height: "@media (max-width: 479px!important) ? 100px : auto",
                }}
              >
                <Link to={item.linkTo}>
                  <Allofcounter
                    icone={item.icon}
                    role={item.roles}
                    roleValue={String(item.roleValue)}
                    roleColor={item.roleColor}
                  />
                </Link>
              </Grid>
            </>
          ))}
          <Grid
            item
            xl={2}
            lg={3}
            md={4}
            sm={4}
            xs={6}
            style={{
              height: "@media (max-width: 479px!important) ? 100px : auto",
            }}
          >
            {profileData.role == "Admin" && (
              <Link to="/logs">
                <PresentStudent />
              </Link>
            )}
          </Grid>
          {(profileData.role === "Admin") && (
            <>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
                    <TotelStudentsVisite isLoading={isLoading} />
                  </Grid>
                  <Grid item xs={12} md={4} lg={4} xl={4}>
                    <UpcomingDemo isLoading={isLoading} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12} lg={5} xl={4}>
                    <PopularCard isLoading={isLoading} />
                  </Grid>
                  <Grid item xs={12} md={12} lg={7} xl={8}>
                    <TotalGrowthBarChart isLoading={isLoading} />
                  </Grid>
                </Grid>
              </Grid>
            </>
          )}

          {(profileData.role === "Reception") && (
            <>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
                    <TotelStudentsVisite isLoading={isLoading} />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                    <UpcomingDemo isLoading={isLoading} />
                  </Grid>
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      )}
    </>
  );
};
export default Dashboard;

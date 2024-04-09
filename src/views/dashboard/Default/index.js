import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Allofcounter from "../Default/Allofcounter";
import PopularCard from "./Atofthemonth";
import TotalGrowthBarChart from "./Totalrevenue";
import TotelStudentsVisite from "./TotelStudentsVisite";
import UpcomingDemo from "./UpcomingDemo";
import { gridSpacing } from "store/constant";
import StudentIc from "../../../assets/images/icone deshbord/Vector.png";
import FacultyIc from "../../../assets/images/icone deshbord/Vector (1).png";
import InquiryIc from "../../../assets/images/icone deshbord/Vector (2).png";
import LabIc from "../../../assets/images/icone deshbord/Vector (3).png";
import AccountIc from "../../../assets/images/icone deshbord/Vector (4).png";
import EmployeIc from "../../../assets/images/icone deshbord/Vector (5).png";
import Mainbreadcrumbs from "contants/Mainbreadcrumbs";
import { useGetDashboardData } from "../../../hooks/useGetDashboardData";
import { Link } from "react-router-dom";
import {useGetCompanyDetails} from "../../../hooks/useGetCompanyDetails";
import {useRecoilState} from "recoil";
import {profile} from "../../../atoms/authAtoms";

// ==============================|| DEFAULT DASHBOARD ||============================== //
const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const [dataObj, setDataObj] = useState([]);
  const { data, refetch } = useGetDashboardData();

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    const updatedDataObj = [
      {
        icon: StudentIc,
        roles: "Student",
        roleValue: data?.studentCount || 0,
        roleColor: "#FE8D3D",
        linkTo: "/student",
      },
      {
        icon: FacultyIc,
        roles: "Employee",
        roleValue: data?.employeeCount || 0,
        roleColor: "#79AB78",
        linkTo: "/employee",
      },
      {
        icon: InquiryIc,
        roles: "Inquiry",
        roleValue: data?.inquiryCount || 0,
        roleColor: "#68ACE3",
        linkTo: "/inquiry",
      },
      {
        icon: LabIc,
        roles: "Lab",
        roleValue: "8",
        roleColor: "#A682C7",
      },
      {
        icon: AccountIc,
        roles: "Account",
        roleValue: "0",
        roleColor: "#F35A79",
        linkTo: "/account",
      },
    ];
    setDataObj(updatedDataObj);
  }, [data]);

  return (
    <>
      <Mainbreadcrumbs title={"Dashboard"} />
      <Grid container spacing={gridSpacing}>
        {dataObj.map((item, index) => (
          <Grid key={index} item lg={2} md={4} sm={4} xs={6}>
            {/* Wrap the grid item with Link component */}
            <Link to={item.linkTo}>
              <Allofcounter
                icone={item.icon}
                role={item.roles}
                roleValue={String(item.roleValue)}
                roleColor={item.roleColor}
              />
            </Link>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={8}>
              <TotalGrowthBarChart isLoading={isLoading} />
            </Grid>
            <Grid item xs={12} md={4}>
              <PopularCard isLoading={isLoading} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={4}>
              <UpcomingDemo isLoading={isLoading} />
            </Grid>
            <Grid item xs={12} md={8}>
              <TotelStudentsVisite isLoading={isLoading} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default Dashboard;

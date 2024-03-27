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
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../store/actions/loginactions";
import Mainbreadcrumbs from "contants/Mainbreadcrumbs";
// ==============================|| DEFAULT DASHBOARD ||============================== //
const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const [databaseData, setDatabaseData] = useState([]);
  const [dataObj, setDataObj] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(false);
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const apiEndpoint = `${process.env.REACT_APP_API_URL}${user.company_id}/dashboard`;

    axios
      .get(apiEndpoint)
      .then((response) => {
        if (response?.data) {
          setDatabaseData(response?.data);
          dispatch(loginSuccess());
        } else {
          console.log("No data found.");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    if (!databaseData) {
      console.log("Database data is not available.");
      return;
    }
    const updatedDataObj = [
      {
        icone: StudentIc,
        roles: "Student",
        roleValue: databaseData?.data?.studentCount || 0,
        roleColor: "#FE8D3D",
      },
      {
        icone: FacultyIc,
        roles: "Faculty",
        roleValue: databaseData?.data?.facultyCount || 0,
        roleColor: "#79AB78",
      },
      {
        icone: InquiryIc,
        roles: "Inquiry",
        roleValue: "0",
        roleColor: "#68ACE3",
      },
      {
        icone: LabIc,
        roles: "Lab",
        roleValue: "8",
        roleColor: "#A682C7",
      },
      {
        icone: EmployeIc,
        roles: "Staff",
        roleValue: databaseData?.data?.employeeCount || 0,
        roleColor: "#F6C863",
      },
      {
        icone: AccountIc,
        roles: "Account",
        roleValue: "0",
        roleColor: "#F35A79",
      },
    ];
    setDataObj(updatedDataObj);
  }, [databaseData]);

  return (
    <>
      <Mainbreadcrumbs title={"Dashboard"} />
      <Grid container spacing={gridSpacing}>
        {dataObj.map((item, index) => (
          <Grid key={index} item lg={2} md={4} sm={4} xs={6}>
            <Allofcounter
              icone={item.icone}
              role={item.roles}
              roleValue={String(item.roleValue)}
              roleColor={item.roleColor}
            />
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

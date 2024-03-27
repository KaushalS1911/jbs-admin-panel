import { useState } from "react";
import MainCard from "ui-component/cards/MainCard";
import { Button, FormControl, Grid, TextField } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import StudentList from "./utils/StudentList";
import "flatpickr/dist/themes/material_green.css";
import { gridSpacing } from "store/constant";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { profile } from "../../atoms/authAtoms";
import Mainbreadcrumbs from "contants/Mainbreadcrumbs";
import { RestoreFromTrashTwoTone } from "@mui/icons-material";
import { notification } from "antd";
import { deleteAllStudents } from "store/slices/inquiryslice";
import { useDispatch } from "react-redux";

function Index(selectedRows,setSelectedRows) {
  const navigate = useNavigate();
  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  // eslint-disable-next-line
  const [profileData, setProfileData] = useRecoilState(profile);
  /* eslint-disable */
  const [searchText, setSearchText] = useState("");

  const StudentAdd = () => {
    navigate(`/company/${profileData.company_id}/add-student`);
  };


  const deletedAllStudents = async () => {
    if (selectedRows && selectedRows.length > 0) {
      try {
        const res = await useDispatch(
          deleteAllStudents({
            ids: selectedRows,
            companyId: profileData.company_id,
          })
        );
        openNotificationWithIcon("success", res.payload.data.message);
        refetch();
      } catch (error) {
        console.error("Error deleting inquiries:", error.message);
      }
    }
  };


  return (
    <>
      <Mainbreadcrumbs title={"Student"} />
      <MainCard>
        <FormControl
          sx={{
            m: 1,
            p: 0,
            minWidth: 120,
            width: "100%",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#5559CE",
              },
              "&:hover fieldset": {
                borderColor: "#5559CE",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#5559CE",
                borderWidth: "2px",
              },
            },

            size: "small",
          }}
        >
          <Grid
            container
            spacing={gridSpacing}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item lg={4} md={12} xs={12} sm={12}>
              <Grid item>
                <TextField
                  item
                  label="Search"
                  fullWidth
                  size="small"
                  style={{ width: "100%", minWidth: "220px", margin: "auto" }}
                  variant="outlined"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  InputLabelProps={{
                    style: { color: "#5559CE", marginBottom: "0" },
                  }}
                />
              </Grid>
            </Grid>

            <Grid
              item
              display={{ xs: "flex", sm: "flex", md: "flex", lg: "flex" }}
              justifyContent={{
                xs: "normal",
                sm: "space-between",
                md: "space-between",
                lg: "flex-end",
              }}
              flexDirection={{ xs: "column", sm: "row", md: "row", lg: "row" }}
              alignItems={"center"}
              lg={8}
              md={12}
              xs={12}
              sm={12}
            >
              <Grid style={{ marginLeft: "4px" }}>
                <Button
                  variant="outlined"
                  style={{
                    color: "#5e35b1",
                    border: "none",
                    lineHeight: "35px",
                    height: "35px",
                    backgroundColor: "#D9DAF9",
                    margin: " 0px 10px 0px 10px ",
                  }}
                  onClick={StudentAdd}
                  startIcon={
                    <AddCircleOutlineIcon
                      style={{ fontSize: "22px", marginRight: "3px" ,color: "#5e35b1",}}
                    />
                  }
                >
                  Add 
                </Button>
                <Button
                  startIcon={
                    <RestoreFromTrashTwoTone
                      style={{
                        fontSize: "22px",
                        marginRight: "3px",
                        color: "#ede7f6",
                      }}
                    />
                  }
                  sx={{
                    backgroundColor: "#5559CE",
                    color: "#fff",
                    marginRight: "10px",
                    height: "35px",
                    lineHeight: "35px",
                    "&:hover": { Color: "#5559CE", backgroundColor: "#5559CE" },
                  }}
                  onClick={deletedAllStudents}
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </FormControl>
      </MainCard>
      <MainCard sx={{ margin: "20px 0" }}>
        <StudentList searchText={searchText}/>
      </MainCard>

      {/* <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} maskClosable={false} footer={false} style={{ width: '50%' }}>
                <StudentMain />
            </Modal> */}
    </>
  );
}

export default Index;

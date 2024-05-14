import React, { useState } from "react";
import { Box } from "@mui/system";
import { Radio, RadioGroup, FormControlLabel, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useRecoilState } from "recoil";
import { profile } from "../../atoms/authAtoms";
import noDataImg from "../../assets/images/no data found.png";
import { notification } from "antd";

const AttendanceView = ({ option, startDate, setSelect }) => {
  const [batchview, setBatchviewData] = useState([]);
  const [checked, setChecked] = useState({});
  /* eslint-disable */
  const [profileData, setProfileData] = useRecoilState(profile);
  const allStatus = ["Present", "Absent", "Late"];


  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  const handleData = (e, params) => {
    const updatedRow = {
      studentId: params.row.studentId,
      status: e.target.value,
      date: startDate,
      company_id: profileData.company_id,
    };
    const updatedBatchview = [...batchview];
    updatedBatchview[params.row.id - 1] = updatedRow;
    setBatchviewData(updatedBatchview);

    setChecked((prev) => ({
      ...prev,
      [params.row.id]: e.target.value,
    }));
  };

  const handleActionSubmit = () => {
    const apiEndpoint = `${process.env.REACT_APP_API_URL}attendance`;
    axios.post(apiEndpoint, { attendance: batchview }).then((res) => {
      openNotificationWithIcon("success", res.data.data.message);
      setSelect("");
    });

    setChecked({});
  };

  const rows = option.batch_members
    ? option.batch_members.map((item, index) => ({
        id: index + 1,
        fullName: `${item.firstName} ${item.lastName}`,
        studentId: item.student_id,
      }))
    : [];

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 200,
      disableColumnMenu: true,
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "fullName",
      headerName: "Name",
      width: 300,
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "actions",
      headerName: "Status",
      width: 500,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <RadioGroup
          row
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={checked[params.row.id] || ""}
          onChange={(e) => handleData(e, params)}
        >
          {allStatus.map((data, index) => (
            <FormControlLabel
              key={index}
              value={data}
              control={<Radio />}
              label={data}
            />
          ))}
        </RadioGroup>
      ),
    },
  ];


  return (
    <Box>
      <form>
        {rows.length > 0 ? (
          <div
            style={{
              width: "100%",
              height: "570px",
              maxHeight: "100%",
            }}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              disableRowSelectionOnClick
              pagination={false}
              disableColumnMenu
              hideFooterSelectedRowCount={true}
              hideFooter={true}
              sx={{
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#ede7f6",
                  fontSize: 14,
                  color: "#262626",
                },
              }}
            />
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={noDataImg}
              alt="no data"
              loading="lazy"
              style={{ maxWidth: "600px", width: "100%" }}
            />
          </div>
        )}

        <Box sx={{ textAlign: "right", marginTop: "10px", padding: "10px " }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleActionSubmit}
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AttendanceView;

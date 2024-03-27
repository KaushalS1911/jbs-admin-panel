import { Button, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React from "react";
import { useState } from "react";
import MainCard from "ui-component/cards/MainCard";
import { useRecoilState } from 'recoil';
import { profile } from '../../atoms/authAtoms';

const AttendanceView = ({ option, startDate }) => {
  var columns;
  const [batchview, setBatchviewData] = useState([]);
  const allStatus = ["Present", "Absent", "Late"];
  const initialRadioStates = allStatus.reduce((acc, status) => {
    acc[status] = "";
    return acc;
  }, {});
  const [checked, setChecked] = useState(initialRadioStates);
  const [profileData, setProfileData] = useRecoilState(profile);
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
    axios.post(apiEndpoint, { attendance: batchview });

    setChecked(initialRadioStates);
  };

  const rows = option.batch_members
    ? option.batch_members.map((item, index) => ({
        id: index + 1,
        fullName: item.firstName + " " + item.lastName,
        studentId: item.student_id,
      }))
    : [];

  columns = [
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
          onChange={(e) => handleData(e, params)}
        >
          {allStatus.map((data, index) => (
            <FormControlLabel
              key={index}
              value={data}
              checked={checked[params.row.id] == data}
              control={<Radio />}
              label={data}
            />
          ))}
        </RadioGroup>
      ),
    },
  ];
  return (
    <>
      <Box>
        <MainCard>
          <div
            style={{
              height: "500",
              width: "100%",
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <form>
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
                  // checkboxSelection
                  disableRowSelectionOnClick
                  disableColumnMenu
                  hideFooterSelectedRowCount={true}
                  hideFooterPagination={true}
                />
              </div>

              <Box sx={{ textAlign: "right", marginTop: "15px" }}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleActionSubmit}
                >
                  Submit
                </Button>
              </Box>
            </form>
          </div>
        </MainCard>
      </Box>
    </>
  );
};

export default AttendanceView;

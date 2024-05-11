import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import  {profile}  from "../../atoms/authAtoms";
import { useGetAllStudents } from "hooks/useGetAllStudents";
import noDataImg from "../../assets/images/no data found.png";
import { useEffect } from "react";
import {  Grid,TablePagination } from "@mui/material";
import { Modal } from "antd";
import moment from "moment";
import MainCard from "ui-component/cards/MainCard";

const Complain = () => {
  const [profileData, setProfileData] = useRecoilState(profile);
  const [selectedRow, setSelectedRow] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();
  const location = useLocation();
  const options = ["Running", "Completed", "Leave / Placed"];
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [singleStudent, setSingleStudent] = useState({});
  const [additionalState, setAdditionalState] = useState();
  /* eslint-disable */
  const [selectedRows, setSelectedRows] = useState([]);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  //Examination-modal
  const [examinationOpen, setExaminationOpen] = useState(false);
  const examModalOpen = () => {
    setExaminationOpen(true);
  };
  const examModalClose = () => {
    setExaminationOpen(false);
  };

  const { data, refetch } = useGetAllStudents(
    page + 1,
    rowsPerPage,
  );
  console.log("datatata",data);

  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  function fetchSingleStudent() {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}${profileData.company_id}/${selectedStudentId}/student`,
        {
          withCredentials: false,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setSingleStudent(res.data.data.student);
        }
      })
      .catch((err) => {
        return err.response;
      });
  }

  const handleSelectChange = (params, value) => {
    setAddDialogOpen(true);
    setSelectedStudentId(params.id);
    setAdditionalState(value);
  };

  function handleCloseDialog() {
    setAdditionalState("");
    setAddDialogOpen(false);
    fetchSingleStudent();
  }

  async function handleUpdate() {
    const payload = { ...singleStudent, status: additionalState };
    await axios
      .put(
        `${process.env.REACT_APP_API_URL}${profileData.company_id}/${selectedStudentId}/updateStudent`,
        payload
      )
      .then(() => {
        refetch(page + 1, rowsPerPage);
        openNotificationWithIcon(
          "success",
          "Student status updated successfully."
        );
      })
      .catch((error) => {
        openNotificationWithIcon("error", error.response.data.message);
      });
    setAddDialogOpen(false);
  }

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  useEffect(() => {
 
      refetch();
    
  }, [ rowsPerPage, page]);

  const columns = [
    {
      field: "srNo",
      headerName: "Sr No",
      width: 70,
      disableColumnMenu: true,
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "studentName",
      headerName: "Student Name",
      width: 225,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Grid
          style={{
            color: "#5559CE",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: 500,
          }}
        >
          {params.row.studentName}
        </Grid>
      ),
    },
    {
      field: "complain",
      headerName: "Complain",
      width: 500,
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "complainDate",
      headerName: "Complain Date",
      width: 170,
      sortable: false,
      headerAlign: "center",
      align: "center",
    }
  ];

  console.log(data?.students, "tsdjhgfsfdsf");
  const rows = data?.students
    ? data?.students
        .filter((item) => item.complaints) 
        .map((item, index) => ({
          id: item._id,
          srNo: index + 1,
          complain: item.complaints,
          complainDate: moment(item.updated_at).format("YYYY-MM-DD"),
          studentName: (
            <Grid
              style={{ cursor: "pointer", textDecoration: "none" }}
              onClick={() => handleClick(item._id)}
            >
              {item.personal_info?.firstName} {item.personal_info?.lastName}
            </Grid>
          ),
        }))
    : [];
    console.log(rows);
  

  function handleSelectionModelChange(selectionModel) {
    setSelectedRows(selectionModel);
    onSelectRow(selectionModel);
  }

  return (
    <>
      <MainCard>
        <div
          style={{
            width: "100%",
            height: "578px",
            maxHeight: "100%",
          }}
        >
          {rows.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pagination
              pageSize={rowsPerPage}
              onPageChange={handleChangePage}
              rowCount={rows.length}
              disableRowSelectionOnClick
              disableColumnMenu
              onRowSelectionModelChange={handleSelectionModelChange}
              hideFooter={true}
              sx={{
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#ede7f6",
                  fontSize: 14,
                  color: "#262626",
                },
              }}
            />
          ) : (
            <>
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
            </>
          )}
        </div>
        <TablePagination
          rowsPerPageOptions={[10, 20, 50, 100]}
          component="div"
          count={data?.totalStudents}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </MainCard>
    </>
  );
};

export default Complain;

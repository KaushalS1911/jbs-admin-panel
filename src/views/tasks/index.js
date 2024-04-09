import React from "react";
import MainCard from "ui-component/cards/MainCard";
import SecondaryAction from "ui-component/cards/CardSecondaryAction";
import { Button, FormControl, Grid, TextField } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { DataGrid } from "@mui/x-data-grid";
import TablePagination from "@mui/material/TablePagination";
import { useState } from "react";
import { Chip } from "@mui/material";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { profile } from "../../atoms/authAtoms";
import AddTask from "./AddTask";
import { useGetTask } from "hooks/useGetTask";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import noDataImg from "../../assets/images/no data found.png";
import Mainbreadcrumbs from "contants/Mainbreadcrumbs";
import { RestoreFromTrashTwoTone } from "@mui/icons-material";



const getPriorityStyle = (priority) => {
  switch (priority) {
    case "High":
      return {
        backgroundColor: "#F98364",
        color: "#ffffff",
        fontWeight: 800,
        width: "70px",
        borderRadius: "5px",
      };
    case "Low":
      return {
        backgroundColor: "#14CDA2",
        color: "#ffffff",
        fontWeight: 800,
        width: "70px",
        borderRadius: "5px",
      };
    case "Medium":
      return {
        backgroundColor: "#DEDDEF",
        color: "#5559CE",
        fontWeight: 800,
        width: "70px",
        borderRadius: "5px",
      };
    default:
      return { backgroundColor: "", color: "" };
  }
};

const getStatusStyle = (status) => {
  switch (status) {
    case "Open":
      return {
        backgroundColor: "#DEDDEF",
        color: "#5559CE",
        fontWeight: 800,
        width: "80px",
        borderRadius: "5px",
      };
    case "Complate":
      return {
        backgroundColor: "#14CDA2",
        color: "#ffffff",
        fontWeight: 800,
        width: "80px",
        borderRadius: "5px",
      };
    default:
      return {
        backgroundColor: "",
        color: "",
        fontWeight: 800,
        width: "80px",
        borderRadius: "5px",
      };
  }
};

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 70,
    disableColumnMenu: true,
    sortable: false,
    headerAlign: "start",
    align: "start",
    cursor: "pointer",
  },
  {
    field: "assigned",
    headerName: "Assigned",
    width: 150,
    disableColumnMenu: true,
    sortable: false,
    headerAlign: "start",
    align: "start",
  },
  {
    field: "taskTitle",
    headerName: "Task Title",
    width: 225,
    disableColumnMenu: true,
    sortable: false,
    headerAlign: "start",
    align: "start",
  },
  {
    field: "createDate",
    headerName: "Create Date",
    width: 225,
    disableColumnMenu: true,
    sortable: false,
    headerAlign: "start",
    align: "start",
  },
  {
    field: "dueDate",
    headerName: "Due Date",
    width: 225,
    disableColumnMenu: true,
    sortable: false,
    headerAlign: "start",
    align: "start",
  },
  {
    field: "role",
    headerName: "Role",
    width: 150,
    disableColumnMenu: true,
    sortable: false,
    headerAlign: "start",
    align: "start",
  },
  {
    field: "Priority",
    headerName: "Priority",
    width: 150,
    disableColumnMenu: true,
    sortable: false,
    headerAlign: "start",
    align: "start",
    renderCell: (params) => {
      const priorityStyle = getPriorityStyle(params.row.Priority);
      return (
        <Chip label={params.row.Priority} size="small" style={priorityStyle} />
      );
    },
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    disableColumnMenu: true,
    sortable: false,
    headerAlign: "start",
    align: "start",
    renderCell: (params) => {
      const statusStyle = getStatusStyle(params.row.status);
      return (
        <Chip label={params.row.status} size="small" style={statusStyle} />
      );
    },
  },
];

const Index = () => {
  // eslint-disable-next-line
  const [profileData, setProfileData] = useRecoilState(profile);
  const [openAddTaskDialog, setOpenAddTaskDialog] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }
  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }
  const { data: task, refetch } = useGetTask(page + 1, rowsPerPage, searchText);

  useEffect(() => {
    if (searchText !== "") {
      const delayDebounceFn = setTimeout(() => {
        refetch();
      }, 1000);
      return () => clearTimeout(delayDebounceFn);
    } else {
      refetch();
    }
  }, [searchText, page, rowsPerPage]);

  const rows = task
    ? task.tasks.map((item, index) => ({
        id: index + 1,
        assigned: item.fullName,
        createDate: moment(item.create_date).format("YYYY-MM-DD"),
        dueDate: moment(item.due_date).format("YYYY-MM-DD"),
        taskTitle: item.task_title,
        Priority: item.priority,
        status: item.status,
        role: item.role,
        _id: item._id,
      }))
    : [];

  const handleTaskClick = () => {
    setOpenAddTaskDialog(true);
  };

  const handleRowIdlick = (params) => {
    navigate(`/edit-task/${params.row._id}`);
  };

  const handleSelectionModelChange = (selectionModel) => {
    const selectedRowIds = selectionModel
      .map((selectedIndex) => rows[selectedIndex]?._id)
      .filter((id) => id !== undefined);

    setSelectedRows(selectedRowIds);
  };

  const handleDeleteButtonClick = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}${profileData.company_id}/delete/multiple`,
        {
          data: { ids: selectedRows },
        }
      );

      if (response.status === 200) {
        refetch();
        const remainingRows = selectedRows.filter(
          (id) => !rows.find((row) => row._id === id)
        );
        setSelectedRows(remainingRows);

      }
    } catch (error) {
      console.error("Error deleting multiple tasks:", error);
    }
  };

  return (
    <>
      <Mainbreadcrumbs title={"Task"} />
      <MainCard
        secondary={
          <SecondaryAction link="https://next.material-ui.com/system/typography/" />
        }
      >
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
            spacing={2}
            direction="row"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Grid item lg={4} md={12} xs={12} sm={12}>
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
              <Grid  item style={{ marginLeft: "4px" }}>
                {profileData.role === "Admin" && (
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
                    onClick={handleTaskClick}
                    startIcon={
                      <AddCircleOutlineIcon
                        style={{ fontSize: "22px", marginRight: "3px",color: "#5e35b1", }}
                      />
                    }
                  >
                    Add 
                  </Button>
                )}
                {profileData.role === "Admin" && (
                  <>
                    <Button
                      startIcon={
                        <RestoreFromTrashTwoTone
                          style={{
                            fontSize: "22px",
                            marginRight: "px",
                            color: "#fff",
                          }}
                        />
                      }
                      sx={{
                        backgroundColor: "#5559CE",
                        color: "#fff!important",
                        marginRight: "10px",
                        height: "35px",
                        lineHeight: "35px",
                        "&:hover": {
                          color: "#5559CE",
                          backgroundColor: "#5559CE",
                        },
                        "&:disabled": {
                          color: "#5559CE",
                          backgroundColor: "#ede7f6",
                        },
                      }}
                      onClick={handleDeleteButtonClick}
                    >
                     Delete
                    </Button>
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
        </FormControl>
      </MainCard>
      <MainCard sx={{ margin: "20px 0" }}>
        <>
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
                pagination
                pageSize={rowsPerPage}
                disableRowSelectionOnClick
                onPageChange={handleChangePage}
                rowCount={rows.length}
                checkboxSelection
                hideFooter={true}
                onRowSelectionModelChange={handleSelectionModelChange}
                onCellClick={(params) => {
                  if (params.field !== "__check__") {
                    handleRowIdlick(params);
                  }
                }}
                sx={{
                  ".MuiDataGrid-cell:focus": {
                    outline: "none",
                  },
                  "& .MuiDataGrid-row:hover": {
                    cursor: "pointer",
                  },
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "#ede7f6",
                    fontSize: 14,
                    color: "#262626",
                  },
                }}
              />
            </div>
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
                  style={{ maxWidth: "600px",width:'100%' }}
                />
              </div>
            </>
          )}
          <TablePagination
            component="div"
            count={task?.totalData}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[10, 20, 50, 100]}
          />
        </>
        <AddTask
          openAddTaskDialog={openAddTaskDialog}
          setOpenAddTaskDialog={setOpenAddTaskDialog}
          refetch={refetch}
        />
      </MainCard>
    </>
  );
};

export default Index;

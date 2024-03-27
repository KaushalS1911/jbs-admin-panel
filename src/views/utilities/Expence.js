import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TablePagination,
  TextField,
} from "@mui/material";
import Mainbreadcrumbs from "contants/Mainbreadcrumbs";
import React from "react";
import MainCard from "ui-component/cards/MainCard";
import { gridSpacing } from "store/constant";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { Modal, notification } from "antd";
import { useFormik } from "formik";
import { string, object } from "yup";
import "flatpickr/dist/themes/material_green.css";
import { useRecoilState } from "recoil";
import { profile } from "atoms/authAtoms";
import axios from "axios";
import { useEffect } from "react";
import { useGetAllExpenses } from "hooks/useGetAllExpense";
import moment from "moment";
import { deleteAllExpense } from "store/slices/inquiryslice";
import { useDispatch } from "react-redux";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { RestoreFromTrashTwoTone, EditNoteTwoTone } from "@mui/icons-material";

const expenseType = [
  "Rent",
  "Elecricity bill",
  "Salary",
  "Stationary",
  "Maintanance",
  "New Asset purchase",
  "Office expense",
];

export const Expence = () => {
  //notification
  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [profileData, setProfileData] = useRecoilState(profile);
  const { data, refetch } = useGetAllExpenses(
    page + 1,
    rowsPerPage,
    searchText
  );
  const [addModal, setAddModal] = useState(false);
  const [editExpence, setEditExpence] = useState({});
  const [editButton, setEditButton] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentDate, setCurrentDate] = useState(null);

  useEffect(() => {
    refetch();
  }, [page, rowsPerPage, searchText]);
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    setCurrentDate(formattedDate);
  }, []);

  // console.log("data", data);
  const rows = data?.expenses
    ? data?.expenses.map((item, index) => ({
        id: item._id,
        srNo: index + 1,
        type: item.type,
        amount: item.amount,
        company_id: item.company_id,
        createdBy: item.createdBy,
        desc: item.desc,
        date: moment(item.date).format("YYYY-MM-DD"),
      }))
    : [];

  const columns = [
    {
      field: "srNo",
      headerName: "Sr No",
      width: 100,
      sortable: false,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "type",
      headerName: "Type",
      width: 200,
      sortable: false,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "desc",
      headerName: "Description",
      width: 200,
      sortable: false,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 200,
      sortable: false,
      headerAlign: "left",
      align: "left",
    },

    {
      field: "date",
      headerName: "Date",
      width: 180,
      sortable: false,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "action",
      headerName: "Action",
      width: 180,
      headerAlign: "center",
      align: "center",
      renderCell: (item) => (
        <EditNoteTwoTone
          sx={{
            color: "#5559CE",
            cursor: "pointer",
            marginRight: "10px",
            height: "35px",
            lineHeight: "35px",
          }}
          onClick={() => {
            console.log("iet", item);
            setEditExpence(item.row);
            setAddModal(true);
            setEditButton(true);
          }}
        />
      ),
      sortable: false,
    },
  ];

  function handleChangePage(_, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  function expenceform() {
    setAddModal(true);
    setEditExpence("");
    setEditButton(false);
  }
  function handleCloseAddBatchDialog() {
    setAddModal(false);
    formik.handleReset();
  }
  const initialValue = {
    type: editExpence.type || "",
    date: editExpence.date || currentDate,
    amount: editExpence.amount || "",
    desc: editExpence.desc || "",
  };

  const validationSchema = object({
    type: string().required("Type is required"),
    desc: string().required("Descripition is required"),
    amount: string()
      .matches(/^[0-9]/, "Please Enter Number")
      .required("Amount is required"),
  });

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, action) => {
      const payload = {
        date: values.date,
        type: values.type,
        desc: values.desc,
        createdBy: profileData._id,
        amount: values.amount,
        company_id: profileData.company_id,
      };
      try {
        if (editButton == true) {
          console.log("editExpence", editExpence);
          await axios
            .put(
              `${process.env.REACT_APP_API_URL}/${data?.expenses[0].company_id}/${editExpence.id}/update-expense`,
              payload
            )
            .then((res) => {
              openNotificationWithIcon("success", res.data.message);
              action.resetForm();
              setAddModal(false);
              refetch();
            })
            .catch((err) => console.log(err));
        } else {
          await axios
            .post(`${process.env.REACT_APP_API_URL}expense`, payload)
            .then((res) => {
              openNotificationWithIcon("success", res.data.data.message);
              action.resetForm();
              setAddModal(false);
              refetch();
            })
            .catch((err) => console.log(err));
        }
      } catch (error) {
        console.error("Error:", error);
        setAddModal(false);
      }
    },
  });

  const handleSelectionModelChange = (selectionModel) => {
    setSelectedRows(selectionModel);
  };



  const deletedAllExpense = async () => {
    if (selectedRows.length > 0) {
      try {
        const res = await dispatch(
          deleteAllExpense({
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
      <Mainbreadcrumbs title={"Expence"} />
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
            justifyContent="end"
            alignItems="center"
          >
            <Grid
              item
              display={{ xs: "flex", sm: "flex", md: "flex", lg: "flex" }}
              justifyContent={{
                xs: "normal",
                sm: "space-between",
                md: "space-between",
                lg: "flex-end",
              }}
              flexDirection={{
                xs: "column",
                sm: "row",
                md: "row",
                lg: "row",
              }}
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
                    border: "none",
                    lineHeight: "35px",
                    height: "35px",
                    backgroundColor: "#D9DAF9",
                    margin: " 0px 10px 0px 10px ",
                    color: "#5e35b1",
                  }}
                  onClick={expenceform}
                  startIcon={
                    <AddCircleOutlineIcon
                      style={{
                        fontSize: "22px",
                        marginRight: "3px",
                        color: "#5e35b1",
                      }}
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
                  onClick={deletedAllExpense}
                  sx={{
                    backgroundColor: "#5559CE",
                    color: "#fff",
                    marginRight: "10px",
                    height: "35px",
                    lineHeight: "35px",
                    "&:hover": {
                      Color: "#5559CE",
                      backgroundColor: "#5559CE",
                    },
                  }}
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </FormControl>
      </MainCard>
      <MainCard style={{ marginTop: "20px" }}>
        <div style={{ width: "100%",
            height: "570px",
            maxHeight: "100%", }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[10, 15, 25, 50]}
            checkboxSelection
            disableRowSelectionOnClick
            disableColumnMenu
            hideFooter={true}
            headerClassName="custom-header-class"
            onRowSelectionModelChange={handleSelectionModelChange}
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#ede7f6",
                fontSize: 14,
                color: "#262626",
              },
            }}
          />
        </div>
        <TablePagination
          component="div"
          count={data?.total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          backIconButtonProps={{
            "aria-label": "Previous Page",
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page",
          }}
          rowsPerPageOptions={[10, 20, 50, 100]}
        />
      </MainCard>

      <Modal
        open={addModal}
        onCancel={handleCloseAddBatchDialog}
        maskClosable={false}
        footer={false}
        width={300}
        className="Follow_modal"
      >
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <Grid
            container
            spacing={2}
            justifyContent={"flex-end"}
            sx={{
              padding: "20px 10px 10px",
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
            }}
          >
            <Grid item xl={12} lg={12} md={6} sm={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="type">Type</InputLabel>
                <Select
                  labelId="Type"
                  id="type"
                  name="type"
                  InputLabelProps={{
                    style: { color: "#5559CE" },
                  }}
                  label="Type"
                  value={formik?.values?.type}
                  onChange={formik.handleChange}
                >
                  {expenseType.map((option) => (
                    <MenuItem key={option} value={option}>
                      <ListItemText primary={option} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xl={12} lg={12} md={6} sm={6} xs={12}>
              <TextField
                label="Description"
                variant="outlined"
                name="desc"
                value={formik.values?.desc}
                onChange={formik.handleChange}
                multiline
                fullWidth
                InputLabelProps={{
                  style: { color: "#5559CE" },
                }}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
            </Grid>
            <Grid item xl={12} lg={12} md={6} sm={6} xs={12}>
              <TextField
                type="number"
                label="Amount"
                variant="outlined"
                name="amount"
                value={formik.values.amount}
                onChange={formik.handleChange}
                multiline
                fullWidth
                InputLabelProps={{
                  style: { color: "#5559CE" },
                }}
                error={formik.touched.amount && Boolean(formik.errors.amount)}
                helperText={formik.touched.amount && formik.errors.amount}
              />
            </Grid>

            <Grid item xl={12} lg={12} md={6} sm={6} xs={12}>
              <TextField
                type="date"
                variant="outlined"
                name="date"
                value={formik?.values?.date}
                onChange={formik.handleChange}
                fullWidth
                InputLabelProps={{
                  style: { color: "#5559CE" },
                }}
                error={formik.touched.date && Boolean(formik.errors.date)}
                helperText={formik.touched.date && formik.errors.date}
              />
            </Grid>

            <Grid
              item
              xl={12}
              lg={12}
              md={6}
              sm={6}
              xs={12}
              sx={{ textAlign: "right" }}
            >
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#5559CE",
                  color: "#fff",
                  marginRight: "10px",
                  marginTop: "15px",
                  height: "35px",
                  "&:hover": { backgroundColor: "#5559CE" },
                }}
              >
                {editButton ? "Edit" : "Add Expense"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Modal>
    </>
  );
};

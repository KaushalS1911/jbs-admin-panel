

import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TablePagination,
  TextField,
  CircularProgress,
} from "@mui/material";
import Mainbreadcrumbs from "contants/Mainbreadcrumbs";
import React, { useState, useEffect, useCallback } from "react";
import MainCard from "ui-component/cards/MainCard";
import { gridSpacing } from "store/constant";
import { DataGrid } from "@mui/x-data-grid";
import { Modal, notification } from "antd";
import { useFormik } from "formik";
import { string, object } from "yup";
import "flatpickr/dist/themes/material_green.css";
import { useRecoilState } from "recoil";
import { profile } from "atoms/authAtoms";
import axios from "axios";
import { useGetAllExpenses } from "hooks/useGetAllExpense";
import moment from "moment";
import { deleteAllExpense } from "store/slices/inquiryslice";
import { useDispatch, useSelector } from "react-redux";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { RestoreFromTrashTwoTone, EditNoteTwoTone } from "@mui/icons-material";
import { useGetAllconfigs } from "hooks/useGetAllconfigs";

export const Expence = () => {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      },
    },
  };

  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const dispatch = useCallback(useDispatch(), []);
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
  const [loading, setLoading] = useState(false);
  const { data:configs } = useGetAllconfigs();
  const expenses=configs?.expenses;

  useEffect(() => {
    refetch();
  }, [page, rowsPerPage, searchText, refetch]);

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    setCurrentDate(formattedDate);
  }, []);

  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
    });
  };

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

  const expenceForm = () => {
    setAddModal(true);
    setEditExpence("");
    setEditButton(false);
  };

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
    desc: string().required("Description is required"),
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
      setLoading(true);
      try {
        if (editButton) {
          await axios
            .put(
              `${process.env.REACT_APP_API_URL}/${data?.expenses[0].company_id}/${editExpence.id}/update-expense`,
              payload
            )
            .then((res) => {
              openNotificationWithIcon("success", res.data?.message);
              action.resetForm();
              setAddModal(false);
              refetch();
              setLoading(false);
            })
            .catch((err) => console.log(err));
        } else {
          await axios
            .post(`${process.env.REACT_APP_API_URL}expense`, payload)
            .then((res) => {
              openNotificationWithIcon("success", res.data?.data?.message);
              action.resetForm();
              setAddModal(false);
              refetch();
              setLoading(false);
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
        openNotificationWithIcon("success", res.payload?.data?.message);
        refetch();
      } catch (error) {
        console.error("Error deleting inquiries:", error.message);
      }
    }
  };

  return (
    <>
      <Mainbreadcrumbs title={"Expense"} />

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
                  onClick={expenceForm}
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
        <div style={{ width: "100%", height: "570px", maxHeight: "100%" }}>
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
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          count={data?.total || 0}
          onRowsPerPageChange={handleChangeRowsPerPage}
          backIconButtonProps={{
            "aria-label": "Previous Page",
          }}
        />
      </MainCard>

      <Modal
        open={addModal}
        onOk={formik.handleSubmit}
        onCancel={handleCloseAddBatchDialog}
        width={800}
        footer={[
          <Button
            key="submit"
            onClick={formik.handleSubmit}
            sx={{
              height: "40px",
              fontSize: "15px",
              lineHeight: "28px",
              backgroundColor: "#5559CE",
              color: "#fff",
              padding: "0px 30px",
              "&:hover": {
                backgroundColor: "#5559CE",
                color: "#fff",
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "#fff" }} />
            ) : (
              "Submit"
            )}
          </Button>,
        ]}
      >
        <form onSubmit={formik.handleSubmit}>
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
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="type">Type</InputLabel>
                <Select
                  labelId="Type"
                  id="type"
                  label="Type"
                  name="type"
                  MenuProps={MenuProps}
                  fullWidth
                  inputlabelprops={{
                    style: { color: "#5559CE" },
                  }}
                  value={formik?.values?.type}
                  onChange={formik.handleChange}
                >
                  {expenses &&
                    expenses?.length !== 0 &&
                    expenses.map((e) => {
                      return <MenuItem value={e}>{e}</MenuItem>;
                    })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="desc"
                name="desc"
                label="Description"
                InputProps={{
                  style: { color: "#5559CE" },
                }}
                value={formik.values.desc}
                onChange={formik.handleChange}
                error={formik.touched.desc && Boolean(formik.errors.desc)}
                helperText={formik.touched.desc && formik.errors.desc}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="amount"
                name="amount"
                label="Amount"
                inputlabelprops={{
                  style: { color: "#5559CE" },
                }}
                value={formik.values.amount}
                onChange={formik.handleChange}
                error={formik.touched.amount && Boolean(formik.errors.amount)}
                helperText={formik.touched.amount && formik.errors.amount}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="date"
                name="date"
                inputlabelprops={{
                  style: { color: "#5559CE" },
                }}
                label="Date"
                type="date"
                value={formik.values.date}
                onChange={formik.handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
        </form>
      </Modal>
    </>
  );
};

export default Expence;

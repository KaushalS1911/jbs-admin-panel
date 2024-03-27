import React, { useEffect } from "react";
import { Button, FormControl, Grid } from "@mui/material";
import AddGuardianinfo from "./AddGuardianinfo";
import { Modal, notification } from "antd";
import { useState } from "react";
import EditGuardianinfo from "./EditGuardianinfo";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import ConfirmationDialog from "Extracomponent/ConfirmationDialog";
import { useParams } from "react-router-dom";
import { useGetSingleStudent } from "../../../hooks/useGetSingleStudent";

const GuardianInfo = ({ studentData }) => {
  //notification
  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  //add model open
  const [addOpen, setAddOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [guardianId, setguardianId] = useState();
  const { studentId, companyId } = useParams();
  const [editOpen, setEditOpen] = useState(false);
  const [guardianData, setGuardianData] = useState({});

  const { data, refetch } = useGetSingleStudent(studentId);

  useEffect(() => {
    refetch();
  }, []);

  const guardianAddModal = () => {
    setAddOpen(true);
  };

  const guardianAddCancel = () => {
    setAddOpen(false);
  };

  //edit model open

  const guardianCancel = () => {
    setEditOpen(false);
  };

  function handleguardian(params) {
    setGuardianData(params);
    setguardianId(params.rowId);
    setEditOpen(true);
  }

  // delete model

  const handleOpenDialog = (id) => {
    setguardianId(id);
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    const apiEndpoint = `${process.env.REACT_APP_API_URL}/${companyId}/${studentId}/${guardianId}/deleteGuardian`;
    try {
      const response = await axios.delete(apiEndpoint);
      if (response.status === 200) {
        handleCloseDialog();
        openNotificationWithIcon("success", response.data.data.message); 
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    } 
  }
  

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
      disableColumnMenu: true,
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "relation_type",
      headerName: "Relation type",
      width: 300,
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "firstName",
      headerName: "First Name",
      width: 300,
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 300,
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "contact",
      headerName: "Contact",
      width: 300,
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "action",
      headerName: "Action",
      width: 225,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                handleguardian(params.row);
              }}
              sx={{
                backgroundColor: "#5559CE",
                color: "#fff",
                marginRight: "10px",
                height: "35px",
                lineHeight: "35px",
                "&:hover": { Color: "#5559CE", backgroundColor: "#5559CE" },
              }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                handleOpenDialog(params.row.rowId);
              }}
              sx={{
                backgroundColor: "#FF0000",
                color: "#fff",
                height: "35px",
                lineHeight: "35px",
                "&:hover": { Color: "#fff", backgroundColor: "#FF0000" },
              }}
            >
              Delete
            </Button>
            <ConfirmationDialog
              open={open}
              handleClose={handleCloseDialog}
              title={"Batch"}
              handleDelete={handleDelete}
            />
          </div>
        );
      },
    },
  ];

  const rows = data
    ? data.guardian_info.map((item, index) => {
        return {
          rowId: item._id,
          id: index + 1,
          relation_type: item.relation_type,
          firstName: item.firstName,
          lastName: item.lastName,
          contact: item.contact,
        };
      })
    : [];

  return (
    <>
      <div className="form-outer">
        <form action="">
          <FormControl
            defaultValue=""
            required
            sx={{
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
            size="small"
          >
            <Grid container spacing={2} sx={{ padding: "20px 30px " }}>
              <React.Fragment>
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    onClick={guardianAddModal}
                    style={{ float: "right" }}
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
                    Add Guardian
                  </Button>
                </Grid>
                <Modal
                  visible={addOpen}
                  onCancel={guardianAddCancel}
                  maskClosable={false}
                  footer={false}
                  width={300}
                  className="Follow_modal"
                >
                  <AddGuardianinfo studentData={studentData} />
                </Modal>
              </React.Fragment>
            </Grid>
          </FormControl>
        </form>
      </div>
      <div>
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
            rowCount={rows.length}
            checkboxSelection
            disableRowSelectionOnClick
            disableColumnMenu
            hideFooter={true}
          />
        </div>

        <Modal
          open={editOpen}
          onCancel={guardianCancel}
          maskClosable={false}
          footer={false}
          width={300}
          className="Follow_modal"
        >
          <EditGuardianinfo
            guardianData={guardianData}
            refetch={refetch}
            guardianCancel={guardianCancel}
          />
        </Modal>
      </div>
    </>
  );
};

export default GuardianInfo;

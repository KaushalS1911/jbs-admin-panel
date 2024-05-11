import React from "react";
import moment from "moment";
import { DataGrid } from "@mui/x-data-grid";
import noDataImg from "../../../assets/images/no data found.png";

const Examination = ({ examination }) => {
   
  const rows = examination
    ? examination.map((item, index) => ({
        id: item?._id,
        srNo: index + 1,
        conducted_by: item?.conducted_by,
        obtained_marks: item?.obtained_marks,
        title: item?.title,
        desc:item?.desc,
        total_marks: item?.total_marks,
        examinationDate: moment(item.date).format("YYYY-MM-DD"),
      }))
    : [];

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
      field: "title",
      headerName: "Title",
      width: 300,
      disableColumnMenu: true,
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "conducted_by",
      headerName: "Conducted By",
      width: 300,
      disableColumnMenu: true,
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "examinationDate",
      headerName: "Date",
      width: 200,
      disableColumnMenu: true,
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "obtained_marks",
      headerName: "Obtaine Marks",
      width: 150,
      disableColumnMenu: true,
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "total_marks",
      headerName: "Total Marks",
      width: 150,
      disableColumnMenu: true,
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "desc",
      headerName: "Descripition",
      width: 400,
      disableColumnMenu: true,
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
  ];
  return (
    <>
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
            rowCount={rows.length}
            disableRowSelectionOnClick
            disableColumnMenu
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
    </>
  );
};

export default Examination;

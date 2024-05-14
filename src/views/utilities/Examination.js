import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Mainbreadcrumbs from "contants/Mainbreadcrumbs";

const Examination = () => {
  const [examData, setExamData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchDemo = async () => {
    const apiEndpoint = `${process.env.REACT_APP_API_URL}${user.company_id}/student?limit=${rowsPerPage}&page=${page + 1}`;
    try {
      const response = await axios.get(apiEndpoint);
      setExamData(response.data.data.students);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDemo();
  }, [page, rowsPerPage]);

  const examTitles = [
    ...new Set(
      examData.map((s) => s.exam_info.map((info) => info.title)).flat()
    ),
  ];

  return (
    <>
      <Mainbreadcrumbs title={"Examination"} />
      <TableContainer
        component={Paper}
        sx={{
          minWidth: 650,
          minHeight: 650,
          maxHeight: 500,
          width: "100%",
          overflowY: "scroll",
        }}
      >
        <Table
          sx={{
            "& .MuiTableCell-sizeMedium": {
              padding: "10px",
            },
          }}
        >
          <TableHead
            style={{
              backgroundColor: "#ede7f6",
              position: "sticky",
              top: 0,
              zIndex: 1,
            }}
          >
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Exam Title</TableCell>
              <TableCell>Students</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Conduct</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {examTitles.map((title, index) => {
              const studentsWithSameExamTitle = examData.filter((student) =>
                student.exam_info.some((info) => info.title === title)
              );
              return studentsWithSameExamTitle.map((student, studentIndex) => (
                <TableRow key={student.id}>
                  {studentIndex === 0 && (
                    <TableCell rowSpan={studentsWithSameExamTitle.length}>
                      {index + 1}
                    </TableCell>
                  )}
                  {studentIndex === 0 && (
                    <TableCell rowSpan={studentsWithSameExamTitle.length}>
                      {title}
                    </TableCell>
                  )}
                  <TableCell>{student.personal_info.firstName}</TableCell>
                  <TableCell>{student.personal_info.course}</TableCell>
                  <TableCell>
                    {student.exam_info
                      .filter((info) => info.title === title)
                      .map((info) => info.conducted_by)
                      .join(", ")}
                  </TableCell>
                </TableRow>
              ));
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Examination;

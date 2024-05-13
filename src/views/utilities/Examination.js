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
  const [examData, setexamData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchDemo = async () => {
    const apiEndpoint = `${process.env.REACT_APP_API_URL}${user.company_id}/student?limit=${rowsPerPage}&page=${page + 1}`;
    try {
      const response = await axios.get(apiEndpoint);
      setexamData(response.data.data.students);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDemo();
  }, [page, rowsPerPage]);

  const flattenArray = (arr) => {
    return arr.reduce(
      (acc, val) =>
        Array.isArray(val) ? acc.concat(flattenArray(val)) : acc.concat(val),
      []
    );
  };

  const filterStudentsByExamTitle = (examTitle) => {
    return examData.filter((student) => {
      const studentExamTitles = student.exam_info.map((info) => info.title);
      return studentExamTitles.includes(examTitle);
    });
  };

  const examTitles = [
    ...new Set(
      flattenArray(examData.map((s) => s.exam_info.map((info) => info.title)))
    ),
  ];

  return (
    <>
      <Mainbreadcrumbs title={"Examination"} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Exam Title</TableCell>
              <TableCell>Students</TableCell>
              <TableCell>Course</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {examTitles.map((title, index) => {
              const studentsWithSameExamTitle =
                filterStudentsByExamTitle(title);
              return (
                <React.Fragment key={title}>
                  {studentsWithSameExamTitle.map((student, studentIndex) => (
                    <TableRow key={student.id}>
                      {studentIndex === 0 && (
                        <TableCell rowSpan={studentsWithSameExamTitle.length} sx={{padding:"6px"}}>
                          {index + 1}
                        </TableCell>
                      )}
                      {studentIndex === 0 && (
                        <TableCell rowSpan={studentsWithSameExamTitle.length} sx={{padding:"6px"}}>
                          {title}
                        </TableCell>
                      )}
                      <TableCell sx={{padding:"6px"}} >{student.personal_info.firstName}</TableCell>
                      <TableCell sx={{padding:"6px"}}>{student.personal_info.course}</TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Examination;

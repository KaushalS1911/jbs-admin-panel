import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TablePagination from '@mui/material/TablePagination'
import Paper from '@mui/material/Paper'
import moment from 'moment'
import { showInquiry } from 'store/slices/inquiryslice'
import { useQuery } from 'react-query'
import axios from 'axios';

const user = JSON.parse(localStorage.getItem('user'))

export const useGetAllStudents = (page, perPage) => {
    return useQuery(['companies'], async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}${user.company_id}/inquiry?page=${page}&perPage=${perPage}`, {
          withCredentials: false
        });
  
        if (response.status === 200) {
          return response.data.data.students;
        }
      } catch (error) {
        throw error.response || error;
      }
    });
  }

function createData(inquiry) {
  return inquiry.map((item, index) => ({
    rowId: item._id,
    id: index + 1,
    studentName: `${item.firstName} ${item.lastName}`,
    technology: item.interested_in,
    appointment: moment(item.created_at).format('DD-MM-YYYY'),
    contactNo: item.contact,
    email: item.email,
    follow: 'Set Demo'
  }))
}

export default function Example() {
  const dispatch = useDispatch()
  const inquiry = useSelector((state) => state.inquiry)
  const { data, isLoading, isError } = useGetAllStudents(1, 5)

  useEffect(() => {
    if (!isLoading && !isError) {
      dispatch(showInquiry(data))
    }
  }, [data, isLoading, isError, dispatch])

  const rows = Array.isArray(inquiry.inquiry) ? createData(inquiry.inquiry) : []

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <Paper>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Sr</TableCell>
              <TableCell align="right">Student Name</TableCell>
              <TableCell align="right">Technology</TableCell>
              <TableCell align="right">Appointment</TableCell>
              <TableCell align="right">Contact No</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Follow Up</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0 ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows).map((row) => (
              <TableRow key={row.rowId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.studentName}</TableCell>
                <TableCell align="right">{row.technology}</TableCell>
                <TableCell align="right">{row.appointment}</TableCell>
                <TableCell align="right">{row.contactNo}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.follow}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 20]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        backIconButtonProps={{
          'aria-label': 'Previous Page'
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page'
        }}
      />
    </Paper>
  )
}

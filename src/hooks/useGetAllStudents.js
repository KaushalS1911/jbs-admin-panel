// import { useQuery } from 'react-query'
// import axios from 'axios'

// const user = JSON.parse(localStorage.getItem("user"))
// export const useGetAllStudents = ( page, perPage,searchText) => {
//   return useQuery(['companies'], async () => {
//     const apiUrl = `${process.env.REACT_APP_API_URL}${user.company_id}/student?page=${page}&limit=${perPage}&searchKey=${searchText}`;
//     return axios
//     .get(apiUrl, {
//       withCredentials: false,
//     })
//     .then((res) => {
//         console.log(res);
//         if (res.status === 200) {
//           return res.data.data;
//         }
//       })
//       .catch((err) => {
//         return err.response;
//       });
//   })
// }
import { useQuery } from "react-query";
import axios from "axios";

const user = JSON.parse(localStorage.getItem("user"));

export const useGetAllStudents = (page, perPage, searchText) => {
  return useQuery(["companies"], async () => {
    const apiUrl =
      `${process.env.REACT_APP_API_URL}${user?.company_id}/student` +
      (searchText
        ? `?page=${page}&limit=${perPage}&searchKey=${searchText}`
        : "");

    return axios
      .get(apiUrl, {
        withCredentials: false,
      })
      .then((res) => {
        if (res.status === 200) {
          return res.data.data;
        }
      })
      .catch((err) => {
        return err.response;
      });
  });
};

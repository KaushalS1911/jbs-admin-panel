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
    return useQuery(["students"], async () => {
        let apiUrl = `${process.env.REACT_APP_API_URL}`;
        if (user && user.company_id) {
            apiUrl += `/${user.company_id}/student`;
        }

        if (searchText) {
            apiUrl += `?page=${page}&limit=${perPage}&searchKey=${searchText}`;
        } else if (page && perPage) {
            apiUrl += `?page=${page}&limit=${perPage}`;
        }

        try {
            const response = await axios.get(apiUrl, { withCredentials: false });
            if (response.status === 200) {
                return response.data.data;
            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
            throw new Error('Failed to fetch data: ' + error.message);
        }
    });
};

import { useQuery } from 'react-query';
import axios from 'axios';


const user = JSON.parse(localStorage.getItem('user'));
export const useGetAllInquiries = (page, perPage, searchText) => {

  return useQuery(['inquiries'], async () => {
    const url = searchText.trim() !== '' ? `${process.env.REACT_APP_API_URL}${user.company_id}/inquiry?page=${page}&limit=${perPage}&searchKey=${searchText}`: `${process.env.REACT_APP_API_URL}${user.company_id}/inquiry?page=${page}&limit=${perPage}`
    return axios
      .get(url, {
        withCredentials: false
      })
      .then((res) => {
        if (res.status === 200) {
          return res.data.data;
        }
      })
      .catch((err) => {
        return err.response
      })
  })
}




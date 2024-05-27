import { useQuery } from "react-query";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { profile } from "../atoms/authAtoms";

export const useGetAllStudents = (page, perPage, searchText) => {
  const user = useRecoilValue(profile);

  return useQuery(["students", page, perPage, searchText], async () => {
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
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      throw new Error("Failed to fetch data: " + error.message);
    }
  });
};

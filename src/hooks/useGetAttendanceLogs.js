import { useQuery } from "react-query";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { profile } from "../atoms/authAtoms";

export const useGetAttendanceLogs = (date, type) => {
  const user = useRecoilValue(profile);
  return useQuery(["attendance-logs"], async () => {
    if (date && type) {
      const apiUrl = `${process.env.REACT_APP_API_URL}${user.company_id}/attendance/logs?date=${date}&type=${type}`;
      return axios
        .get(apiUrl, {
          withCredentials: false,
        })
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data);
            return res.data;
          }
        })
        .catch((err) => {
          return err.response;
        });
    }
  });
};

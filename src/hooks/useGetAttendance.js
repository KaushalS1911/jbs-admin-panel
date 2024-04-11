import {useQuery} from "react-query";
import axios from "axios";

const user = JSON.parse(localStorage.getItem("user"));
export const useGetAllAttendance = (page, perPage, student, startDate, endDate) => {

    return useQuery(["attendance"], async () => {
        if (startDate && endDate) {

            const url =`${process.env.REACT_APP_API_URL}${user.company_id}/attendance?student=${student}&page=${page}&limit=${perPage}&startDate=${startDate}&endDate=${endDate}`;
            return axios
                .get(url, {
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
        }
    });
};

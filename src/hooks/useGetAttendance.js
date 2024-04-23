import {useQuery} from "react-query";
import axios from "axios";
import {useRecoilValue} from "recoil";
import {profile} from "../atoms/authAtoms";

export const useGetAllAttendance = (page, perPage, student, startDate, endDate) => {
    const user = useRecoilValue(profile)
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

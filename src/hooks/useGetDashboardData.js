import { useQuery } from "react-query";
import axios from "axios";

const user = JSON.parse(localStorage.getItem("user"));
export const useGetDashboardData = () => {
    return useQuery(["dashboard"], async () => {
        const url = `${process.env.REACT_APP_API_URL}${user.company_id}/dashboard`;
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
    });
};
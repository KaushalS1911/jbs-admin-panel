import { useQuery } from "react-query";
import axios from "axios";
import {useRecoilValue} from "recoil";
import {profile} from "../atoms/authAtoms";

export const useGetCompanyDetails = () => {
    const user = useRecoilValue(profile)
    return useQuery(["company-details"], async () => {
        const url = `${process.env.REACT_APP_API_URL}${user?.company_id}`;
        return axios
            .get(url, {
                withCredentials: false,
            })
            .then((res) => {
                if (res.status === 200) {
                    return res.data;
                }
            })
            .catch((err) => {
                return err.response;
            });
    });
};
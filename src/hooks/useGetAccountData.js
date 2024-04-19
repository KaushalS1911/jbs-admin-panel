import { useQuery } from 'react-query'
import axios from 'axios'
import { useRecoilValue } from 'recoil';
import { profile } from '../atoms/authAtoms';
import moment from "moment";


export const useGetAccountData = () => {
    const user = useRecoilValue(profile)
    return useQuery(['account'], async () => {
            const today = moment();
            const startDate = today.startOf('month').format("YYYY-MM-DD");
            const endDate = today.endOf('month').format("YYYY-MM-DD");

            const apiUrl = `${process.env.REACT_APP_API_URL}${user?.company_id}/account?startDate=${startDate}&endDate=${endDate}`;
            return axios
                .get(apiUrl, {
                    withCredentials: false,
                })
                .then((res) => {
                    if (res.status === 200) {
                        return res.data.data.data
                    }
                })
                .catch((err) => {
                    return err.response
                })
    })
}

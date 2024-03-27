import { useQuery } from 'react-query'
import axios from 'axios'
import { useRecoilValue } from 'recoil';
import { profile } from '../atoms/authAtoms';
export const useGetTask = (page, perPage, searchText) => {
    const user = useRecoilValue(profile)
    return useQuery(['task'], async () => {
        const searchParam = searchText ? `&searchKey=${searchText}` : '';
        const apiUrl = `${process.env.REACT_APP_API_URL}${user.company_id}/${user._id}/task?page=${page}&limit=${perPage}${searchParam}`;
        return axios
            .get(apiUrl, {
                withCredentials: false,
            })
            .then((res) => {
                if (res.status === 200) {
                    return res.data.data
                }
            })
            .catch((err) => {
                return err.response
            })
    })
}
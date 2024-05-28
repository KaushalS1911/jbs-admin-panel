import { useQuery } from 'react-query'
import axios from 'axios'
import {useRecoilValue} from "recoil";
import {profile} from "../atoms/authAtoms";


export const useGetAllconfigs = ( ) => {
  const user = useRecoilValue(profile)
  return useQuery(['configs'], async () => {
    const url = `${process.env.REACT_APP_API_URL}${user.company_id}/configs`
    return axios
      .get(url, {
        withCredentials: false,
      })
      .then((res) => {
        if (res.status === 200) {
          return res.data.data.data[0]
        }
      })
      .catch((err) => {
        return err.response
      })
  })
}

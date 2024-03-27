import { useQuery } from 'react-query'
import axios from 'axios'
import { useRecoilState } from 'recoil'
import { profile } from '../atoms/authAtoms'


export const useGetSingleStudent = (id) => {
  /* eslint-disable */
  const [profileData, setProfileData] = useRecoilState(profile)
  return useQuery(['student'], async () => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}${profileData.company_id}/${id}/student`, {
        withCredentials: false,
      })
      .then((res) => {
        if (res.status === 200) {
          return res.data.data.student
        }
      })
      .catch((err) => {
        return err.response
      })
  })
}
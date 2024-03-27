import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import axios from '../helpers/axios';
import { profile } from '../atoms/authAtoms';

export const useLogout = () => {
  let navigate = useNavigate()

  // eslint-disable-next-line
  const [profileData, setProfileData] = useRecoilState(profile)

  return useMutation(async () => {
    return axios
      .post('/api/logout', {
        id: profileData._id,
        withCredentials: false,
      })
      .then((res) => {
        if (res.status === 200) {
          setProfileData({})
          navigate('/login', { replace: true })
        }
      })
      .catch((err) => {
        console.log(err.response)
      })
  })
}

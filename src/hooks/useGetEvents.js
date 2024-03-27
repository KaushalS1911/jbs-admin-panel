import axios from 'axios';
import moment from 'moment';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { profile } from '../atoms/authAtoms';
export const useGetEvents = () => {
  const user = useRecoilValue(profile)
  return useQuery(['events'], async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}${user.company_id}/event`);
      if (response.status === 200) {
        return response.data.map((event) => {
          const formattedStartDate = moment(event.startDate).format('HH:mm:ss');
          const formattedEndDate = moment(event.endDate).format('HH:mm:ss');
          return {
            title: event.event,
            start: moment(event.startDate).format('YYYY-MM-DD'),
            end: moment(event.endDate).format('YYYY-MM-DD'),
            id: event._id,
            event_user_id: event.event_user_id,
            leave_description: event.leave_description,
            leave_type: event.leave_type,
            leave_startTime: formattedStartDate,
            leave_endTime: formattedEndDate,
            leave_status:event.leave_status,
            denied_reason:event.denied_reason
          };
        });
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  });
};


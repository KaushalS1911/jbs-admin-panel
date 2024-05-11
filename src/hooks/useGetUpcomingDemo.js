import { useQuery } from "react-query";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { profile } from "../atoms/authAtoms";

export const useGetUpcomingDemo = () => {
  const user = useRecoilValue(profile);
  return useQuery(["upcoming-demo"], async () => {
    const apiEndpoint = `${process.env.REACT_APP_API_URL}${user?.company_id}/demo`;
    try {
      const response = await axios.get(apiEndpoint);
      const entries = response.data?.data?.data
        .map((item) => {
          const entry = item.entries;
          const firstName = item.fullName;
          const single = entry.map((res) => {
            const singleData = { ...res, firstName };
            return singleData;
          });
          return single;
        })
        .flat();
      return entries;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  });
};

import { useQuery } from "react-query";
import axios from "axios";

const user = JSON.parse(localStorage.getItem("user"));
export const useGetUpcomingDemo= () => {
    return useQuery(["upcoming-demo"], async () => {
        const apiEndpoint = `${process.env.REACT_APP_API_URL}${user.company_id}/demo`;
        try {
            const response = await axios.get(apiEndpoint);
            const entries = response.data.data.data
                .map((item) => item.entries)
                .flat();
            return entries
        } catch (error) {
            console.error("Error fetching data:", error);
        };
    });
};
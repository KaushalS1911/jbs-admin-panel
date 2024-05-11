import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useGetSingleStudent } from '../../hooks/useGetSingleStudent';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PersonalInfo from './Tabs/PersonalInfo';
import MainCard from 'ui-component/cards/MainCard';
import StudentAvater from './StudentAvater';
import GuardianInfo from './Tabs/GuardianInfo';
import FeesInfo from './Tabs/FeesInfo';
import AddressInfo from './Tabs/AddressInfo';
import Mainbreadcrumbs from 'contants/Mainbreadcrumbs';
import AttendanceInfo from './Studentmodel/AttendanceInfo';
import StudentDetail from './utils/StudentDetail';

function EditStudent() {
  const { studentId } = useParams();
  const data1 = localStorage.getItem("user");
  const { role } = JSON.parse(data1);
  const [value, setValue] = React.useState('1');
  const { data, refetch } = useGetSingleStudent(studentId);
  
  useEffect(() => {
    refetch();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <>
      <Mainbreadcrumbs title={"Student"} subtitle={"Edit Student"} />
      <StudentAvater />
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <MainCard>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Personal Details" value="1" />
                <Tab label="Address Details" value="2" />
                <Tab label="Guardian Details" value="3" />
                <Tab label="Fee Details" value="4" />
                <Tab label="Attendance" value="5" />
                <Tab label="Progress" value="6" />
              </TabList>
            </Box>

            <TabPanel value="1">
              <PersonalInfo
                formData={data?.personal_info}
                studentData={data}
                refetch={refetch}
              />
            </TabPanel>
            <TabPanel value="2">
              <AddressInfo
                formData={data?.address_info}
                studentData={data}
                refetch={refetch}
              />
            </TabPanel>
            <TabPanel value="3">
              <GuardianInfo formData={data?.guardian_info} studentData={data} />
            </TabPanel>
            <TabPanel value="4">
              <FeesInfo
                formData={data?.fees_info}
                studentData={data}
                refetch={refetch}
              />
            </TabPanel>
            <TabPanel value="5">
              <AttendanceInfo formData={data} refetch={refetch} />
            </TabPanel>
            <TabPanel value="6">
              <StudentDetail course={data?.personal_info?.course} refetch={refetch} />
            </TabPanel>
          </MainCard>
        </TabContext>
      </Box>
    </>
  );
}

export default EditStudent;

import { Route, Routes as Routers } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Dashboard from "../views/dashboard/Default";
import Inquiry from "../views/utilities/Inquiry";
import Student from "../views/utilities/Student";
import Account from "../views/utilities/Account";
import Demo from "../views/utilities/Demo";
import Fees from "../views/utilities/Fees";
import Seminar from "../views/utilities/Seminar";
import Calendar from "../views/utilities/Calendar";
import Attendance from "../views/utilities/Attendance";
import Login3 from "../views/pages/authentication/authentication3/Login3";
import PrivateRoutes from "./PrivateRoutes";
import Inquiryform from "views/inquiry/Inquiryform";
import InquiryEdit from "views/inquiry/InquiryEdit";
import Batches from "views/utilities/Batches";
import CreateStudentStepByStep from "../views/Student/CreateStudentStepByStep";
import EditStudent from "../views/Student/EditStudent";
import Employee from "views/Employee/Employee";
import EmployeeAdd from "views/Employee/EmployeeAdd";
import FeeDetailsPage from "../views/Fees/FeeDetailsPage";
import Editemployee from "../views/Employee/Editemployee";
import BatchView from "views/Batches/BatchView ";
import EditTaskView from "../views/tasks/EditTaskView";
import Task from "../views/utilities/Task";
import { Expence } from "views/utilities/Expence";
import FullStackStepper from "../views/Student/utils/StudentDetail";
import Setting from "views/Setting/Setting";
import EditAdminProfile from "views/Setting/EditAdminProfile";
import EditCompanyProfile from "views/Setting/EditCompanyProfile";
import Expenses from "views/Setting/Expenses";
import Register from "views/pages/authentication/authentication3/Register3";
import NotFound from "views/utilities/NotFound ";
import Roles from "../views/Setting/Roles";
import Course from "../views/Setting/Course";
import Classrooms from "../views/Setting/Classrooms";
import DeveloperOptions from "../views/Setting/DeveloperOptions";
import EmpRoles from "../views/Setting/EmpRoles";
import Invite from "views/Setting/Invite";

const Routes = () => {



  return (
    <Routers>
      <Route element={<PrivateRoutes />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} exact />
          {/*Inquiry routes*/}
          <Route path="/inquiry" element={<Inquiry />} exact />
          <Route path="/add-inquiry" element={<Inquiryform />} exact />
          <Route path="/edit-inquiry/:id" element={<InquiryEdit />} exact />

          {/*Student routes*/}
          <Route path="/student" element={<Student />} exact />
          <Route
            path="/company/:companyId/add-student"
            element={<CreateStudentStepByStep />}
            exact
          />
          <Route
            path="/company/:companyId/edit-student/:studentId"
            element={<EditStudent />}
            exact
          />
          <Route
            path="/company/:companyId/student-details/:studentId"
            element={<FullStackStepper />}
            exact
          />

          {/*Batches route*/}
          <Route path="/batches" element={<Batches />} exact />
          <Route path="/batch-student/:id" element={<BatchView />} exact />

          {/*Employee routes*/}
          <Route path="/employee" element={<Employee />} exact />
          <Route path="/add-employee" element={<EmployeeAdd />} exact />
          <Route path="/edit-employee/:id" element={<Editemployee />} exact />

          {/*Calender routes*/}
          <Route path="/calendar" element={<Calendar />} exact />

          {/*Task routes*/}
          <Route path="/task" element={<Task />} exact />
          <Route path="/edit-task/:id" element={<EditTaskView />} exact />

          {/*Account routes*/}
          <Route path="/account" element={<Account />} exact />

          {/*Demo routes*/}
          <Route path="/demo" element={<Demo />} exact />

          {/*Fees routes*/}
          <Route path="/fees" element={<Fees />} exact />
          <Route
            path="/fee-details/:studentId"
            element={<FeeDetailsPage />}
            exact
          />

          {/*Seminar details*/}
          <Route path="/seminar" element={<Seminar />} exact />

          {/*Attendance routes*/}
          <Route path="/attendance" element={<Attendance />} exact />

          {/* Expence routes*/}
          <Route path="/expense" element={<Expence />} exact />

          {/* Setting Route */}
          <Route path="/settings" element={<Setting />} exact />
          <Route path="/my-profile" element={<EditAdminProfile />} exact />
          <Route
            path="/settings/company-profile-config"
            element={<EditCompanyProfile />}
            exact
          />
          <Route path="/settings/expenses" element={<Expenses />} exact />
          <Route
            path="/settings/expenses-config"
            element={<Expenses />}
            exact
          />
          <Route path="/settings/role-config" element={<Roles />} exact />
          <Route path="/settings/course-config" element={<Course />} exact />
          <Route
            path="/settings/classroom-config"
            element={<Classrooms />}
            exact
          />
          <Route
            path="/settings/emp-roles-config"
            element={<EmpRoles />}
            exact
          />
          <Route
            path="/settings/developer-options-config"
            element={<DeveloperOptions />}
            exact
          />
        </Route>
      </Route>
      <Route path="/login" element={<Login3 />} />
      <Route path="/register" element={<Register />} />
      <Route path="/invite" element={<Invite />} exact />
      <Route path="*" element={<NotFound />} />
    </Routers>
  );
};

export default Routes;

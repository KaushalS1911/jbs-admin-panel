import { lazy } from "react";

// project imports
import MainLayout from "layout/MainLayout";
import Loadable from "ui-component/Loadable";

// dashboard routing
const DashboardDefault = Loadable(
  lazy(() => import("views/utilities/Dashboard.js"))
);
const UtilsInquiry = Loadable(lazy(() => import("views/utilities/Inquiry.js")));
const UtilsStudent = Loadable(lazy(() => import("views/utilities/Student.js")));
const UtilsStaff = Loadable(lazy(() => import("views/utilities/Staff.js")));
const UtilsViewStaff = Loadable(
  lazy(() => import("views/utilities/Staffview.js"))
);
const UtilsAccount = Loadable(lazy(() => import("views/utilities/Account.js")));
const UtilsLab = Loadable(lazy(() => import("views/utilities/Lab.js")));
const UtilsFees = Loadable(lazy(() => import("views/utilities/Fees.js")));
const UtilsDemo = Loadable(lazy(() => import("views/utilities/Demo.js")));
const UtilsAttendance = Loadable(
  lazy(() => import("views/utilities/Attendance"))
);
const UtilsReviews = Loadable(lazy(() => import("views/utilities/Seminar.js")));
const UtilsEditStaff = Loadable(
  lazy(() => import("views/Employee/Editemployee"))
);
const UtilsInquiryForm = Loadable(
  lazy(() => import("views/inquiry/Inquiryform"))
);
const UtilsInquiryModify = Loadable(
  lazy(() => import("views/inquiry/Inquirymodify"))
);

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    { path: "Dashboard", element: <DashboardDefault /> },
    { path: "Inquiry", element: <UtilsInquiry /> },
    { path: "inquiryadd", element: <UtilsInquiryForm /> },
    { path: "InquiryEdit/:id", element: <UtilsInquiryModify /> },
    { path: "Student", element: <UtilsStudent /> },
    { path: "employee", element: <UtilsStaff /> },
    { path: "Staff/:id", element: <UtilsViewStaff /> },
    { path: "Staffedit/:id", element: <UtilsEditStaff /> },
    { path: "Account", element: <UtilsAccount /> },
    { path: "Lab", element: <UtilsLab /> },
    { path: "Fees", element: <UtilsFees /> },
    { path: "Demo", element: <UtilsDemo /> },
    { path: "Attendance", element: <UtilsAttendance /> },
    { path: "Reviews", element: <UtilsReviews /> },
  ],
};

export default MainRoutes;

import Person4Icon from '@mui/icons-material/Person4';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined';
import ReceiptIcon from '@mui/icons-material/Receipt';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import ReviewsIcon from '@mui/icons-material/Reviews';
import ReduceCapacityIcon from '@mui/icons-material/ReduceCapacity';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import GradingIcon from '@mui/icons-material/Grading';
import AddTaskIcon from '@mui/icons-material/AddTask';

const icons = {
    DashboardIcon,
    CalendarTodayIcon,
    Person4Icon,
    Diversity3Icon,
    ReduceCapacityIcon,
    AccountBalanceIcon,
    MeetingRoomOutlinedIcon,
    ReceiptIcon,
    OndemandVideoIcon,
    HowToRegIcon,
    ReviewsIcon,
    CalendarMonthIcon,
    AddTaskIcon,
    CurrencyRupeeIcon,
    GradingIcon
};

const userMenu = [
    {
        id: "default",
        title: "Dashboard",
        type: "item",
        url: "dashboard",
        icon: icons.DashboardIcon,
        breadcrumbs: false,
        role: ["Admin", "Reception", "Employee","Student"]
    },
    {
        id: "Inquiry",
        title: "Inquiry",
        type: "item",
        url: "inquiry",
        icon: icons.CalendarTodayIcon,
        breadcrumbs: false,
        role: ["Admin", "Reception", "Employee"]
    },
    {
        id: "Demo",
        title: "Demo",
        type: "item",
        url: "demo",
        icon: icons.OndemandVideoIcon,
        breadcrumbs: false,
        role: ["Admin", "Reception", "Employee"]
    },
    {
        id: "Student",
        title: "Student",
        type: "item",
        url: "student",
        icon: icons.Person4Icon,
        breadcrumbs: false,
        role: ["Admin", "Reception", "Employee","Student"]
    },
    {
        id: "Batches",
        title: "Batches",
        type: "item",
        url: "batches",
        icon: icons.ReduceCapacityIcon,
        breadcrumbs: false,
        role: ["Admin", "Reception", "Employee"]
    },
    {
        id: "Employee",
        title: "Employee",
        type: "item",
        url: "employee",
        icon: icons.Diversity3Icon,
        breadcrumbs: false,
        role: ["Admin", "Reception", "Employee"]
    },
    {
        id: "Calendar",
        title: "Calendar",
        type: "item",
        url: "calendar",
        icon: icons.CalendarMonthIcon,
        breadcrumbs: false,
        role: ["Admin", "Reception", "Employee","Student"]
    },
    {
        id: "Task",
        title: "Task",
        type: "item",
        url: "task",
        icon: icons.AddTaskIcon,
        breadcrumbs: false,
        role: ["Admin", "Reception", "Employee"]
    },
    {
        id: "Account",
        title: "Account",
        type: "item",
        url: "account",
        icon: icons.AccountBalanceIcon,
        breadcrumbs: false,
        role: ["Admin"]
    },
    {
        id: "Fees",
        title: "Fees",
        type: "item",
        url: "fees",
        icon: icons.ReceiptIcon,
        breadcrumbs: false,
        role: ["Admin", "Reception", "Employee"]
    },
    {
        id: "Attendance",
        title: "Attendance",
        type: "item",
        url: "attendance",
        icon: icons.HowToRegIcon,
        breadcrumbs: false,
        role: ["Admin", "Reception", "Employee"]
    },
    {
        id: "Seminar",
        title: "Seminar",
        type: "item",
        url: "seminar",
        icon: icons.ReviewsIcon,
        breadcrumbs: false,
        role: ["Admin", "Reception", "Employee"]
    },
    {
        id: "Expenses",
        title: "Expenses",
        type: "item",
        url: "expense",
        icon: icons.CurrencyRupeeIcon,
        breadcrumbs: false,
        role: ["Admin", "Reception", "Employee"]
    },
    {
        id: "Logs",
        title: "Logs",
        type: "item",
        url: "logs",
        icon: icons.GradingIcon,
        breadcrumbs: false,
        role: ["Admin", "Reception", "Employee"]
    },
]

export {userMenu};

